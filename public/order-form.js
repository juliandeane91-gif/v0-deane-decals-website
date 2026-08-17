(function () {
  function getProductFromUrl() {
    var params = new URLSearchParams(window.location.search)
    var product = params.get("product")
    if (!product) return null
    var select = document.getElementById("product")
    if (!select) return null
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === product) {
        return product
      }
    }
    return null
  }

  function setError(message) {
    var el = document.getElementById("order-form-error")
    if (!el) return
    if (!message) {
      el.textContent = ""
      el.classList.add("hidden")
      return
    }
    el.textContent = message
    el.classList.remove("hidden")
  }

  function init() {
    var form = document.getElementById("deane-order-form")
    if (!form) return

    var product = getProductFromUrl()
    if (product) {
      document.getElementById("product").value = product
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault()
      setError("")

      var submitButton = form.querySelector('button[type="submit"]')
      if (submitButton) {
        submitButton.disabled = true
        submitButton.textContent = "Redirecting to Checkout..."
      }

      var data = new FormData(form)
      var payload = {
        product: String(data.get("product") || ""),
        quantity: Math.max(1, Number(data.get("quantity")) || 1),
        shipping: String(data.get("shipping") || "pickup"),
        rush: data.get("rush") === "yes",
        customerName: String(data.get("customerName") || "").trim(),
        customerEmail: String(data.get("customerEmail") || "").trim(),
        logoReady: String(data.get("logoReady") || "yes"),
        notes: String(data.get("notes") || ""),
      }

      if (!payload.customerName || !payload.customerEmail) {
        setError("Please enter your name and email.")
        if (submitButton) {
          submitButton.disabled = false
          submitButton.textContent = "Continue to Checkout"
        }
        return
      }

      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json().then(function (body) {
            return { ok: res.ok, body: body }
          })
        })
        .then(function (result) {
          if (result.body && result.body.url) {
            window.location.href = result.body.url
            return
          }
          throw new Error((result.body && result.body.error) || "Checkout failed")
        })
        .catch(function (err) {
          setError(err.message || "Checkout failed. Please try again.")
          if (submitButton) {
            submitButton.disabled = false
            submitButton.textContent = "Continue to Checkout"
          }
        })
    })
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})()

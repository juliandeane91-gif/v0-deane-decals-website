import Script from "next/script"

export function HardNavScript() {
  return (
    <Script id="hard-nav" strategy="beforeInteractive">
      {`
document.addEventListener('click', function (event) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
  if (!anchor || anchor.hasAttribute('download')) return;
  if (anchor.target && anchor.target !== '_self') return;
  var href = anchor.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
  var url;
  try { url = new URL(href, window.location.href); } catch (e) { return; }
  if (url.origin !== window.location.origin) return;
  event.preventDefault();
  window.location.assign(url.href);
}, true);
`}
    </Script>
  )
}

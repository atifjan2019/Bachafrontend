import Script from "next/script";

type Props = { gaId: string | null; pixelId: string | null };

/**
 * Third-party tags, rendered once from the root layout.
 *
 * GA4 is written as plain script elements so the tag is part of the served
 * HTML head, where Google specifies it. The loader is async, so it does not
 * block paint, and React hoists and deduplicates async scripts, so there is
 * exactly one per page. GA4's enhanced measurement reports client-side route
 * changes via history events, so no extra page_view is sent here.
 *
 * The pixel loads after the page is interactive.
 */
export function Tracking({ gaId, pixelId }: Props) {
  return (
    <>
      {gaId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <script
            id="ga4-init"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
            }}
          />
        </>
      )}
      {pixelId && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* Pixel's no-JS beacon; a plain img is required here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}

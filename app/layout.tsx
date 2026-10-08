import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const accentFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soumission GMV Services",
  description: "Obtenez votre prix de lavage à pression ou votre soumission commerciale.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="fr" className={accentFont.variable}>
      <body>
        {children}
        {pixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}

import { DefaultSeoProps } from "next-seo"

const config: DefaultSeoProps = {
  defaultTitle: "LiveCup 2022",
  description:
    "LiveCup is a live World Cup 2022 dashboard designed for TVs and Monitors",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://live-cup.vercel.app/",
    siteName: "LiveCup",
    images: [
      {
        url: "https://live-cup.vercel.app/og-image.png",
        alt: "LiveCup 2022",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    handle: "@pedsm",
    site: "@pedsm",
    cardType: "summary_large_image",
  },
}

export default config

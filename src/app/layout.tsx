import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ReasonHub.ai - Your Guide to ChatGPT Alternatives',
  description: 'Find the perfect ChatGPT alternative with our comprehensive guide. Compare features, pricing, and real-world performance.',
  keywords: 'chatgpt alternatives, ai tools, artificial intelligence, comparison',
  authors: [{ name: 'ReasonHub Team' }],
  openGraph: {
    title: 'ReasonHub.ai - Your Guide to ChatGPT Alternatives',
    description: 'Find the perfect ChatGPT alternative with our comprehensive guide.',
    url: 'https://www.reasonhub.ai',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReasonHub.ai - Your Guide to ChatGPT Alternatives',
    description: 'Find the perfect ChatGPT alternative with our comprehensive guide.',
    images: ['/og-image.jpg'],
  },
  other: {
    'google-adsense-account': 'ca-pub-5635114711353420',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-5635114711353420" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5635114711353420"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics - Replace YOUR_GA_ID with actual ID when available */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR_GA_ID', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
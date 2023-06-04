import './globals.css'

export const metadata = {
  title: "NewPost.fyi",
  description: "Generate promo links on demand",
  openGraph: {
    title: "NewPost.fyi",
    description: "Generate promo links on demand",
    url: "https://newpost.fyi",
    siteName: "NewPost,fyi",
    images: [
      {
        url: "https://objectstorage.ca-toronto-1.oraclecloud.com/p/kC-VGDdnePCybJEb78Q8FpJDlsnOM02nkLPabRBKx49UNAv5yQoB7UWkIzWHotC8/n/yzpjtx1indjl/b/newpost-fyi/o/NewP.jpg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NewPost.fyi",
    description: "Generate promo links on demand",
    images: ["https://objectstorage.ca-toronto-1.oraclecloud.com/p/kC-VGDdnePCybJEb78Q8FpJDlsnOM02nkLPabRBKx49UNAv5yQoB7UWkIzWHotC8/n/yzpjtx1indjl/b/newpost-fyi/o/NewP.jpg"]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

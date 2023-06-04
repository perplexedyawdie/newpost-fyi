import './globals.css'

export const metadata = {
  title: 'NewPost.fyi',
  description: 'Generate promo links on demand!',
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

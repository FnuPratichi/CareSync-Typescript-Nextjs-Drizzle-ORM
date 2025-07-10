
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1><b><center>CareSync</center></b></h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
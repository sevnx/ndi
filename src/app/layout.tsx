import localFont from 'next/font/local';
import '../styles/globals.css';
import { Metadata } from 'next';
import { ThemeProvider, NavigationBar, Footer } from '@/components';
import BadgeHeader from '@/components/badge';

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | KeyIcy',
    default: 'KeyIcy'
  },
  description: 'Page Officielle de KeyIcy.',
  icons: { icon: '/favicon.ico' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavigationBar />
          <BadgeHeader />
          <main className="pt-12">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

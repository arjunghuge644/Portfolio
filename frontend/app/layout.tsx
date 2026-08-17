import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Rajdhani, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { fetchPublicSeo } from '../lib/api';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const rajdhani = Rajdhani({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050608',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPublicSeo();

  const title = seo?.siteTitle || 'Arjun Ghuge | Full Stack Web Developer & AI Solutions';
  const description = seo?.metaDescription || 'Telemetry engineering portfolio of Arjun, featuring Full-Stack Web Development, AI systems, RAG engines, and Machine Learning models.';
  const canonicalUrl = seo?.canonicalUrl || 'https://arjunghuge.me';
  const ogImage = seo?.ogImage || '/assets/portrait.png';

  return {
    title,
    description,
    icons: {
      icon: '/favicon.svg',
    },
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Arjun Portfolio // Engineering System',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arjun',
    jobTitle: 'Software Engineer & AI Builder',
    url: 'https://arjun.dev',
    sameAs: [
      'https://github.com',
      'https://linkedin.com',
      'https://twitter.com'
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'Artificial Intelligence',
      'Retrieval-Augmented Generation (RAG)',
      'Machine Learning',
      'Node.js',
      'React.js',
      'Next.js',
      'Python'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}

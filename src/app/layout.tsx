import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventTicker from "@/components/layout/EventTicker";
import {
  CHURCH_NAME,
  SITE_URL,
  CHURCH_PHONE,
  CHURCH_EMAIL,
  CHURCH_ADDRESS,
} from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Link previews cut descriptions after about 100 characters, so the first
// sentence has to say something useful without repeating the church name.
const description =
  "A Pentecostal family in Ghana sharing the gospel of Jesus Christ with the nations. Join us for worship, Bible study and spiritual growth.";

// Link previews often crop the share image to a centred square, so the logo
// and name sit in the middle. New file name so apps drop their old cached copy.
const SHARE_IMAGE = "/og-share.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CHURCH_NAME} | Christ our Lord, the Bible our Guide`,
    template: `%s | ${CHURCH_NAME}`,
  },
  description,
  icons: {
    icon: "/tlpci-logo.png",
    apple: "/tlpci-logo.png",
  },
  openGraph: {
    type: "website",
    siteName: CHURCH_NAME,
    title: CHURCH_NAME,
    description,
    url: SITE_URL,
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: CHURCH_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: CHURCH_NAME,
    description,
    images: [SHARE_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: CHURCH_NAME,
  alternateName: "TLPCI",
  url: SITE_URL,
  logo: `${SITE_URL}/tlpci-logo.png`,
  email: CHURCH_EMAIL,
  telephone: CHURCH_PHONE,
  slogan: "Christ our Lord, the Bible our Guide",
  address: {
    "@type": "PostalAddress",
    streetAddress: CHURCH_ADDRESS,
    addressLocality: "Accra",
    addressCountry: "GH",
  },
  foundingDate: "1961",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <EventTicker />
      </body>
    </html>
  );
}

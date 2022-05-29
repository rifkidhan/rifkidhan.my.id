const siteUrl = process.env.NEXT_PUBLIC_FRONTEND;

export const meta = {
  title: 'Rifkidhan | Rifki Ramadhan',
  titleTemplate: '%s - Rifkidhan',
  description: 'Personal Website Rifki Ramadhan',
  canonical: siteUrl,
  openGraph: {
    title: 'Rifkidhan | Rifki Ramadhan',
    description: 'Personal Website Rifki Ramadhan',
    type: 'website',
    url: siteUrl,
    site_name: 'Rifkidhan',
    images: [
      {
        url: `${siteUrl}/rifkidhan.png`,
        width: '512',
        height: '512',
        alt: 'Rifkidhan Website'
      }
    ]
  },
  twitter: {
    handle: '@rifkidhan',
    site: '@rifkidhan',
    cardType: 'summary_large_image'
  }
};

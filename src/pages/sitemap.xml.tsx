import { GetServerSideProps } from 'next';
import { getDirectus } from '@libs/directus';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const directus = await getDirectus();
  const { data: blog } = await directus
    .items('blog')
    .readByQuery({ fields: ['slug', 'date_updated'] });
  const { data: menu } = await directus
    .items('menu')
    .readByQuery({ fields: ['slug'] });
  const url = process.env.NEXT_PUBLIC_FRONTEND;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${menu
          ?.map(({ slug }) => {
            if (slug === 'home')
              return `
              <url>
                <loc>${url}</loc>
                <priority>1.0</priority>
              </url>
          `;
            return `
              <url>
                  <loc>${url}/${slug}</loc>
                  <priority>1.0</priority>
              </url>
          `;
          })
          .join('')}
          ${blog
            ?.map(({ slug, date_updated }) => {
              return `
              <url>
                  <loc>${url}/blog/${slug}</loc>
                  <lastmod>${date_updated}</lastmod>
                  <priority>1.0</priority>
              </url>
            `;
            })
            .join('')}
    </urlset>`;

  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

const Sitemap: React.FC = () => {
  return null;
};

export default Sitemap;

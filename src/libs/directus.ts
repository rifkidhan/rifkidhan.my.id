import { Directus } from '@directus/sdk';
import getConfig from 'next/config';
import type { AllContent } from './data/types';

// const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
// const { url } = publicRuntimeConfig;
// const { email, password, token } = serverRuntimeConfig;

const url = process.env.NEXT_PUBLIC_DIRECTUS_URL as string;
const email = process.env.DIRECTUS_EMAIL as string;
const password = process.env.DIRECTUS_PASSWORD as string;
const token = process.env.DIRECTUS_TOKEN as string;

const directus = new Directus<AllContent>(url);

export async function getDirectus() {
  if (directus.auth.token) return directus;

  if (email && password) {
    await directus.auth.login({ email, password });
  } else if (token) {
    await directus.auth.static(token);
  }

  return directus;
}

export const fetcher = (items: string) =>
  fetch(`${url}/items/${items}`).then((res) => res.json());

export const imageUrl = `${url}/assets`;

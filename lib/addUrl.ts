'use server';

import { getDatabase } from '@/db';
import { UrlEntry } from '@/types';

async function checkUrlFormat(urlString: string): Promise<boolean> {
  try {
    const parsedUrl = new URL(urlString);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }
    const response = await fetch(urlString, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    return response.ok;
  } catch {
    return false;
  }
}

export async function addUrl(
  url: string,
  alias: string
): Promise<{ success: boolean; shortUrl?: string; error?: string }> {
  try {
    if (!url || !alias) {
      return { success: false, error: 'Both URL and alias must be provided' };
    }

    if (!(await checkUrlFormat(url))) {
      return { success: false, error: 'URL must be a valid http or https address' };
    }

    const db = await getDatabase();
    const collection = db.collection<UrlEntry>('urls');

    const duplicate = await collection.findOne({ alias });
    if (duplicate) {
      return { success: false, error: 'This alias is already in use' };
    }

    const urlRecord: UrlEntry = {
      alias,
      originalUrl: url,
      createdAt: new Date(),
    };

    await collection.insertOne(urlRecord);

    let baseUrl: string;
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    } else if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      baseUrl = 'http://localhost:3000';
    }
    const shortUrl = `${baseUrl}/${alias}`;

    return {
      success: true,
      shortUrl,
    };
  } catch (error) {
    console.error('Error creating short URL:', error);
    return { success: false, error: 'Server error occurred' };
  }
}

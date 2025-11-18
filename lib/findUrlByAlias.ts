import { getDatabase } from '@/db';
import { UrlEntry } from '@/types';

export async function findUrlByAlias(alias: string): Promise<string | null> {
  const db = await getDatabase();
  const collection = db.collection<UrlEntry>('urls');
  
  try {
    const urlRecord = await collection.findOne({ alias });

    if (!urlRecord) {
      return null;
    }

    return urlRecord.originalUrl;
  } catch (error) {
    console.error('Error finding URL by alias:', error);
    return null;
  }
}

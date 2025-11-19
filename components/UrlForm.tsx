'use client';

import { useState } from 'react';
import ShortUrlResult from './ShortUrlResult';
import { addUrl } from '@/lib/addUrl';

export default function UrlForm() {
  const [longUrl, setLongUrl] = useState('');
  const [shortAlias, setShortAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!longUrl || !shortAlias) {
      setError('Both fields are required');
      return;
    }

    setLoading(true);

    try {
      const response = await addUrl(longUrl, shortAlias);

      if (response.success && response.shortUrl) {
        setShortUrl(response.shortUrl);
        setLongUrl('');
        setShortAlias('');
      } else {
        setError(response.error || 'An error occurred');
      }
    } catch (err) {
      setError('Unable to create short URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-semibold text-indigo-700 mb-2">
          Original URL
        </label>
        <input
          type="text"
          id="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-colors text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <div>
        <label htmlFor="alias" className="block text-sm font-semibold text-indigo-700 mb-2">
          Alias
        </label>
        <input
          type="text"
          id="alias"
          value={shortAlias}
          onChange={(e) => setShortAlias(e.target.value)}
          placeholder="my-link"
          className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-colors text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {shortUrl && <ShortUrlResult shortUrl={shortUrl} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transition-all"
      >
        {loading ? 'Creating...' : 'Create Short URL'}
      </button>
    </form>
  );
}

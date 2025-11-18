interface ShortUrlResultProps {
  shortUrl: string;
}

export default function ShortUrlResult({ shortUrl }: ShortUrlResultProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-lg p-4 shadow-sm">
      <p className="text-sm font-semibold text-emerald-800 mb-2">Shortened URL:</p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={shortUrl}
          readOnly
          className="flex-1 px-3 py-2 bg-white border-2 border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

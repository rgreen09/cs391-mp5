import Header from '@/components/Header';
import UrlForm from '@/components/UrlForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-indigo-100">
        <Header />
        <UrlForm />
      </div>
    </div>
  );
}

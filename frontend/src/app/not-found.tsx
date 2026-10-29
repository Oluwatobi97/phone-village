import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 text-3xl flex items-center justify-center mb-4 border border-emerald-500/30">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-emerald-300/80 mt-2 max-w-md mx-auto">
        The smartphone listing, store page, or route you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/phones"
        className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
      >
        Return to Marketplace →
      </Link>
    </div>
  );
}

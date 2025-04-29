// app/404.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-2">
        The requested page could not be found.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
}

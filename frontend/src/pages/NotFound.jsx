export default function NotFound() {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-50 text-blue-900">
        <div className="text-center max-w-lg">
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
          <p className="mt-2 text-lg text-blue-700">
            Sorry, the page you're looking for doesn’t exist or has been moved.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700 hover:shadow-xl"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }
  
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Layout/Page Error caught by error.js:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6f1] p-4 text-center">
      <h2 className="section-title mb-4 text-red-600">Something went wrong!</h2>
      <p className="para-text mb-8 max-w-md text-gray-600">
        We encountered an error while rendering this page. This might be due to a recent update or a temporary issue.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-full bg-[#c29a2f] px-8 py-3 font-medium text-white transition-all hover:bg-[#a68224]"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
        >
          Reload page
        </button>
      </div>
      {error && (
        <pre className="mt-8 max-w-full overflow-auto rounded-lg bg-black/5 p-4 text-left text-xs text-red-800">
          {error.message}
          {error.stack && `\n\n${error.stack}`}
        </pre>
      )}
    </div>
  );
}

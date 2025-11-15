import React from "react";

export default function Dashboard({
  userEmail,
  secondsLeft,
  onLogout,
}: {
  userEmail: string;
  secondsLeft: number;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome, {userEmail}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            Token expires in: <b>{secondsLeft}s</b>
          </span>
          <button
            onClick={onLogout}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Clients</h2>
        <h2 className="text-lg font-semibold mb-2">Quotes</h2>
        <h2 className="text-lg font-semibold mb-2">Invoices</h2>
        <h2 className="text-lg font-semibold mb-2">Projects</h2>
      </section>
    </div>
  );
}

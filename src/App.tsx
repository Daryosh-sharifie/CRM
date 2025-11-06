import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";

const TOKEN_API = "https://mocki.io/v1/f2e88983-43a2-4339-a1a9-1b7b69ff738e";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  scope?: string;
  token_type?: string;
  refresh_token?: string;
};

type User = { email: string; pass: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const isNumericOnly = (s: string) => /^\d+$/.test(s);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({ email: "", pass: "" });
  const [errors, setErrors] = useState<{ email?: string; pass?: string }>({});
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  // Validation
  const validate = (u: User) => {
    const e: typeof errors = {};
    if (!u.email) e.email = "Email is required.";
    else if (isNumericOnly(u.email)) e.email = "Email cannot be numbers only.";
    else if (!emailRegex.test(u.email))
      e.email = "Enter a valid email (must contain @ and a domain).";

    if (!u.pass) e.pass = "Password is required.";
    else if (u.pass.length < 8) e.pass = "Password must be at least 8 characters.";

    return e;
  };

  const onChange =
    (k: keyof User) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = { ...user, [k]: e.target.value };
      setUser(next);
      setErrors(validate(next));
    };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(user);
    setErrors(v);
    if (Object.keys(v).length !== 0) return;

    try {
      const { data } = await axios.get<TokenResponse>(TOKEN_API);
      if (!data?.access_token || !data?.expires_in) {
        alert("Token response missing fields.");
        return;
      }
      setToken(data);
      setSecondsLeft(data.expires_in);
      setLoggedIn(true);
    } catch {
      alert("Failed to fetch token.");
    }
  };

  // Timer
  useEffect(() => {
    if (!loggedIn || secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [loggedIn, secondsLeft]);

  // Auto logout on expiry_in
  useEffect(() => {
    if (loggedIn && secondsLeft === 0) {
      alert("Session expired. Please login again.");
      handleLogout();
    }
  }, [loggedIn, secondsLeft]);

  const handleLogout = () => {
    setLoggedIn(false);
    setUser({ email: "", pass: "" });
    setErrors({});
    setToken(null);
    setSecondsLeft(0);
  };

  // Login screen
  if (!loggedIn)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white p-4">
        <form onSubmit={onSubmit} className="bg-gray-800 p-6 rounded-lg w-80 space-y-3">
          <h2 className="text-xl font-semibold text-center mb-2">Login</h2>

          <div>
            <input
              type="email"
              placeholder="Email (e.g. user@gmail.com)"
              className="w-full p-2 rounded bg-gray-700 outline-none"
              value={user.email}
              onChange={onChange("email")}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password (min 8 chars)"
              className="w-full p-2 rounded bg-gray-700 outline-none"
              value={user.pass}
              onChange={onChange("pass")}
            />
            {errors.pass && <p className="text-red-400 text-xs mt-1">{errors.pass}</p>}
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded disabled:opacity-50"
            disabled={Boolean(errors.email || errors.pass) || !user.email || !user.pass}
          >
            Login
          </button>
        </form>
      </div>
    );

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome, {user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            Token expires in: <b>{secondsLeft}s</b>
          </span>
          <button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </header>

      {/* Token*/}
      <section className="bg-gray-800 p-4 rounded-xl mb-6">
        <h2 className="text-lg text-center font-semibold mb-2">Token Info</h2>
        <pre className="bg-gray-900 p-3 rounded overflow-auto text-sm">
          {JSON.stringify(token, null, 2)}
        </pre>
      </section>

      {/* Dashboard */}
      <section className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Clients</h2>
        <h2 className="text-lg font-semibold mb-2">Quotes</h2>
        <h2 className="text-lg font-semibold mb-2">Invoices</h2>
        <h2 className="text-lg font-semibold mb-2">Projects</h2>
      </section>
    </div>
  );
}

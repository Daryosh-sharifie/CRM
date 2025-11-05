import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";

const API_URL = "https://mocki.io/v1/f2e88983-43a2-4339-a1a9-1b7b69ff738e";

type User = { email: string; pass: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // simple, practical email check
const isNumericOnly = (s: string) => /^\d+$/.test(s);

export default function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<User>({ email: "", pass: "" });
  const [errors, setErrors] = useState<{ email?: string; pass?: string }>({});

  const validate = (u: User) => {
    const e: { email?: string; pass?: string } = {};
    if (!u.email) e.email = "Email is required.";
    else if (isNumericOnly(u.email)) e.email = "Email cannot be numbers only.";
    else if (!emailRegex.test(u.email))
      e.email = "Enter a valid email (must contain @ and a domain).";

    if (!u.pass) e.pass = "Password is required.";
    else if (u.pass.length < 8) e.pass = "Password must be at least 8 characters.";

    return e;
  };

  const onChange =
    (key: keyof User) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = { ...user, [key]: e.target.value };
      setUser(next);
      setErrors(validate(next)); // live validation
    };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(user);
    setErrors(v);
    if (Object.keys(v).length === 0) setLogin(true);
  };

  useEffect(() => {
    if (login) axios.get(API_URL).then((res) => setData(res.data));
  }, [login]);

  if (!login)
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Fetched API Data:</h1>
      <pre className="bg-gray-800 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

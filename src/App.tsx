import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_URL = "https://mocki.io/v1/f2e88983-43a2-4339-a1a9-1b7b69ff738e";

interface User {
  name: string;
  pass: string;
}

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<User>({ name: "", pass: "" });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.name && user.pass) setLogin(true);
    else alert("Enter username and password");
  };

  useEffect(() => {
    if (login) {
      axios.get(API_URL).then((res) => setData(res.data));
    }
  }, [login]);

  if (!login)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-6 rounded-lg w-80 space-y-3"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Login</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-700 outline-none"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, name: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 outline-none"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, pass: e.target.value })
            }
          />

          <button className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded">
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
};

export default App;

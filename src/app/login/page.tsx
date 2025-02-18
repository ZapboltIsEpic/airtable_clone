"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInState, setSignInState] = useState(true);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid credentials");
    }
  };

  const handleSignUp = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      })
    })
    console.log({response});
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      { signInState ? (
        <div>
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
            <button className="bg-green-500 text-white p-2" onClick={() => setSignInState(false)}>Sign Up</button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
          </form>
          <button className="mt-5 justify-center items-center bg-green-500 text-white p-2" onClick={() => setSignInState(true)}>Sign In</button>
        </div>
      )}
    </div>
  );
}
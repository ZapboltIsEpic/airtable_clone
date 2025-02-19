"use client";

import { supabase } from "~/app/utils/supabase";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInState, setSignInState] = useState(true);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error("Error signing in:", error);
      alert("Invalid credentials");
    } 
    else {
      console.log("Signed in successfully!");

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log("Session is now available!");
        redirect("/home");  
      } else {
        console.error("No session found after sign-in");
      }
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
    if (!response.ok) {
      alert("error occurred");
    }
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
          </form>
          <button className="mt-5 justify-center items-center bg-green-500 text-white p-2" onClick={() => setSignInState(false)}>Sign Up</button>
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
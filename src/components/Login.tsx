"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const submitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const resNextAuht = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (resNextAuht?.error) return setError(resNextAuht.error as string);

    if (resNextAuht?.ok) return router.push("/");

    console.log(resNextAuht);
  };

  return (
    <div className="flex flex-col justify-center h-72 items-center mt-40 w-full">
      <form
        className="flex flex-col gap-y-2 w-[90%] p-6 rounded-xl md:w-1/2 bg-[#0e1922] text-white"
        onSubmit={submitData}
      >
        {error && <div className="text-red-500 mb-2">{error}</div>}

        <h1 className="text-center font-bold text-2xl mb-4">Sign In</h1>

        <label htmlFor="email" className="text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="example@example.com"
          name="email"
          id="email"
          autoComplete="off"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
          required
          className="bg-[#0e171f6b] outline-none px-3 py-2 rounded-lg"
        />

        <label htmlFor="password" className="text-lg font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="******"
          name="password"
          id="password"
          autoComplete="off"
          className="bg-[#0e171f6b] outline-none px-3 py-2 rounded-lg"
        />

        <div className="flex items-center justify-center mt-4">
          <button className="bg-[#253745] px-8 py-2 rounded-lg font-medium hover:bg-[#1c3043]">
            Login
          </button>
        </div>
      </form>

      <div className="text-white text-center mt-2">
        You do not have an account?{" "}
        <Link href="/register" className="text-blue-400 hover:underline">
          Signup here
        </Link>
      </div>
    </div>
  );
}

export default Login;

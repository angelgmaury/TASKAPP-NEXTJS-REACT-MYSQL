"use client";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signOut, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
function RegisterPage() {

  const [error, setError] = useState(null);

  const router = useRouter();

  const submitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const resSignup = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("username"),
      });
      console.log(resSignup);
      const resNextAuht = await signIn("credentials", {
        email: resSignup.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (resNextAuht!.ok) return router.push("/");

      console.log(resNextAuht);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-72 items-center mt-40 w-full">
      <form
        className="flex flex-col gap-y-2 w-[90%] p-6 rounded-xl md:w-1/2 bg-[#0e1922] text-white"
        onSubmit={submitData}
      >
        {error && (
          <div className="text-red-500 mb-2">
            {error}
          </div>
        )}

        <h1 className="text-center font-bold text-2xl mb-4">Sign up</h1>

        <label htmlFor="username" className="text-lg font-medium">
          User Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          name="username"
          id="username"
          autoFocus
          autoComplete="off"
          className="bg-[#0e171f6b] outline-none px-3 py-2 rounded-lg"
        />

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
          Contraseña
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
            Register
          </button>
        </div>
      </form>

      <div className="text-white text-center mt-2">
        Do you already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;

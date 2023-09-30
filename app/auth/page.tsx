"use client";

import { ChangeEvent, useCallback, useState } from "react";
import Input from "@/app/component/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/legacy/image";
import logo from "@/app/public/logo.png";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    if (!email || !password) {
      return;
    }
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      throw new Error("Bad login");
    }
  }, [email, password]);

  const register = useCallback(async () => {
    if (!email || !password || !name) {
      return;
    }
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      throw new Error("Bad registration");
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('./public/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={logo} width={200} height={50} alt="logo" />
          <div className=" flex justify-center">
            <div className="bg-black bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign in" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    label="Username"
                    onChange={(
                      element: ChangeEvent<HTMLInputElement>
                    ) => setName(element.target.value)}
                    id="name"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(
                    element: ChangeEvent<HTMLInputElement>
                  ) => setEmail(element.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(
                    element: ChangeEvent<HTMLInputElement>
                  ) => setPassword(element.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button
                type="submit"
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() =>
                    signIn("google", { callbackUrl: "/profiles" })
                  }
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() =>
                    signIn("github", { callbackUrl: "/profiles" })
                  }
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer">
                  {variant === "login"
                    ? "Create an account"
                    : "Login"}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Auth;

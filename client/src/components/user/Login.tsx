"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import { signIn } from "next-auth/react";
import SignUpPopup from "./SignUpPopup";
import SignUpModal from "../user/SignUpModal";
import { useSession } from "next-auth/react";

import { logIn } from "@/redux/slices/auth-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // callbackURL placeholder for now
    const loginResponse = await signIn("login", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/creator/profile",
    });

    if (loginResponse && !loginResponse.error) {
      console.log("LOGIN!");

      dispatch(
        logIn({
          isAuth: true,
          name: session.data?.user.name,
          email: session.data?.user.email,
          userId: session.data?.user.id,
        })
      );

      dispatch(logIn(session.data?.user.id));

      console.log(loginResponse);
    } else {
      console.log("Error!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col border border-gray-300 rounded-2xl md:px-20 px-5 gap-1"
      >
        {/* Form Header */}
        <div className="mx-auto mt-16 flex flex-col items-center">
          <Avatar className="m-1 bg-blue-500">
            <PersonPinOutlinedIcon />
          </Avatar>
          <h1 className="text-2xl">Login</h1>
        </div>

        {/* Input Fields */}
        <div className="mt-5">
          <input
            className="input-md w-full input-focus-primary"
            type="text"
            placeholder="Email Address"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            name="email"
            autoFocus
            autoComplete="email"
            required
          />
          <p className="mt-1 text-sm min-h-5 delete-btn-text-color">{}</p>
        </div>
        <div className="relative">
          <div className="flex flex-row items-center justify-between">
            <input
              className="input-md w-full input-focus-primary"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              name="password"
              autoFocus
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 pr-3 text-sm leading-5"
            >
              {showPassword ? (
                <VisibilityOffIcon className="h-5 w-5 text-gray-700" />
              ) : (
                <VisibilityIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm min-h-5 delete-btn-text-color">{}</p>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-3 mb-2 btn-primary-color"
        >
          Login
        </Button>

        <button
          onClick={() =>
            (
              document.getElementById("sign-up-modal") as HTMLDialogElement
            ).showModal()
          }
        >
          <Link href="#">Don&apos;t have an account? Sign up</Link>
        </button>

        <div className="flex pt-16 pb-1">
          <p className="mx-auto text-sm text-gray-500">
            Copyright ©{" "}
            <Link href={"/"} className="text-gray-500">
              ShareFluence
            </Link>{" "}
            {new Date().getFullYear()}.
          </p>
        </div>
      </form>
      <SignUpModal>
        <SignUpPopup />
      </SignUpModal>
    </>
  );
};

export default LoginComponent;

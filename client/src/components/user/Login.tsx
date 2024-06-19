"use client";

import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import SignUpPopup from "./SignUpPopup";
import { useSession } from "next-auth/react";
import SignUpModal from "../user/SignUpModal";

import { logIn, logOut } from "@/redux/slices/auth-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginResponse = await signIn("login", {
      email: email,
      password: password,
      redirect: false,
    });

    if (loginResponse && !loginResponse.error) {
      console.log("LOGIN!");

      dispatch(logIn(session.data?.user.id));

      console.log(loginResponse);
    } else {
      console.log("Error!");
    }
  };

  const onClickLogOut = () => {
    dispatch(logOut());
    signOut({ redirect: false });
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col border border-gray-300 rounded-2xl md:px-20 px-5 gap-1"
      >
        <div className="mt-8 flex flex-col items-center">
          <Avatar className="m-1 bg-blue-500">
            <PersonPinOutlinedIcon />
          </Avatar>
          <h1 className="text-2xl">Login</h1>
        </div>
        <div className="mt-5">
          <input
            className="input-md w-full"
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
        </div>
        <div>
          <input
            className="input-md w-full"
            type="password"
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
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-3 mb-2 btn-primary-color"
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="contained"
          className="mt-3 mb-2"
          onClick={onClickLogOut}
        >
          Sign Out
        </Button>

        <button
          onClick={() => document.getElementById("sign-up-modal").showModal()}
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
    </div>
  );
};

export default LoginComponent;

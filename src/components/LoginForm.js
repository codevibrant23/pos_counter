"use client";

import { Button, Input, Link } from "@nextui-org/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (username) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(username).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");
    if (!validateEmail(username)) {
      setEmailError(true);
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/counter/api/login/`,
        {
          username,
          password,
          role:"pos_staff",
        }
      );
      Cookies.set("authToken", response.data.token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      Cookies.set("userDetails", JSON.stringify(response.data.user_details), {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      router.push("/outlet");
    } catch (error) {
      setSubmitError(
        error.response?.data?.detail || "Login failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <p className="mb-2 font-normal">
            Enter your username or username address
          </p>
          <Input
            type="username"
            size="lg"
            radius="md"
            placeholder="username"
            variant="bordered"
            value={username}
            onChange={handleEmailChange}
            isInvalid={emailError}
            errorMessage="Please enter a valid email address"
            classNames={{
              errorMessage: "text-md",
              input: ["focus:border-[#FF6600]"],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "bg-transparent",
                "hover:bg-transparent",
                "focus-within:!bg-transparent",
                "focus-within:!border-[#FF6600]",
              ],
            }}
          />
        </div>
        <div>
          <p className="mb-2">Enter your Password</p>
          <Input
            size="lg"
            radius="md"
            placeholder="Password"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            classNames={{
              input: ["focus:border-[#FF6600]"],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "bg-transparent",
                "hover:bg-transparent",
                "focus-within:!bg-transparent",
                "focus-within:!border-[#FF6600]",
              ],
            }}
          />
          <div className="flex w-full justify-end mt-2">
            <Link
              href="#"
              underline="hover"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        {submitError && (
          <div className="text-red-500 text-sm mb-2">{submitError}</div>
        )}
      </div>
      <Button
        radius="md"
        color="primary"
        type="submit"
        className="w-full mt-6 font-medium text-md"
        size="lg"
        isLoading={loading}
      >
        Sign In
      </Button>
    </form>
  );
}

"use client";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && password) {
      try {
        const response = await fetch("https://test.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          console.log("Login successful");
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="p-5">
        <h2 className="font-bold text-xl">Mantra POS</h2>
      </div>
      <section className="flex justify-center items-center flex-wrap h-auto md:h-[90vh]">
        <div className="flex justify-center items-center flex-col md:flex-row">
          <div className="w-full md:min-w-[500px]">
            <div className="flex flex-col justify-start gap-5">
              <p className="font-bold text-4xl">Welcome Back!</p>
              <p className="font-medium text-3xl">
                Manage your<br></br> business seamlessly.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                className="w-[200px] md:w-[200px] lg:w-[300px]"
                src="/media/login.png"
                alt="Login_Image"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div>
            <Card>
              <CardBody className="flex justify-center items-center py-20 px-10 gap-10 w-auto md:min-w-[500px] bg-[var(--background)] border-0 !border-none">
                <h2 className="font-bold text-5xl w-full text-left">Sign in</h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-full gap-4"
                >
                  <p>Enter your username or email address</p>
                  <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    value={email}
                    onChange={handleEmailChange}
                    className={`${emailError ? "border-red-500" : ""}`}
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
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                  <p>Enter your Password</p>
                  <Input
                    label="Password"
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
                  <span className="flex w-full justify-end ">
                    <a href="">
                      <p style={{ color: "#AD3113" }}>Forgot Password</p>
                    </a>
                  </span>
                  <Button color="primary" type="submit">
                    Sign In
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      <footer className=" flex w-full justify-end p-5">
        <p className="font-bold text-xl">Developed by Vibrant Digitech</p>
      </footer>
    </>
  );
}

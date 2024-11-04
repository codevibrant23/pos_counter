import LoginForm from "@/components/LoginForm";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="p-5 text-center md:text-left">
        <h2 className="font-bold text-2xl md:text-xl">Mantra POS</h2>
      </div>
      <section className="flex justify-center items-center h-auto md:h-[85vh] p-4">
        <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4">
          <div className="w-full md:w-1/2 p-4 text-center md:text-left flex flex-col justify-center">
            <div>
              <p className="font-bold text-5xl md:text-6xl xl:text-7xl mb-3">
                Welcome Back!
              </p>
              <p className="font-medium text-xl md:text-3xl">
                Manage your
                <br /> business seamlessly.
              </p>
            </div>
            <div className="flex justify-center md:justify-end mt-5">
              <Image
                className="w-[200px] md:w-[300px]"
                src="/media/login.png"
                alt="Login Image"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <Card className="rounded-[60px]">
              <CardBody className="md:pt-24 pb-10 px-8 md:px-12 bg-[var(--background)] border-0 !border-none flex flex-col">
                <h2 className="font-medium text-4xl md:text-5xl my-8 text-center md:text-left">
                  Sign in
                </h2>
                <Suspense
                  fallback={
                    <div className="flex w-full h-40 justify-center items-center">
                      <Spinner />
                    </div>
                  }
                >
                  <LoginForm />
                </Suspense>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      <footer className="text-center md:text-end p-5">
        <p className="font-bold text-lg md:text-xl">
          Developed by Vibrant Digitech
        </p>
      </footer>
    </>
  );
}

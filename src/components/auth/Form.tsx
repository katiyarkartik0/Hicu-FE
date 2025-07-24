import { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Button from "@/components/ui/Button";

function Form() {
  const [isNew, setIsNew] = useState(false);
  const toggleAuth = () => {
    setIsNew((prev) => !prev);
  };
  return (
    <div className="w-[70%] rounded-md h-full border border-md flex justify-center items-center">
      <div className="w-[85%] flex flex-col justify-between items-center">
        <div className="w-full h-[10%] flex flex-col justify-between items-center">
          <h3 className="text-3xl font-bold">Welcome to HiCu</h3>
          <p className="text-gray-500">
            Sign in to your account or create a new one
          </p>
        </div>
        <div className="w-full h-[10%] bg-gray-100 rounded-lg p-2 flex justify-center items-center">
          <div className="w-full h-full flex justify-between items-center">
            <Button
              onClick={toggleAuth}
              className={`${
                !isNew && "bg-white"
              } font-medium h-full w-1/2 border-none`}
            >
              Login
            </Button>
            <Button
              onClick={toggleAuth}
              className={`${
                isNew && "bg-white"
              } font-medium h-full w-1/2 border-none`}
            >
              Signup
            </Button>
          </div>
        </div>
        {isNew ? <SignUpForm /> : <LoginForm />}
      </div>
    </div>
  );
}

export default Form;

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
    <div className="w-[100%] rounded-md h-full border border-md flex justify-center items-center p-4">
      <div className="w-[100%] flex flex-col justify-between items-center">
        <div className="w-full h-[10%] flex flex-col justify-between items-center">
          <h3 className="text-[32px] font-bold text-grey-18">Welcome to HiCu</h3>
          <p className="text-[16px] text-center pb-3 text-grey-91">
            Sign in to your account or create a new one
          </p>
        </div>
        <div className="w-full h-[10%] bg-grey-ef rounded-lg p-2 flex justify-center items-center">
          <div className="w-full h-full flex justify-between items-center text-grey-18">
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

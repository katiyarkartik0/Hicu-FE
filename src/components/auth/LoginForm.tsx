import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";

import authService from "@/services/auth";

import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { DEFAULT_ICON_SIZE, DEFAULT_STROKE_WIDTH } from "@/lib/style";
import { useAuth } from "@/hooks/auth";

interface LoginFormData {
  email: string;
  password: string;
}

const useLogin = function () {
  const navigate = useNavigate();
  const { setAccessToken, setMemberDetails } = useAuth();

  return useMutation({
    mutationFn: authService.login,
    onError: function (err) {
      console.log(err);
    },
    onSuccess: ({ accessToken, member }) => {
      storage.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      storage.set(LOCAL_STORAGE_KEY.MEMBER_DETAILS, JSON.stringify(member));
      setAccessToken(accessToken);
      setMemberDetails(member);
      navigate("/brand");
    },
  });
};

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      loginMutation.mutate(formData);
    } catch (err) {
      console.log(err);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[50%] w-full flex flex-col justify-between"
    >
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="text-[12px] font-bold text-grey-2c pt-2"
        >
          Email
        </label>

        <Input
          id="email"
          name="email"
          placeholder="name@example.com"
          className="w-full border-1 border-grey-ef px-2 py-2 focus:border-grey-91 focus:outline-none"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="text-[12px] font-bold text-grey-2c pt-2"
          >
            Password
          </label>
          {/* <a className="text-blue-600" href="#">
            Forgot Password?
          </a> */}
        </div>
        <div className="relative w-full">
          <Input
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="•••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-1 border-grey-ef px-2 py-2 focus:border-grey-91 focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff
                strokeWidth={DEFAULT_STROKE_WIDTH}
                size={DEFAULT_ICON_SIZE}
              />
            ) : (
              <Eye
                strokeWidth={DEFAULT_STROKE_WIDTH}
                size={DEFAULT_ICON_SIZE}
              />
            )}
          </button>
        </div>
      </div>

      {loginMutation.isError && (
        <div className="text-[12px] font-semibold text-red-600 leading-none">
          {(loginMutation.error as Error)?.message || "Login failed"}
        </div>
      )}

      <Button
        className="w-full text-white text-[12px] font-bold bg-grey-2c disabled:opacity-50 mt-3 hover:bg-grey-18 active:bg-grey-18"
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}

export default LoginForm;

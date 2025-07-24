import { useState, FormEvent } from "react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { DEFAULT_ICON_SIZE, DEFAULT_STROKE_WIDTH } from "@/lib/style";
import { useAuth } from "@/hooks/auth";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const defaultData = {
  name: "",
  email: "",
  password: "",
};

const defaultError = {};

const useCompanyEmail = function () {
  return useMutation({
    mutationFn: authService.checkCompanyEmail,
    onError: (err) => {
      alert(err);
    },
  });
};

const useSignup = function () {
  const navigate = useNavigate();
  const { setAccessToken, setMemberDetails } = useAuth();
  return useMutation({
    mutationFn: authService.signup,
    onError: function (error) {
      alert(error?.message || "Signup failed");
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

const validateStep1 = (email: string): Partial<FormData> => {
  const errors: Partial<FormData> = {};
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }
  return errors;
};

const validateStep2 = ({ name, password }: FormData): Partial<FormData> => {
  const errors: Partial<FormData> = {};
  if (!name) errors.name = "Name is required";
  if (!password) errors.password = "Password is required";
  return errors;
};

function SignUpForm() {
  const [step, setStep] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultData);
  const [errors, setErrors] =
    useState<Partial<Record<keyof FormData, string>>>(defaultError);

  const signupMutation = useSignup();
  const checkCompanyEmail = useCompanyEmail();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      const validationErrors = validateStep1(formData.email);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const { isValid } = await checkCompanyEmail.mutateAsync(formData.email);
        if (!isValid) {
          setErrors({ email: "This company email is not supported" });
        } else {
          setErrors(defaultError);
          setStep(2);
        }
      } catch (error) {
        setErrors({ email: "Error verifying email" });
      }
    } else if (step === 2) {
      const validationErrors = validateStep2(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      signupMutation.mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-[45%] w-full">
      {step === 1 ? (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col">
            <label htmlFor="email">Work Email</label>
            <Input
              id="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-red-600 text-sm">
                {errors.email || "Login failed"}
              </div>
            )}
          </div>
          {checkCompanyEmail.isPending ? (
            "Loading..."
          ) : (
            <Button className="w-full text-white bg-blue-500 flex justify-center items-center">
              Continue{" "}
              <MoveRight
                strokeWidth={DEFAULT_STROKE_WIDTH}
                width={DEFAULT_ICON_SIZE}
              />
            </Button>
          )}
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-between">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              name="name"
              placeholder="John Dow"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="text-red-600 text-sm">
                {errors.name || "Login failed"}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                className="w-full"
                placeholder="•••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="button"
                className="absolute right-0 top-0 h-full border-none"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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
              </Button>
            </div>
            {errors.password && (
              <div className="text-red-600 text-sm">
                {errors.password || "Login failed"}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Button
              className="w-1/3 border-2"
              type="button"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              className="w-2/3 text-white bg-blue-500 rounded-md"
              type="submit"
            >
              Create Account
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

export default SignUpForm;

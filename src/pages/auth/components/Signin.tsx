import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type UserRole =
  | "frontdesk"
  | "nurse"
  | "doctor"
  | "admin"
  | "diagnostics";

// Define the form data structure
interface FormData {
  username: string;
  password: string;
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "frontdesk", label: "Front Desk" },
  { value: "nurse", label: "Nurse" },
  { value: "doctor", label: "Doctor" },
  { value: "diagnostics", label: "Laboratory" },
  { value: "admin", label: "Admin" },
];

const ROLE_HOME: Record<UserRole, string> = {
  frontdesk: "/frontdesk",
  nurse: "/nurse",
  doctor: "/doctor",
  diagnostics: "/diagnostics",
  admin: "/admin",
};

const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("doctor");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const success = await signIn(data.username, data.password, selectedRole);

    if (success) {
      navigate(ROLE_HOME[selectedRole]);
      return;
    }

    alert("Invalid username or password");
  };

  return (
    <div>
      <div className="my-5">
        <h4 className="text-[20px] font-bold">
          Log in to your hospital’s dashboard
        </h4>
        <p className="text-sm">Enter your username and password to continue</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="relative mt-1">
            {/* Profile Icon */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon
                icon="iconamoon:profile-thin"
                width="24"
                height="24"
                className="text-gray-400"
              />
            </div>
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
            )}
          </div>
        </div>
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            {/* Profile Icon */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon
                icon="solar:lock-password-linear"
                width="24"
                height="24"
                className="text-gray-400"
              />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon
                icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                className="h-5 w-5 text-gray-500"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sign in as
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            {ROLE_OPTIONS.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/forgot-password"
          className="text-sm text-[#573fd1] font-bold"
        >
          Forgot password?
        </Link>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#573fd1] text-white py-4 rounded font-bold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;

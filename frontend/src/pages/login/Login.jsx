import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./login.validation.js";
import { initialValues } from "./login.initValues.js";
import toastError from "../../utils/toast.error.js";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { loginApi, loginWithGoogle } from "../../service/loginApi.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const resonce = await loginApi(values);

      const token = resonce.data.data.AccessToken;
      const role = resonce.data.data.isExist.role;
      if (values.remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      toast.success("login success 🎉");
      if (role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 500);
      } else {
        setTimeout(() => {
          navigate("/client");
        }, 500);
      }
    } catch (error) {
      toastError(error);
    }
  };
  const handleSignWithGoogle = async (credentialResponse) => {
    try {
      const responce = await loginWithGoogle(credentialResponse.credential);
      const token = responce.data.data;
      const decodedToken = jwtDecode(token);
      localStorage.setItem("token", token);
      if (decodedToken.aud[0] === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (error) {
      toastError(error);
    }
  };
  const [eye, setEye] = useState(false);
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">🍕 PizzaHub</h1>
            <p className="text-base-content/70 mt-2">
              Welcome back! Sign in to continue.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <label className="input w-full input-bordered flex items-center gap-2">
                  <FiMail className="text-lg opacity-70" />

                  <Field
                    name="email"
                    type="email"
                    className="grow"
                    placeholder="example@gmail.com"
                  />
                </label>

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-error text-sm"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <div className="relative w-full">
                  <Field
                    type={eye ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setEye(!eye)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {!eye ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-error text-sm"
                />
              </div>

              {/* Remember */}
              <div className="flex justify-between items-center">
                <label className="label cursor-pointer gap-2">
                  <Field
                    name="remember"
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                  />

                  <span className="label-text">Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </Form>
          </Formik>

          <div className="divider">OR</div>

          <GoogleLogin
            onSuccess={handleSignWithGoogle}
            onError={() => {
              toast.error("Google login failed");
            }}
          />
          <p className="text-center mt-5 text-sm">
            Don't have an account?{" "}
            <Link to="/" className="link link-primary font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

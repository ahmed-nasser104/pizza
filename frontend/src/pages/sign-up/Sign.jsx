import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { initialValues } from "./signup.initialValues.js";
import { validationSchema } from "./signup.validation.js";
import toastError from "../../utils/toast.error.js";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { signapi } from "../../service/signApi.js";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../service/loginApi.js";
import { jwtDecode } from "jwt-decode";

export default function Sign() {
  const navigate = useNavigate();

  const signUpHandler = async (values) => {
    try {
      await signapi(values);
      localStorage.setItem("email", values.email);
      toast.success("Account created successfully 🎉");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 500);
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
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">🍕 PizzaHub</h1>
            <p className="text-base-content/70 mt-2">
              Create your account and start ordering delicious pizzas.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={signUpHandler}
          >
            <Form className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>

                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                />

                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-error text-sm mt-1"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>

                <Field
                  type="text"
                  name="userName"
                  placeholder="Enter your username"
                  className="input input-bordered w-full"
                />

                <ErrorMessage
                  name="userName"
                  component="p"
                  className="text-error text-sm mt-1"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-error text-sm mt-1"
                />
              </div>

              <div>
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
                  className="text-error text-sm mt-1"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2">
                Create Account
              </button>
            </Form>
          </Formik>

          <div className="divider">OR</div>
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleSignWithGoogle}
              onError={() => {
                toast.error("Google login failed");
              }}
            />
          </div>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

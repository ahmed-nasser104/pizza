import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastError from "../../utils/toast.error";
import toast from "react-hot-toast";
import { verifyAccount } from "../../service/verifyApi.js";
export default function VerifyOtp() {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      inputs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const verifyHandler = async (e) => {
    try {
      e.preventDefault();
      const otp = inputs.current.map((input) => input.value).join("");
      if (otp.length !== 6) {
        return toast.error("Please enter the 6-digit verification code.");
      }
      await verifyAccount({
        otp,
        email,
      });
      toast.success("Email verified successfully! 🎉");
      setTimeout(() => {
        localStorage.removeItem("email");
        navigate("/login");
      }, 1500);
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Verify Email</h1>

            <p className="text-base-content/70 mt-3">
              We've sent a verification code to
            </p>

            <p className="font-semibold mt-1">{email}</p>
          </div>

          <form onSubmit={verifyHandler} className="mt-8 space-y-6">
            <div className="flex justify-center gap-3">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="input input-bordered text-center text-xl font-bold w-14 h-14"
                />
              ))}
            </div>

            <button className="btn btn-primary w-full">Verify</button>
          </form>

          <div className="divider">OR</div>

          <div className="text-center space-y-2">
            <p className="text-sm text-base-content/70">
              Didn't receive the code?
            </p>

            <button className="btn btn-link p-0">Resend OTP</button>

            <div>
              <Link to="/login" className="link link-hover text-sm">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

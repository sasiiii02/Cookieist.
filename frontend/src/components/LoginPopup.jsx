import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let endpoint =
        currState === "Login"
          ? "/api/users/login"
          : "/api/users/signup";

      const response = await axios.post(url + endpoint, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message || "Success");
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

        {/* Modal */}
        <form
          onSubmit={onLogin}
          className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-lg p-6 animate-fadeIn"
        >

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-brand font-semibold text-text">
              {currState}
            </h2>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="text-text hover:text-accent transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            {currState === "Sign Up" && (
              <input
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                type="text"
                placeholder="Your name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            )}

            <input
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />

            <input
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-accent text-white py-2 rounded-full font-brand hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : currState === "Sign Up"
              ? "Create Account"
              : "Login"}
          </button>

          {/* Terms */}
          {currState === "Sign Up" && (
            <div className="flex items-start gap-2 mt-4 text-xs text-text">
              <input type="checkbox" required className="mt-1 accent-accent" />
              <p>
                By continuing, I agree to the{" "}
                <span className="text-accent cursor-pointer">
                  Terms of Use
                </span>{" "}
                &{" "}
                <span className="text-accent cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>
          )}

          {/* Switch */}
          <p className="mt-5 text-sm text-center text-text">
            {currState === "Login" ? (
              <>
                Create a new account?{" "}
                <span
                  onClick={() => setCurrState("Sign Up")}
                  className="text-accent cursor-pointer font-medium"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setCurrState("Login")}
                  className="text-accent cursor-pointer font-medium"
                >
                  Login
                </span>
              </>
            )}
          </p>

        </form>
      </div>
    </>
  );
};

export default LoginPopup;

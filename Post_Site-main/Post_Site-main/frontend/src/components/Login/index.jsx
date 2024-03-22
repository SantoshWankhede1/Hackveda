import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      // if (
      // 	error.response &&
      // 	error.response.status >= 400 &&
      // 	error.response.status <= 500
      // ) {
      // 	setError(error.response.data.message);
      // }
      console.log("error at login page");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-140 h-96 flex rounded-lg shadow-md ">
        <div className="flex-2 flex flex-col items-center justify-center bg-white rounded-l-lg">
          <form className="flex flex-col items-center mx-8" onSubmit={handleSubmit}>
            <h1 className="text-4xl mb-8">Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input border border-gray-600 rounded-md px-6 py-1 text-black mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input border border-gray-600 rounded-md px-6 py-1 text-black mb-4"
            />
            <button type="submit" className="btn bg-green-500 w-28 h-12 p-0">
              Sign In
            </button>
          </form>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-green-500 rounded-r-lg px-4">
          <h1 className="text-4xl text-white mb-4 ">New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="btn bg-white text-green-500 w-28 h-12 p-0">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

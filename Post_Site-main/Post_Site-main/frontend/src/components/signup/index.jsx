import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      console.log("error at sign up page");
    }
  };

  return (
    <div class="w-full min-h-screen bg-gray-200 flex items-center justify-center">
      <div class="w-144 h-96 flex rounded-lg shadow-lg">
        <div class="flex-1 flex flex-col items-center justify-center bg-teal-500 rounded-l-lg px-4">
          <h1 class="text-white text-4xl mb-0">Welcome Back</h1>
          <a
            href="/login"
            class="mt-4 px-6 py-3 bg-white rounded-lg font-bold text-teal-500 "
          >
            Sign in
          </a>
        </div>
        <div class="flex-2 flex flex-col items-center justify-center bg-white rounded-r-lg">
          <form class="flex flex-col items-center mx-20" onSubmit={handleSubmit}>
            <h1 class="text-4xl mb-8">Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              class="input border border-gray-600 rounded-md px-6 py-1 text-black mb-4"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              class="input border border-gray-600 rounded-md px-6 py-1 text-black mb-4"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              class="input border border-gray-600 rounded-md px-6 py-1 text-black mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              class="input border border-gray-600 rounded-md px-6 py-1 text-black mb-4"
            />
            <button type="submit" class="btn bg-teal-500 w-28 h-12 p-0">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

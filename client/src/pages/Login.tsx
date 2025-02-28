import { useState } from "react";
import LabeledInput from "../components/layout/LabeledInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, password
      })
    })
    const data = await res.json();

    if(!data.token){
      alert("Something went wrong while logging in");
      return;
    }

    localStorage.setItem("token", data.token);
    // redirect to home page
    window.location.href = "/";
    // otherwise, alert the user
    alert("Wrong email or password");
    
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 min-w-[50vw] text-white bg-gray-600 p-5 rounded"
      >
        <h3 className="text-xl font-medium text-white">
          Sign in to our platform
        </h3>
        <LabeledInput
          label="Your email"
          placeholder="example@company.com"
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabeledInput
          label="Your password"
          placeholder="********"
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2 bg-green-500 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>

        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?&nbsp;
          <a href="/register" className="text-primary hover:underline ">
            Create account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;

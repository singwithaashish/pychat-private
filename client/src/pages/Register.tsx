import { useState } from "react";
import LabeledInput from "../components/layout/LabeledInput";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confPassword) {
      alert("Password and confirm password do not match");
      setLoading(false);
      return;
    }
    // set the token 
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
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
      alert("Something went wrong while registering");
      setLoading(false);
      return;
    }
    
    localStorage.setItem("token", data.token);
    // redirect to home page
    window.location.href = "/";

    setLoading(false);
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 min-w-[50vw] bg-gray-600 text-white p-5 rounded"
      >
        <LabeledInput
          label="Your email"
          placeholder="example@company.com"
          id="email"
          type="email"
          required
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <LabeledInput
          label="Your password"
          placeholder="********"
          id="password"
          type="password"
          required
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <LabeledInput
          label="Confirm password"
          placeholder="********"
          id="confPassword"
          type="password"
          required
          value={confPassword}
          onChange={(e: any) => setConfPassword(e.target.value)}
        />

        <button type="submit" className="w-full flex justify-center py-2 bg-green-500 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          {loading ? "Loading..." : "Register"}
        </button>
        <div className="flex justify-between text-sm font-medium text-gray-500">
          Already registered?&nbsp;
          <a href="/login" className="text-primary hover:underline">
            login to your account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;

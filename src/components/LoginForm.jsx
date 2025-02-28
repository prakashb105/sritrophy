import { useState } from "react";

const LoginForm = () => {
  const [collegeName, setCollegeName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add Firebase logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select College</option>
        <option value="College 1">College 1</option>
        <option value="College 2">College 2</option>
      </select>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
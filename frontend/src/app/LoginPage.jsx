import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { auth } from "../features/auth/auth.js";

export default function LoginPage() { 
    const navigate = useNavigate(); 

    const [form, setForm] = useState({
        email: "",
        password: "" 
    }); 

    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 

    function handleChange(e){ 
        setForm({ 
            ...form, 
            [e.target.name]: e.target.value,
        });
    }
    async function handleSubmit(e) { 
        e.preventDefault(); 
        setLoading(true); 
        setError(""); 

        try { 
            await auth.login(form.email, form.password); 
            navigate("/dashboard"); 
        } catch (err) { 
            setError(err.message);
        } finally { 
            setLoading(false); 
        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer"
              // onClick={() => navigate("/register")}
              // className="text-blue-600 cursor-pointer"
            >
              Create one
            </span> 
          </p>
        </form>
      </div>
    </div>
  );
}
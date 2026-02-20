import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { auth } from "../features/auth/auth"; 

export default function RegisterPage() { 
    const navigate = useNavigate(); 
    const [form, setForm] = useState({ 
        email: "", 
        password: "", 
    }); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 

    function handleChange(e) { 
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
            await auth.register(form.email, form.password); 
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
                    Create Account
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
                            className="w-full border p-2 rounded-lg"
                            placeholder="you@example.com"
                            required
                        ></input>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                            placeholder="Password"
                            required
                        ></input>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 cursor-pointer"
                        >
                        Login here
                        </span>
                    </p>
                </form>
            </div>
        </div> 
    );
}
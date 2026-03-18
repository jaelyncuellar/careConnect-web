import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { auth } from "../features/auth/auth.api";
import { useAuth } from "../features/auth/AuthContext.jsx"; 

export default function RegisterPage() { 
    const navigate = useNavigate(); 
    const { register } = useAuth(); 

    const [form, setForm] = useState({ 
        firstName: "", 
        lastName: "", 
        role: "", 
        phone: "", 
        email: "", 
        password: "", 
        address: "", 
        startDate: ""
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
            // let payload = { startDate, ...form };
            const data = await auth.register(form); 
            console.log("REGISTER RESPONSE:", data); // should show UUID 
            register(data);
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
                    <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
                    <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
                    <div>
                        {/* <label className="block mb-1 font-medium text-sm">Role</label> */}
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                            required
                        >
                            <option value="">Select role</option>
                            <option value="caregiver">Caregiver</option>
                            <option value="nurse">Nurse</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
                    <input type="password" name="password"  placeholder="Password" minLength={1} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
                    <input name="address" placeholder="Address" onChange={handleChange} className="w-full border p-2 rounded-lg" required />
                    <input type="date" name="startDate" onChange={handleChange} className="w-full border p-2 rounded-lg" required />

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
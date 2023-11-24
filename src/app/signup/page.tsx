'use client';
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast";


export default function SignupPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user);
            console.log("Signup Success", response.data)
            router.push('/login')
        } catch (err: any) {
            console.log("Signup Failed", err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-4 flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <hr />
            <div className="flex gap-4 justify-center items-center">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    className="rounded-xl p-2 text-black outline-none"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                />
            </div>
            <div className="flex gap-4 justify-center items-center">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    className="rounded-xl p-2 text-black outline-none"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />
            </div>

            <div className="flex gap-4 justify-center items-center">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    className="rounded-xl p-2 text-black outline-none"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
            </div>
            <div className="flex gap-4 justify-center items-center">
                <button className="p-2 border-2 rounded-xl" onClick={onSignup} disabled={buttonDisabled} >{loading ? "Processing..." : "Signup here"}</button>
                <Link className="p-2 border-2 rounded-xl" href="/login">Login</Link>
            </div>
        </div>
    )
}
'use client';
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"


export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    const onLogin = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/login', user)
            console.log("Login Success")
            router.push('/profile')
        } catch (err: any) {
            console.log("Login Failed", err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-4 flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold">Login</h1>
            <hr />
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
                <button className="p-2 border-2 rounded-xl" onClick={onLogin} disabled={buttonDisabled} >{loading ? "Processing..." : "Login"}</button>
                <Link className="p-2 border-2 rounded-xl" href="/signup">Singup</Link>
            </div>
        </div>
    )
}
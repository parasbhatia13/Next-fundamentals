
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from "next-auth/react";


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [disable, setDisable] = useState(false)
    const [loading, setloading] = useState(false)
    const onLogin = async () => {
        try {
            setloading(true)
            const response: any = await signIn("credentials", { email: user.email, password: user.password, redirect: false })
            if (response.ok) {
                router.push("/profile")
                toast.success("Login Successfull")
                console.log(response, 'response');
            }
            if (!response.ok) {
                toast.error("Invalid Credentials")
            }
            setloading(false)

        } catch (error: any) {
            console.log(error)
            setloading(false)

        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisable(false)

        } else {
            setDisable(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">

            <div className="flex flex-col items-center justify-center p-5 border rounded-lg border-gray-200  shadow-lg mb-3 bg-white">
                <h1 className="text-2xl mb-4 ">{loading ? "Processing....." : "Login"}</h1>

                <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                <input
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Enter email"
                    id="email"
                    value={user.email}
                    type="text"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <label htmlFor="password">Password<span className="text-red-500">*</span></label>
                <input
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Enter password"
                    id="password"
                    value={user.password}
                    type="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button
                    className="m-3 p-2 border border-green-500 rounded-lg shadow-lg"
                    onClick={onLogin}
                    disabled={!user.email || !user.password}
                >
                    Login
                </button>
            </div>
            Dont have an account? <Link href="/signup" className="underline text-blue-500"> Sign Up </Link>
            <Toaster />
        </div>
    )
}
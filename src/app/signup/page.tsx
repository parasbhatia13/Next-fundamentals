"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';



export default function SignUp() {
    const router = useRouter()
    const [loading, setloading] = useState(false)

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [btnDisable, setDisable] = useState(true)
    const onSignUp = async () => {
        try {
            setloading(true)
            let response = await axios.post("/api/users/signup", user)
            console.log(response, 'Response, success');
            toast.success(response.data.message)

            router.push('/login ')
            setloading(false)
        } catch (error: any) {
            console.log("error", error);
            setloading(false)

            toast.error(error.message)
        } finally {

        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">

            <div className="flex flex-col items-center justify-center p-5 border rounded-lg border-gray-200  shadow-lg bg-white">
                <h1 className="text-2xl mb-4 ">{loading ? "Processing....." : "Sign Up"}</h1>
                <label htmlFor="username">Username<span className="text-red-500">*</span></label>
                <input
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Enter username"
                    id="username"
                    value={user.username}
                    type="text"
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />

                <label htmlFor="email">Email<span className="text-red-500">*</span></label>
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
                    onClick={onSignUp}
                    disabled={btnDisable}
                >
                    Sign up
                </button>
            </div>
            Already have an account? <Link href="/login" className="underline text-blue-500"> login here </Link>

            <Toaster />
        </div>
    )
}
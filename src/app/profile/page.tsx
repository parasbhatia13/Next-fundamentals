"use client"

import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"

export default function ProfilePage() {
    const router = useRouter()
    const session = useSession()
    console.log(session, 'statusstatusstatusstatusstatusstatusstatus')
    const handleLogout = async () => {
        // try {
        //     const response = await axios.get("/api/users/logout")
        //     console.log(response, "response");
        //     router.push("/login")
        //     toast.success(response.data.message)
        // } catch (error: any) {
        //     console.log("error", error)
        //     toast.success('Unable to Logout.')

        // }
        const response = await signOut()
    }
    const [data, setData] = useState()
    const [loading, setloading] = useState(false)

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/myInfo")
            console.log(response)
            setData(response.data.data._id)

        } catch (error: any) {
            console.log(error)
        }

    }
    const [pwd, setPwd] = useState({
        password: "",
        confirmPassword: ""
    })
    const handleResetPassword = async () => {
        try {
            setloading(true)

            const response = await axios.put("/api/users/myInfo", { confirmPassword: pwd.confirmPassword })
            console.log(response.data, 'response');

            toast.success(response.data.message)
            setloading(false)

        } catch (error: any) {
            toast.error(error.response.data.error)
            setloading(false)

        }
    }
    return (
        <div>
            <div className="flex justify-between bg-blue-300">
                <h1 className="text-2xl m-3">Welcome to profile page!!</h1>
                <span className="flex">
                    <p className="mt-5">{session?.data?.user?.email}</p>
                    <button
                        className="m-3 p-2 border border-blue-500 rounded-lg shadow-lg"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <p></p>
                </span>
            </div>
            <div>

                <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">

                    {/* <h2 className="padded  p-2 rounded bg-orange-500 text-white">
                {data ? <Link href={`/profile/${data}`}>There you go</Link> : "No data found"}
            </h2>
            <button
                className="m-3 p-2 border border-green-800 rounded-lg shadow-lg"
                onClick={getUserDetails}
            >
                Get User Details

            </button> */}
                    <div className="flex flex-col items-center justify-center p-5 border rounded-lg border-gray-200  shadow-lg bg-white">
                        <h1 className="text-2xl mb-4">{loading ? "Processing....." : "Update Password"}</h1>
                        <label htmlFor="password">New Password<span className="text-red-500">*</span></label>
                        <input
                            className="border border-gray-300 rounded px-2 py-1"
                            placeholder="Enter New Password"
                            id="password"
                            value={pwd.password}
                            type="password"
                            onChange={(e) => setPwd({ ...pwd, password: e.target.value })}
                        />
                        <label htmlFor="confirmPassword" >Confirm Password<span className="text-red-500">*</span></label>
                        <input
                            className="border border-gray-300 rounded px-2 py-1"
                            placeholder="Enter Confirm Password"
                            id="confirmPassword"
                            value={pwd.confirmPassword}
                            type="password"
                            onChange={(e) => setPwd({ ...pwd, confirmPassword: e.target.value })}
                        />
                        <button
                            className="m-5 p-2 border border-green-500 rounded-lg shadow-lg"
                            onClick={handleResetPassword}
                            disabled={!pwd.password && !pwd.confirmPassword}
                        >
                            Update Password
                        </button>
                    </div>
                    <Toaster />
                </div>
            </div>
        </div>
    )
}


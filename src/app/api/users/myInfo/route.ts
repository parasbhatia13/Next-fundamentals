import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/UsersModel"
import { connect } from "@/dbconfig/dbconfig";
import bcryptjs from "bcryptjs"

connect()
// here we have created the route handler with 2 methods
export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const userInformation = await User.findOne({ email: userId }).select("-password")
        return NextResponse.json({ message: "User find", data: userInformation })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json()

        const { confirmPassword } = reqBody
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(confirmPassword, salt)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { password: hashedPassword } },
            { new: true }
        );

        return NextResponse.json({ message: "Password updated successfully", sucess: true, updatedUser })

    } catch (error: any) {
        console.log(error, 'error');
        
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

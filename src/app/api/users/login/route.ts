import { connect } from "@/dbconfig/dbconfig"
import User from "@/models/UsersModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()
// As we have added the nextAuthjs  so we are not using this route handler for the login however we can use this as well if we are doing authentication with nextAuth

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody, ';reqBody');

        //check if user exist 
        let user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User not exists" }, { status: 400 })

        }

        // validate password 
        // bcryptjs has its own metod compare 
        const validatePassword = await bcryptjs.compare(password, user?.password)
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
        }
        //create token data 
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log("process.env.TOKEN_SECRET", process.env.TOKEN_SECRET);

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        const response = NextResponse.json({ message: "Login Succesfull", success: true, token })
        response.cookies.set("token", token, { httpOnly: true })
        console.log(token, 'response');

        return response;

    } catch (error: any) {
        console.log(error, 'error------');
        return NextResponse.json({ error: "Error while login" }, { status: 500 })
    }
}
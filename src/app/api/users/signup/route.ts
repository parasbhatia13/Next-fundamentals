import { connect } from "@/dbconfig/dbconfig"

import User from "@/models/UsersModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
// import { sendEmail } from "@/helpers/mailer"

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log(reqBody, "body");

        // hash the password 
        //bcryptjs.genSalt(10) generates a salt, which is a random value used to increase the security of the hashing process. 
        //The 10 in this function call represents the "rounds" of salting, determining the complexity of the salt generation. 
        const salt = await bcryptjs.genSalt(10)
        //bcryptjs.hash(password, salt) is used to hash the plaintext password using the generated salt. 
        //The password is the plaintext password that you want to hash, and salt is the randomly generated salt.
        // The resulting hashedPassword is the hashed representation of the plaintext password.
        const hashedPassword = await bcryptjs.hash(password, salt)
        // create a user 
        const newUser = new User({
            username,
            email,
            password: hashedPassword

        })
        const savedUser = await newUser.save()
        console.log("saved", savedUser);
        return NextResponse.json({ message: "User created successfully", sucess: true, savedUser })


    } catch (error: any) {
        return NextResponse.json({
            error: error.message, status: 500
        }
        )
    }
}
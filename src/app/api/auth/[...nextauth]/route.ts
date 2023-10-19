import User from "@/models/UsersModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { connect } from "@/dbconfig/dbconfig";


export const authOptions: any = {
    providers: [
        CredentialsProvider({
            name: "credentails",
            // we can add input fields here however as we are using the custom for so we will keep it empty
            credentials: {},
            // authorize callback will call authorized callback, initiates when user try to login // // Add logic here to look up the user from the credentials supplied
            async authorize(credentails) {
                try {
                    await connect()
                    const { email, password }: any = credentails
                    console.log(email, password);

                    let user = await User.findOne({ email })
                    if (!user) {
                        console.log('user not found');

                        return null

                    }
                    console.log('here');

                    // validate password 
                    // bcryptjs has its own metod compare 
                    const validatePassword = await bcryptjs.compare(password, user?.password)
                    if (!validatePassword) {
                        return null
                    }
                    return user;

                } catch (error) {
                    console.log(error, "error");

                }
            }

        })
    ],
    session: {
        strategy: "jwt" ,// allow us to track user through json web tokens 
    },
    secret: process.env.NEXTAUTH_SECRET, // secret is mandatory in production 
    pages: {
        signIn: "/login"
    }
}

//initialize NextAuth.js with a Route Handler too, very similar to API Routes.
//Internally, NextAuth.js detects that it is being initialized in a Route Handler (by understanding that it is passed a Web Request instance), and will return a handler that returns a Response instance. 
//A Route Handler file expects you to export some named handler functions that handle a request and return a response. 
//NextAuth.js needs the GET and POST handlers to function properly, so we export those two.
const handler = NextAuth(authOptions)

//any functionality nextAuth provides is a get request or post request
export { handler as GET, handler as POST }
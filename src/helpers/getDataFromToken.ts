import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt"
export const getDataFromToken = async (req: NextRequest) => {
    const secret = process.env.NEXTAUTH_SECRET
    try {
        //getToken to get the auth token.
        const data: any = await getToken({ req, secret })
        return data.sub;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
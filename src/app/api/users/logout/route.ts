import { NextResponse } from "next/server";
// we are not using this route handler as well because nextauth have the inbuild signout as well
export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logout Successful", success: true })
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
        return response;
    } catch (error: any) {
        NextResponse.json({ error: "Unable to logout", status: 500 })
    }
}

import { NextResponse } from "next/server";

export const POST = async (request) => {
    const res = new NextResponse(
        JSON.stringify({
            message: 'Logout successfull'
        })
    );
    res.cookies.set('jwt-token', "", {
        expires: new Date(Date.now())
    })
    return res;
}
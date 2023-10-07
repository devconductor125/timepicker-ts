import { NextRequest, NextResponse } from "next/server";
import { sendVerificationCode } from "@/lib/server/auth";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { user_id } = body
    const code = Math.floor(1000 + Math.random() * 8999)

    try {
        const res = await sendVerificationCode(code, user_id)
        return NextResponse.json(true)
    } catch (e) {
        console.log("api/auth/send_verification_code: An error occured while sending verification code")
        console.error(e)
        return NextResponse.json(false)
    }
}
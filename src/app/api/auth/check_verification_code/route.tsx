import { NextRequest, NextResponse } from "next/server";
import { checkVerificationCode } from "@/lib/server/auth";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { user_id, code } = body

    let code_res
    try {
        code_res = await checkVerificationCode(code, user_id)
        return NextResponse.json(code_res)
    } catch (e) {
        console.log("api/auth/check_verification_code: An error occured while checking verification code")
        console.error(e)
        return NextResponse.json(false)
    }
}
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.SERVICE_ROLE_KEY ?? "")

export async function sendVerificationCode(code: number, user_id: string) {
    console.log(`Sending verification code ${code} to user ${user_id}`)

    const { data, error } = await supabase.from("users").select("*").eq("id", user_id)
    console.log(data)

    if (error) throw error
    if (!data || data.length === 0) throw new Error("User not found")

    await supabase.from("verification_codes").insert({
        user_id,
        code
    })

    const user = data[0]
    const res = await resend.emails.send({
        from: "noreply@joinrefine.io",
        to: user.email,
        subject: "Your verification code",
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tiqr Verification Code</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #121212;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                        color: #fff;
                    }

                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #1e1e1e;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                        overflow: hidden;
                    }

                    .header {
                        background-color: #282828;
                        color: #fff;
                        padding: 20px;
                    }

                    .content {
                        padding: 20px;
                        text-align: left;
                    }

                    .verification-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #64ffda;
                    }

                    .instructions {
                        margin-top: 20px;
                        color: #aaa;
                    }

                    .footer {
                        background-color: #1e1e1e;
                        padding: 10px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Tiqr Verification Code</h1>
                    </div>
                    <div class="content">
                        <p class="instructions">Hello ${user.email.split("@")[0]},</p>
                        <p class="instructions">Your verification code for Tiqr is:</p>
                        <p class="verification-code">${code}</p>
                        <p class="instructions">Please use this code to complete the verification process on Tiqr.</p>
                    </div>
                    <div class="footer">
                        <p>If you did not request this code, please ignore this email.</p>
                    </div>
                </div>
            </body>
            </html>`
    })
}

export async function checkVerificationCode(code: number, user_id: string): Promise<boolean> {
    console.log(`Checking verification code ${code} for user ${user_id}`)

    const { data, error } = await supabase.from("verification_codes").select("*").eq("user_id", user_id).eq("code", code)
    if (error) throw error
    if (!data || data.length === 0) throw new Error("Verification code not found")

    for(let db_code of data) {
        if (db_code.code == code) {
            await supabase.from("verification_codes").delete().eq("user_id", user_id).eq("code", code)
            await supabase.from("users").update({ verified: true }).eq("id", user_id)
            return true
        }
    }

    return false
}
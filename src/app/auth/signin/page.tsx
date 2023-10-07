"use client"

import Divider from "@/components/divider"
import EmbeddedLink from "@/components/embeddedlink"
import { InputType } from "@/components/form/input"
import InputGroup from "@/components/form/inputgroup"
import Submit from "@/components/form/submit"
import { useState } from "react"
import { toast } from "react-toastify"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation"
import VerificationCodeModal from "@/components/modals/verificationcodemodal"
import axios from "axios"

const Page = () => {
    const supabase = createClientComponentClient()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>("")
    const router = useRouter()

    async function sendVerificationCode() {
        console.log("Sending code to " + userId)
        toast.success("Sending verification code")
        await axios.post("/api/auth/send_verification_code", {
            user_id: userId
        })
    }

    async function checkCode(code: string) {
        const res = await axios.post("/api/auth/check_verification_code", {
            user_id: userId,
            code
        })

        if(res.data === true) {
            router.push("/upcoming_events")
        } else {
            toast.error("Invalid verification code.")
        }
    }

    async function signIn() {
        const signinRes = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(signinRes.error) {
            toast.error(signinRes.error.message)
            return
        } else {
            console.log(signinRes.data.user.id)
            const { data, error } = await supabase.from("users").select("*").eq("id", signinRes.data.user.id).single()
            if(error) {
                toast.error(error.message)
                return
            }

            setUserId(signinRes.data.user.id)
            if(!data.verified) {
                setShowVerificationModal(true)
                return
            } else {
                router.push("/upcoming_events")
            }
        }
    }

    return (
        <main className="flex flex-col">
            <img className="mx-auto w-[50vw] mt-16 mb-10" src="/tiqr_logo.svg" />
            <p className="font-semibold text-center mb-10 text-lg">Welcome Back!</p>

            <div className="flex flex-col mx-10 mt-5 mb-12 gap-5">
                <InputGroup
                    label="Email"
                    placeholder="Enter your email"
                    type={InputType.TEXT}
                    onChange={(value) => setEmail(value)}
                />
                <InputGroup
                    label="Password"
                    placeholder="********"
                    type={InputType.PASSWORD}
                    onChange={(value) => setPassword(value)}
                />
            </div>

            <Submit
                text="Sign In"
                onClick={signIn}
            />

            <EmbeddedLink
                text="Already have an account?"
                linkText="Sign Up"
                linkHref="/auth/signup"
                className="mt-5"
            />

            <Divider className="mx-10" />

            {showVerificationModal && (
                <VerificationCodeModal 
                    email={email} 
                    sendVerificationCode={sendVerificationCode}
                    checkVerificationCode={checkCode}                
                />
            )}
        </main>
    )
}

export default Page
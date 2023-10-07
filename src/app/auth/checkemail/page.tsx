"use client"
import Submit from "@/components/form/submit"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect } from "react"

const Page = () => {
    const router = useRouter()

    return (
        <main className="flex flex-col min-h-screen">
            <p className="mt-10 font-medium text-lg text-center">Check your email</p>
            <p className="mt-5 text-sm text-secondary text-left mx-auto max-w-[70vw]">We have sent a link to verifiy your account to your email address. Please click the link to continue.</p>

            <Submit
                text="Continue"
                className="mt-auto mb-10"
                onClick={() => {router.push("/upcoming_events")}}
            />
        </main>
    )
}

export default Page
"use client"

import AccountTypeSelector from "@/components/account_type_selector"
import Divider from "@/components/divider"
import EmbeddedLink from "@/components/embeddedlink"
import BirthdayInput from "@/components/form/birthdayinput"
import { InputType } from "@/components/form/input"
import InputGroup from "@/components/form/inputgroup"
import Submit from "@/components/form/submit"
import { AccountType } from "@/types/accounts"
import { ValidationError } from "@/types/forms"
import { useState } from "react"
import { toast } from "react-toastify"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Dropdown from "@/components/form/dropdown"
import { useRouter } from "next/navigation"
import axios from "axios"
import VerificationCodeModal from "@/components/modals/verificationcodemodal"

const Page = () => {
    const supabase = createClientComponentClient()
    const [accountType, setAccountType] = useState<AccountType>(AccountType.GUEST)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [organizationTitle, setOrganizationTitle] = useState<string>("")
    const [website, setWebsite] = useState<string>("")
    const [gender, setGender] = useState<string>("Male")
    const [userId, setUserId] = useState<string>()

    const [birthdayError, setBirthdayError] = useState<ValidationError | null>(null)
    const [birthday, setBirthday] = useState<string | null>(null)
    const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false)

    const router = useRouter()

    async function submitAccount() {
        if(password != confirmPassword) {
            toast.error("Passwords do not match.")
            return
        }
        if(gender != "Male" && gender != "Female" && gender != "Other") {
            toast.error("Please select a gender.")
            return
        }
        if(accountType == AccountType.GUEST && birthdayError) {
            toast.error("Please enter a valid birthday.")
            return
        }
        if(accountType == AccountType.HOST && (organizationTitle == "" || website == "")) {
            toast.error("Please fill out all fields.")
            return
        }

        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
              //emailRedirectTo: redirect_url,
            },
        })

        if(res.error) {
            toast.error(res.error.message)
            return
        }

        setUserId(res.data.user?.id ?? "")

        if(accountType == AccountType.GUEST) {
            const insertRes = await supabase.from("users").insert({
                id: res.data.user?.id ?? "",
                email: email,
                is_host: false,
                birthday,
                is_male: gender == "Male"
            })
            
            if(insertRes.error) {
                toast.error(insertRes.error.message)
            }
        } else if(accountType == AccountType.HOST) {
            const insertRes = await supabase.from("users").insert({
                id: res.data.user?.id ?? "",
                email: email,
                is_host: true,
                organization_name: organizationTitle,
                website: website,
                is_male: gender == "Male"
            })

            if(insertRes.error) {
                toast.error(insertRes.error.message)
            }
        }

        sendVerificationCode(res.data.user?.id ?? "")
        setShowVerificationModal(true)
        //router.push("/auth/checkemail")
    }

    async function sendVerificationCode(id: string) {
        console.log("Sending code to " + id)
        toast.success("Sending verification code")
        await axios.post("/api/auth/send_verification_code", {
            user_id: id
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

    return (
        <main className="flex flex-col">
            <img className="mx-auto w-[50vw] mt-16 mb-10" src="/tiqr_logo.svg" />
            <p className="font-semibold text-center mb-10 text-lg">Create Account</p>

            <AccountTypeSelector
                onChange={(accountType) => setAccountType(accountType)}
            />

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
                <InputGroup
                    label="Confirm Password"
                    placeholder="********"
                    type={InputType.PASSWORD}
                    onChange={(value) => setConfirmPassword(value)}
                />
                <div className="flex flex-col gap-2">
                    <p className="text-sm">Your Gender</p>
                    <Dropdown
                        options={[
                            {label: "Male", value: "Male"},
                            {label: "Female", value: "Female"},
                            {label: "Other", value: "Other"}
                        ]}
                        defaultValue="Male"
                        placeholder="Select a gender"
                        onChange={(item) => setGender(item.value)}
                    />
                </div>

                {accountType === AccountType.HOST ? (
                    <>
                        <InputGroup
                            label="Organization Title"
                            placeholder="Google"
                            type={InputType.TEXT}
                            onChange={(value) => setOrganizationTitle(value)}
                        />
                        <InputGroup
                            label="Website"
                            placeholder="https://www.google.com"
                            type={InputType.TEXT}
                            onChange={(value) => setWebsite(value)}
                        />
                    </>
                ) : (
                    <>
                        <BirthdayInput
                            onChange={(value: string | ValidationError) => {
                                if(typeof value == "string") {
                                    setBirthdayError(null)
                                    setBirthday(value)
                                } else {
                                    setBirthdayError(value)
                                    setBirthday(null)
                                }
                            }}
                            defaultValue={birthday ?? ""}
                        />
                    </>
                )}
            </div>

            <Submit
                text="Sign Up"
                onClick={submitAccount}
            />

            <EmbeddedLink
                text="Already have an account?"
                linkText="Sign In"
                linkHref="/auth/signin"
                className="mt-5"
            />

            <Divider className="mx-10" />

            {showVerificationModal && (
                <VerificationCodeModal 
                    email={email} 
                    sendVerificationCode={()=>{sendVerificationCode(userId ?? "")}}
                    checkVerificationCode={checkCode}                
                />
            )}
        </main>
    )
}

export default Page
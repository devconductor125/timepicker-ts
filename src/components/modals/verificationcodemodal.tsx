"use client"

import { useEffect, useRef, useState } from "react"
import Submit from "../form/submit"

interface Props {
    email: string
    sendVerificationCode: () => void
    checkVerificationCode: (code: string) => void
}

const VerificationCodeModal: React.FC<Props> = ({email, sendVerificationCode, checkVerificationCode}) => {
    const [code, setCode] = useState<string>("")

    return (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/50 flex">
            <div className="mx-5 px-10 py-5 h-fit my-auto flex flex-col bg-[#2A2A2A] rounded-lg shadow">
                <p className="text-center text-xl font-semibold mb-10">Verify your Email</p>
                <p className="text-xs text-secondary mb-10">We have sent a verification code to <span className="text-white">{email}</span></p>
                <VerificationCodeInputGroup onChange={(newCode: string)=>{setCode(newCode)}}/>
                <Submit
                    text="Verify Email"
                    onClick={()=>{checkVerificationCode(code)}}
                    className="mt-10"
                />
                <p className="text-xs text-secondary text-center mt-5">Didn&apos;t receive a code? <span onClick={sendVerificationCode} className="text-white font-semibold">Try Again</span></p>
            </div>
        </div>
    )
}

interface VerificationCodeInputGroupProps {
    onChange: (code: string) => void
}

const VerificationCodeInputGroup: React.FC<VerificationCodeInputGroupProps> = ({onChange}) => {
    const [digitOne, setDigitOne] = useState<string>("")
    const [digitTwo, setDigitTwo] = useState<string>("")
    const [digitThree, setDigitThree] = useState<string>("")
    const [digitFour, setDigitFour] = useState<string>("")

    const [enteredCode, setEnteredCode] = useState<string>("")

    useEffect(() => {
        setEnteredCode(digitOne + digitTwo + digitThree + digitFour)
    }, [digitOne, digitTwo, digitThree, digitFour])

    useEffect(() => {
        onChange(enteredCode)
    }, [enteredCode])

    return (
        <div className="flex flex-row gap-2">
            <VerificationCodeInput setDigit={setDigitOne}/>
            <VerificationCodeInput setDigit={setDigitTwo}/>
            <VerificationCodeInput setDigit={setDigitThree}/>
            <VerificationCodeInput setDigit={setDigitFour}/>
        </div>
    )
}

interface VerificationCodeInputProps {
    setDigit: (digit: string) => void
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({setDigit}) => {
    const inputRef = useRef(null)
    
    const handleInputChange = (e: any) => {
        const currentValue = e.target.value
        setDigit(currentValue)
        if(currentValue.length >= 1) {
            const nextSibling = e.target.nextElementSibling
            if(nextSibling) {
                nextSibling.focus()
            }
        }

        if(currentValue.length == 0) {
            const previousSibling = e.target.previousElementSibling
            if(previousSibling) {
                previousSibling.focus()
            }
        }
    }

    return (
        <input type="number" ref={inputRef} onChange={handleInputChange} className="text-3xl bg-[#343434] focus:outline-none focus:scale-110 focus:shadow transition-all w-[15vw] text-center rounded"/>
    )
}

export default VerificationCodeModal
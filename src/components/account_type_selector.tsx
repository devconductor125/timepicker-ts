"use client"

import { useEffect, useState } from "react"
import { AccountType } from "@/types/accounts"

interface Props {
    onChange: (accountType: AccountType) => void
}

const AccountTypeSelector: React.FC<Props> = ({onChange}) => {
    const [accountType, setAccountType] = useState<AccountType>(AccountType.GUEST)

    useEffect(() => {
        onChange(accountType)
    }, [accountType])

    return (
        <div className="flex flex-row p-[2px] rounded-sm border-2 border-[#2A2A2A] w-fit gap-1 mx-auto">            
            <Item
                isActive={accountType === AccountType.GUEST}
                onClick={() => setAccountType(AccountType.GUEST)}
                text="Event Guest"
            />
            <Item
                isActive={accountType === AccountType.HOST}
                onClick={() => setAccountType(AccountType.HOST)}
                text="Event Host"
            />
        </div>
    )
}

interface ItemProps {
    isActive: boolean
    onClick: () => void
    text: string
}

const Item: React.FC<ItemProps> = ({isActive, onClick, text}) => {
    return (
        <div onClick={onClick} className={`px-5 py-3 rounded transition-all duration-500 ${isActive ? "text-white bg-[#2A2A2A]" : "text-secondary bg-none"}`}>
            <p>{text}</p>
        </div>
    )
}

export default AccountTypeSelector
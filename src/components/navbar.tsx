"use client"

import { useEffect, useState } from "react"
import Submit from "./form/submit"
import { useRouter } from "next/navigation"
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { TiqrUserType, determineUserType } from "@/lib/client/authhelper"

const Navbar = () => {
    const [user, setUser] = useState<User>()
    const [userType, setUserType] = useState<TiqrUserType>(TiqrUserType.GUEST)
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()
    
    function closeNavbar() {
        setMenuOpen(false)
    }

    const supabase = createClientComponentClient()

    useEffect(() => {
        supabase.auth.getUser().then(async (res) => {
            if(res?.data?.user) {
                setUser(res.data.user)
            }
        })
    }, [])

    useEffect(() => {
        if(user) {
            determineUserType(supabase, user.id).then(type => {
                setUserType(type)
            })
        }
    }, [user])

    function logOut() {
        supabase.auth.signOut()
        setUser(undefined)
        window.location.href = "/"
    }

    return (
        <>
            <div onClick={()=>{setMenuOpen(true)}} className="absolute top-5 left-5 bg-[#2A2A2A] rounded-full p-3">
                <img src="/popout-icon.svg"/>
            </div>

            <div onClick={closeNavbar} className={`fixed left-0 top-0 h-screen w-screen flex ${menuOpen ? "z-40" : "-z-50"}`}>
                <div className={`h-full w-full backdrop-blur-sm bg-black/30 transition-all ${menuOpen ? "opacity-100" : "opacity-0"}`}/>
            </div>

            {userType == TiqrUserType.GUEST && (
                <GuestNavbar
                    user={user}
                    logOut={logOut}
                    menuOpen={menuOpen}
                />
            )}    

            {userType == TiqrUserType.HOST && (
                <HostNavbar
                    user={user}
                    logOut={logOut}
                    menuOpen={menuOpen}
                />
            )}        
        </>

    )
}

interface NavbarProps {
    user?: User
    logOut: () => void
    menuOpen: boolean
}

const GuestNavbar: React.FC<NavbarProps> = ({user, logOut, menuOpen}) => {
    return (
        <div onClick={(e)=>{e.stopPropagation()}} className={`fixed left-0 top-0 flex flex-col w-[60vw] h-screen bg-[#2A2A2A] z-50 transition-all duration-700 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="w-full bg-[#343434] py-12 flex">
                <img className="w-[40vw] mx-auto" src="/tiqr_logo.svg"/>
            </div>
            
            <NavItem
                text="Marketplace"
                onClick={() => {window.location.href = "/events"}}
            />

            <NavItem
                text="Your Tickets"
                onClick={() => {window.location.href = "/upcoming_events"}}
            />

            {user ? (
                <div className="mt-auto mb-2 flex flex-row w-full px-2">
                    <Submit
                        text="Log Out"
                        onClick={logOut}
                        className="mx-[0px] w-full text-xs"
                    />
                </div>
            ) : (
                <div className="mt-auto mb-2 flex flex-row w-full px-2">
                    <Submit
                        text="Sign In"
                        onClick={() => {window.location.href = "/auth/signin"}}
                        className="mx-[0px] w-full text-xs"
                    />
                    <Submit
                        text="Sign Up"
                        onClick={() => {window.location.href = "/auth/signup"}}
                        className="bg-white/0 text-white mx-[0px] w-full text-xs"
                    />
                </div>
            )}
        </div>
    )
}

const HostNavbar: React.FC<NavbarProps> = ({user, logOut, menuOpen}) => {
    return (
        <div onClick={(e)=>{e.stopPropagation()}} className={`fixed left-0 top-0 flex flex-col w-[60vw] h-screen bg-[#2A2A2A] z-50 transition-all duration-700 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="w-full bg-[#343434] py-12 flex">
                <img className="w-[40vw] mx-auto" src="/tiqr_logo.svg"/>
            </div>
            
            <NavItem
                text="Upcoming Events"
                onClick={() => {window.location.href = "/events"}}
            />

            <NavItem
                text="Create Event"
                onClick={() => {window.location.href = "/events/new"}}
            />

            <NavItem
                text="Scan Ticket"
                onClick={() => {window.location.href = "/upcoming_events"}}
            />

            {user ? (
                <div className="mt-auto mb-2 flex flex-row w-full px-2">
                    <Submit
                        text="Log Out"
                        onClick={logOut}
                        className="mx-[0px] w-full text-xs"
                    />
                </div>
            ) : (
                <div className="mt-auto mb-2 flex flex-row w-full px-2">
                    <Submit
                        text="Sign In"
                        onClick={() => {window.location.href = "/auth/signin"}}
                        className="mx-[0px] w-full text-xs"
                    />
                    <Submit
                        text="Sign Up"
                        onClick={() => {window.location.href = "/auth/signup"}}
                        className="bg-white/0 text-white mx-[0px] w-full text-xs"
                    />
                </div>
            )}
        </div>
    )
}

interface NavItemProps {
    text: string
    onClick: () => void
}

const NavItem: React.FC<NavItemProps> = ({text, onClick}) => {
    return (
        <div onClick={onClick} className="flex flex-row w-full px-5 py-5 justify-between">
            <p className="text-xs my-auto">{text}</p>
            <img src="/chevron.svg"/>
        </div>
    )
}

export default Navbar
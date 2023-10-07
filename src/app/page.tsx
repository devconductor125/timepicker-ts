"use client";
import { useRouter } from "next/navigation"
import Submit from "@/components/form/submit"
import EmbeddedLink from "@/components/embeddedlink";

export default function Home() {
  const router = useRouter()

  return (
    <main className="h-screen bg-black flex flex-col relative">
      <div className="my-auto">
        <img className="w-[50vw] mx-auto" src="tiqr_logo_cropped.png"/>
        <p className="text-secondary text-xs text-center">Seamless event experiences. One app away.</p>
      </div>
      <div className="flex flex-col gap-5">
        <Submit
          text="Sign Up"
          onClick={()=>{router.push("/auth/signup")}}
        />
        
        <EmbeddedLink
          text="Already have an account?"
          linkText="Sign In"
          linkHref="/auth/signin"
        />
      </div>
    </main>
  )
}
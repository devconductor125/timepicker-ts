"use client"

import FormInput, { InputType } from "@/components/form/input";
import EventCard from "@/components/marketplace/eventcard";
import TagsList from "@/components/marketplace/tagslist";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("")

  const tags = ["Sports", "Music", "Food", "Art", "Animals", "Events"]
  
  return (
    <main className="h-screen max-h-screen bg-black flex flex-col relative">
      <Navbar/>
      <div className="pt-16 mx-5 flex flex-col h-screen max-h-screen gap-5">
        <p className="font-bold text-3xl mt-4"><span className="text-secondary">Find</span><br/>Nearby Events</p>
        <FormInput
          placeholder="Search"
          type={InputType.SEARCH}
          onChange={setSearch}
        />
        <TagsList
          tags={tags}
          onChange={(tags) => {}}
        />
        <div className="flex flex-col gap-5 overflow-y-scroll">
          {[0,1,2,3,4,5,6,7,8,9,10].map((item, index) => {
            return (
              <EventCard 
                key={index}
                title={"Sungazer"} 
                location={"Gala Convention Center"} 
                tags={["Concert", "Music"]} 
                date={Date.now()} 
                imageUrl={"https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"}
                eventId="12345"
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}
"use client"

import Navbar from '@/components/navbar'
import DataGrid from '@/components/ticket/datagrid'
import TicketQrCode from '@/components/ticket/qrcode'
import { useParams } from 'next/navigation'

export default function Page() {
  const { ticket_id } = useParams()
  const qrsize = 300

  return (
    <main className="h-screen bg-black flex flex-col relative">
      <Navbar/>
      <div className={`mx-auto w-[${qrsize}px] flex flex-col`}>
        <p className="mx-auto mt-10 text-sm mb-5">View Ticket</p>
        <TicketQrCode 
          ticketNumber={ticket_id as string}
          componentWidth={300}
        />
        <p className="text-xl my-10">Coldplay: Music of the spheres</p>
        <DataGrid 
          eventCode={ticket_id as string}
          dateOfEvent="Nov 15 2023"
          birthday="Nov 15 2023"
          sex="Male"
        />
      </div>

      <img src="/instagram-logo.svg" className="absolute right-2 bottom-2 w-12 h-12"/>
    </main>
  )
}
"use client"

import { useEffect } from "react"
import QRCode from 'qrcode'

interface TicketQrCodeProps {
    ticketNumber: string,
    componentWidth: number
}
  
const TicketQrCode: React.FC<TicketQrCodeProps> = ({ticketNumber, componentWidth}) => {
    useEffect(() => {
        QRCode.toCanvas(document.getElementById('canvas'), ticketNumber, {
        width: componentWidth,
        margin: 0,
        errorCorrectionLevel: 'H'
        }, function (error) {
        if (error) console.error(error)
        console.log('success!');
        })
    }, [ticketNumber, componentWidth])

    return (
        <div className="relative h-[300px]">
        <canvas className="absolute left-1/2 -translate-x-1/2" style={{filter: 'invert(100%'}} id="canvas"/>
        <div className="bg-black p-2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <h1 className="text-3xl font-black">TIQR</h1>
        </div>
        </div>
    )
}

export default TicketQrCode
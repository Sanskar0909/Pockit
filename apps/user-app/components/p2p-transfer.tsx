"use client"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Dispatch, SetStateAction, useState } from "react"
import { p2pTransfer } from "../actions/p2pTranfer"
import { Loader2 } from "lucide-react"

export const P2PTransfer = () => {
    const [phone, setPhone] = useState("")
    const [amount, setAmount] = useState("")
    const[loading, setLoading] = useState(false)

    return <div className="flex flex-col h-screen w-full items-center justify-center drop-shadow-[0_20px_20px_rgba(196,230,255,0.8)]">
        <Card className="flex flex-col w-1/3 h-2/5 mb-14">
        <CardHeader>
            <CardTitle>Transfer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
            <div>
                <Label>Receivers Phone Number</Label>
                <Input placeholder="0000000000" onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div>
                <Label>Amount to send</Label>
                <Input placeholder="782" onChange={(e) => setAmount(e.target.value)}/>
            </div>
        </CardContent>
            <ButtonDisplay loading={loading} setLoading={setLoading} phone={phone} amount={Number(amount)}/>
    </Card>
    </div> 
}

function ButtonDisplay({loading, setLoading, phone, amount}: {
    loading: boolean, 
    setLoading: Dispatch<SetStateAction<boolean>>,
    phone: string,
    amount: Number
}) {
    if(loading){
        return (
            <Button disabled={loading}>
            <Loader2 className="animate-spin" />
                Please wait ...
            </Button>
        )
    }
    return (
        <Button onClick={ async () => {
            setLoading(true)
            const res = await p2pTransfer(phone, Number(amount) * 100)
            alert(res.message)
            setLoading(false)
        }}>Submit</Button> 
    )
}
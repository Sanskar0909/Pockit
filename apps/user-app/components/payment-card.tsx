"use client"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@repo/ui/components/ui/select"
import { useState } from "react"
import { createOnRampTransaction } from "../actions/createOnRampTransaction"

const redirectURL = [{
    name: "HDFC Bank",
    URL: "https://netbanking.hdfcbank.com"
},{
    name: "Axis Bank",
    URL: "https://axisbank.com"
}, {
    name: "Bank of India",
    URL: "https://bankofindia.com"
}]

export const PaymentCard = () => {
    const [bank, setBank] = useState("")
    const [amount, setAmount] = useState("")
    return <Card className="h-full w-full">
            <CardHeader>
                <CardTitle>
                    Payment Method
                </CardTitle>
            </CardHeader>
            <CardContent>
                    <Label>Amount</Label>
                    <Input onChange={(e) => setAmount(e.target.value)} className="mb-2" placeholder="Enter Amount" />
                    <Label>Bank</Label>
                    <Select value={bank} onValueChange={setBank}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                            <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                            <SelectItem value="Bank of India">Bank of India</SelectItem>
                        </SelectContent>
                    </Select>

            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={async () => {
                    const res = await createOnRampTransaction(Number(amount), bank)
                    const url = redirectURL.find(x => x.name === bank)?.URL
                    window.location.href = url || ""
                }}>Add Money</Button>
            </CardFooter>
        </Card>
}
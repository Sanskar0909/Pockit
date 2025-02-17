"use client"
import { userAtom } from "@repo/store"
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card"
import { useAtomValue } from "jotai"

export const BalanceCard = () => {
    const userBalance = useAtomValue(userAtom)
    const locked = userBalance.balance?.locked || 0
    const amount = userBalance.balance?.amount || 0

    return <Card className="h-full w-full">
        <CardHeader>
            <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
            <div className="flex justify-between border-b-2">
                <span>Locked Amount</span>
                <span>{locked / 100} INR</span>
            </div>
            <div className="flex justify-between border-b-2">
                <span>Unlocked amount</span>
                {amount / 100} INR
            </div>
            <div className="flex justify-between border-b-2">
                <span>Total amount</span>
                {(locked + amount) / 100} INR
            </div>
        </CardContent>
    </Card>
}
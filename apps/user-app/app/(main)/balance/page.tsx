"use client"

import { useSession } from "next-auth/react"
import { BalanceCard } from "../../../components/balance-card"
import { useAtomValue } from "jotai"
import { userAtom } from "@repo/store"
export default function Home() {
    const userDetails = useAtomValue(userAtom)
    const session = useSession()
    return <div>
        {JSON.stringify(userDetails)}
        <BalanceCard />
    </div>
}
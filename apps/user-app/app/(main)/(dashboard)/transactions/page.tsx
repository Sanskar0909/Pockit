import { RecentTransactions } from "../../../../components/recent-transactions";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { P2PTransactions } from "../../../../components/p2p-transactions";

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions)
    const userId = Number(session.user.id)
    const transactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId
        }
    })
    return transactions
}

async function getP2PTransactions() {
    const session = await getServerSession(authOptions)
    const userId = Number(session.user.id)

    const transactions = await prisma.p2PTransactions.findMany({
        where: {
            OR: [
                {
                    senderId: userId
                },
                {
                    receiverId: userId
                }
            ]
        }
    })
    return transactions
}

export default async function Transactions(){
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return <div>
            Not Authorized
        </div>
    }
    const onRampTransactions = await getOnRampTransactions()
    const p2pTransactions = await getP2PTransactions()
    const date = onRampTransactions[0]?.startTime
    return <div className="grid grid-cols-5 gap-4 m-5">
        <div className="col-span-3">
            <RecentTransactions transactions={onRampTransactions} />
        </div>
        <div className="col-span-2">
            <P2PTransactions transactions={p2pTransactions} userId={Number(session.user.id)} />
        </div>
    </div> 
}

const transactions = [{
    id: 1,
    status: "Processing", 
    amount: "100",
    token: "abc",
    provider:  "HDFC Bank",
    startTime: "2 February 2025"
}, {
    id: 2,
    status: "Processing", 
    amount: "100",
    token: "abc",
    provider:  "HDFC Bank",
    startTime: "2 February 2025"
}]
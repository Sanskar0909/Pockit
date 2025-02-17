import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card"

interface transactionsProps {
    id: number
    amount: number;
    time: Date;
    senderId: number;
    receiverId: number;
}
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@ui/components/ui/table"



export const P2PTransactions = ({ transactions, userId }: {userId: number, transactions: transactionsProps[]}) => {
    return <div>
            <Card>
            <CardHeader>
                <CardTitle className="text-center">P2P Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                {transactions.length > 0 ? <TransactionRender transactions={transactions} userId={userId}/> : "No Transactions to display"}
            </CardContent>
        </Card>
    </div>
}

function TransactionRender({ transactions, userId }: {userId: number, transactions: transactionsProps[]}){
    return <Table>
        <TableHeader>
            <TableRow className="text-base">
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Received To</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((transaction) => (
                <TableRow className="text-base" key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell className={`${(transaction.receiverId == userId ? "text-green-400" : "text-red-400")}`}>
                    {transaction.amount / 100}
                </TableCell>
                <TableCell>{transaction.time.toDateString()}</TableCell>
                <TableCell>{transaction.receiverId}</TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
    // return <div>
    //     {transactions.map(( transaction ) => (
    //     <div key={transaction.id} className="mb-5">
    //         {transaction.id}
    //             {transaction.amount / 100}
    //         {/* {transaction.startTime} */}
    //     </div>
    // ))}
    // </div>
}
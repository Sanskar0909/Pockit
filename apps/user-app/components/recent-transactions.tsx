import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/components/ui/table";

interface transactionsProps {
    id: number;
    token: string;
    amount: number;
    status: string;
    provider: string;
    startTime: Date;
}

export const RecentTransactions = ({ transactions }: {transactions: transactionsProps[]}) => {
    return <div className="flex">
            <Card>
            <CardHeader>
                <CardTitle className="text-center">On Ramp Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                {transactions.length > 0 ? <TransactionRender transactions={transactions} /> : "No Transactions to display"}
            </CardContent>
        </Card>
    </div>
}

function TransactionRender({ transactions }: { transactions: transactionsProps[]}){
    return <Table>
        <TableHeader>
            <TableRow className="text-base">
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Token</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((transaction) => (
                <TableRow className="text-base" key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.amount / 100}</TableCell>
                <TableCell>{transaction.startTime.toDateString()}</TableCell>
                <TableCell>{transaction.provider}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>{transaction.token}</TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
}
import { SidebarProvider } from "@ui/components/ui/sidebar";
import { AppSidebar } from "../../../../components/app-sidebar";
import { PaymentCard } from "../../../../components/payment-card";
import { BalanceCard } from "../../../../components/balance-card";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if(!session?.user){
    return <div>
      Not Authorized
    </div>
  }
  return (
    <div className="m-5 grid grid-cols-4 gap-5">
      <div className="col-span-2">
        <PaymentCard />
      </div>
      <div className="col-span-2">
        <BalanceCard />
      </div>
    </div>

);
}

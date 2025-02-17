import { Button } from "@ui/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@ui/components/ui/sidebar"
import { ComponentProps } from "react";
  
  export function AppSidebar() {
    return (
      <Sidebar className="mt-14">
        <SidebarHeader className="text-center font-bold bg-slate-300">Payments</SidebarHeader>
        <div className="flex flex-col items-center justify-center h-screen bg-slate-200">
            <div>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem key={"Home"}>
                            <SidebarMenuButton asChild>
                                <a href={"/dashboard"}>
                                    <HomeIcon />
                                    <span className="text-lg font-bold">Home</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem key={"Transfer"}>
                            <SidebarMenuButton asChild>
                                <a href={"/transfer"}>
                                    <TransferIcon />
                                    <span className="text-lg font-bold">Transfer</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem key={"Transactions"}>
                            <SidebarMenuButton asChild>
                                <a href={"/transactions"}>
                                    <TransactionsIcon />
                                    <span className="text-lg font-bold">Transactions</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem key={"P2P Transfers"}>
                            <SidebarMenuButton asChild>
                                <a href={"/p2p"}>
                                    <TransactionsIcon />
                                    <span className="text-lg font-bold">P2P Transfer</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    </SidebarMenu>
                </SidebarContent>
            </div>
        </div>
      </Sidebar>
    )
  }

function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    );
  }
  

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}
  
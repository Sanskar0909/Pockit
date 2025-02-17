"use client"

import { Button } from "@ui/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSetAtom } from "jotai"
import { resetUserAtom } from "@repo/store"

export const AppBar = () => {
    const router = useRouter()
    const session = useSession()
    const setUser = useSetAtom(resetUserAtom)
    return <div className="box-border fixed top-0 left-0 right-0 z-50 flex justify-between p-2 border-b items-center bg-background">
        <div>
            Hello {session.data?.user?.name}
        </div>
        <div>
            <div className="">
                <Button onClick={() => signIn()} className={`mx-2 ${session.data?.user ? "hidden": ""}`}>Sign In</Button>
                <Button onClick={async () => {
                    await signOut({
                        redirect: false,
                    })
                    router.push("/signin")
                    setUser()
                }}
                className={`${session.data?.user ? "" : "hidden"}`}
                >Sign Out</Button>
            </div>
        </div>
    </div>
}
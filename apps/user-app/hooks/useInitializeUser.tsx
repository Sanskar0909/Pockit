"use client"
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAtom } from 'jotai'
import { setUserAtom } from '@repo/store'
import { PrismaClient } from '@repo/db'
import axios from 'axios'

export function useInitializeUser() {
  const prisma = new PrismaClient()
  const { data: session } = useSession()
  const [, updateUser] = useAtom(setUserAtom)

  useEffect(() => {

    async function getBalance() {
      const userBalance = await axios.get("/api/balance")
      if (session?.user) {
        updateUser({
          name: session.user.name || "",
          email: session.user.email || "",
          phone: session.user.email || "",
          balance: {
            amount: userBalance.data.amount || 0,
            locked: userBalance.data.locked || 0
          }
        })
      }
    }
    getBalance()

  }, [session, updateUser])
}
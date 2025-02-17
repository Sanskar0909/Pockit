"use client"
import { Button } from "@ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@ui/hooks/use-toast"
export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const { toast } = useToast()

    return (
        <div className="flex h-screen justify-center items-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>Email</Label>
                    <Input placeholder="Enter your registered email" onChange={(e) => setEmail(e.target.value)}/>
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <div className="flex justify-center mt-5">
                        <Button type="submit" onClick={async () => {
                            const res = await signinProcess(email, password)
                            if(res)
                                router.push("/dashboard")
                            else{
                                toast({
                                    title: "Error",
                                    description: "Either Email or password is incorrect"
                                })
                            }
                        }}>Submit</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

async function signinProcess(email: string, password: string) {
    const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false
    })
    if(!res || res.error)
        return false
    return true
}

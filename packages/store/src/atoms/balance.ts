import { atom, Getter, Setter } from "jotai";

interface User {
    name: string | null
    email: string | null
    phone: string | null
    balance: {
        amount: number
        locked: number
    } | null
}

const initialState: User = {
    name: null,
    email: null,
    phone: null,
    balance: null
}

export const userAtom = atom<User> (initialState)

export const setUserAtom = atom(
    (get) => get(userAtom), 
    (get: Getter, set: Setter, update: User) => {
    const currentUser = get(userAtom)
    set(userAtom, {...currentUser, ...update})
})

export const resetUserAtom = atom(
    null,
    (get, set) => {
        set(userAtom, initialState)
    }
)
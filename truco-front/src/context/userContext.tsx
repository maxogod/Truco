import { ReactNode, createContext, useState, useEffect } from "react";
import { getSession } from "../services/session";
import User from "../@types/UserType";

interface UserContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    loadingSession: boolean
    setLoadingSession: React.Dispatch<React.SetStateAction<boolean>>
    loadingLogin: boolean
    setLoadingLogin: React.Dispatch<React.SetStateAction<boolean>>
    loadingRegister: boolean
    setLoadingRegister: React.Dispatch<React.SetStateAction<boolean>>
    loadingLogOut: boolean
    setLoadingLogOut: React.Dispatch<React.SetStateAction<boolean>>
    sendFriendRequest: boolean
    setSendFriendRequest: React.Dispatch<React.SetStateAction<boolean>>
    onlineFriends: string[]
    setOnlineFriends: React.Dispatch<React.SetStateAction<string[]>>
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    loadingSession: true,
    setLoadingSession: () => { },
    loadingLogin: false,
    setLoadingLogin: () => { },
    loadingRegister: false,
    setLoadingRegister: () => { },
    loadingLogOut: false,
    setLoadingLogOut: () => { },
    sendFriendRequest: false,
    setSendFriendRequest: () => { },
    onlineFriends: [],
    setOnlineFriends: () => { },
})

export const UserContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loadingSession, setLoadingSession] = useState<boolean>(true);
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
    const [loadingLogOut, setLoadingLogOut] = useState<boolean>(false);

    const [sendFriendRequest, setSendFriendRequest] = useState<boolean>(false);

    const [onlineFriends, setOnlineFriends] = useState<string[]>([])

    useEffect(() => {
        if (user) return
        const fetchUser = async () => {
            try {
                const res = await getSession()
                if (res.data) {
                    console.log(res.data)
                    setUser(res.data)
                    setLoadingSession(false)
                }
            } catch (error) {
                setLoadingSession(false)
            }
        }
        fetchUser()
    }, [])


    return (
        <UserContext.Provider value={
            {
                user,
                setUser,
                loadingSession,
                setLoadingSession,
                loadingLogin,
                setLoadingLogin,
                loadingRegister,
                setLoadingRegister,
                loadingLogOut,
                setLoadingLogOut,
                sendFriendRequest,
                setSendFriendRequest,
                onlineFriends,
                setOnlineFriends
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

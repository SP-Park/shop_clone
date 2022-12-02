import { createContext, useContext, useEffect, useState } from "react";
import { onUserChange, login, logout } from "../apis/firebase";

const AuthContext = createContext()
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState()
    useEffect(() => {
        onUserChange((user) => {
            console.log(user)
            setUser(user)
        })
    }, [])
    return (
        <AuthContext.Provider value={{ user, uid: user && user.uid, login: login, logout: logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}


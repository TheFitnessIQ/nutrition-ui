import { createContext, useContext, useState } from "react";

//Create a Context
export const AuthContext = createContext()


export const useAuth = () => useContext(AuthContext)


// Share context with other componenets
export default function AuthProvider({ children }) {
const [isAuthenticated, setAuthenticated] = useState(false)

    function login(username, password) {
        if (username === 'rajib123' && password === 'dummy123') {
            setAuthenticated(true)
            return true
        } else {
            setAuthenticated(false)
            return false
        }
    }

    function logout() {
        setAuthenticated(false);
    }
    
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


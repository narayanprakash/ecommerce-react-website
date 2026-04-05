

import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUser") ? { email: localStorage.getItem("currentUser") } : null);
    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem("users") ? localStorage.getItem("users") : "[]");
        if (users.find(u => u.email === email)) {
            alert("User already exists");
            return { success: false, error: "User already exists" };
        }
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", email);
        setUser({ email });
        return { success: true };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("users") ? localStorage.getItem("users") : "[]");
        const existingUser = users.find(u => u.email === email && u.password === password);
        if (!existingUser) {
            alert("Invalid email or password");
            return { success: false, error: "Invalid email or password" };
        }
        localStorage.setItem("currentUser", email);
        setUser({ email });
        return { success: true };
    }
    function logout() {
        localStorage.removeItem("currentUser");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ signUp, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
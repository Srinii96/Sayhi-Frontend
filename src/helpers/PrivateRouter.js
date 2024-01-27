import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }) {
    const auth = localStorage.getItem("token")
    return auth ? <>{children}</> : <Navigate to="/sign-in" />
}
import { IUserState } from "@/features/usersSlice"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type TProps = {
    user: IUserState | null
    children: ReactNode
}

export const ProtectedRoute = ({user, children}: TProps) => {
    if(!user) return <Navigate to={'/auth'}/>
    return children
}
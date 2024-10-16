export interface IUser {
    id: number
    username: string
    password?: string
    displayName?: string
    role: string
    image: string
    email: string
}

export enum UserRole {
    user = "user",
    admin = "admin"
}
export interface Friend {
    id: number,
    name: string,
    remaining: number,
    avatar: string
}

export interface Friends {
    friends: Friend[]
}
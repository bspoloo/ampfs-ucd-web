import { File } from "./file.interface"

export interface Player {
    id: string
    fullname: string
    username: string
    file?: File
}
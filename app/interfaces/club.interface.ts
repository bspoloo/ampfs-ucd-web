import { File } from "./file.interface"

export interface Club {
    id?: string
    name: string
    file?: File
    president: string
    delegate: string
    teamCount?: number
}
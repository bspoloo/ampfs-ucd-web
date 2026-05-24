import { File } from "./file.interface"

export interface ClubResponse {
    id: string
    name: string
    file: File
    president: string
    delegate: string
    team_count: number
}

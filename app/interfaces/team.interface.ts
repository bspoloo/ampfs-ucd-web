export interface Team {
    id?: string
    name: string
    description: string
    categoryId: string
    uniformColor: string
    playerIds: string[]
    clubId?: string
}
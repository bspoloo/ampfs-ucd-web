export interface Team {
    id: string
    name: string
    description: string
    uniformColor: string
    club?: { id: string; name: string }
    categories?: { id: string; name: string }[]
}

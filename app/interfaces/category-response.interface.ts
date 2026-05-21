export interface CategoryResponse {
    id: string;
    name: string;
    description: string;
    teams: {
        id: string;
        name: string;
        description: string;
    }[];
    championships: {
        id: string;
    }[],
}
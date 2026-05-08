export interface Championship {
    id: string;
    name: string;
    gestion: string;
    year: number;
    state: "ACTIVE" | "IN_PROGRESS" | "FINISHED";
};

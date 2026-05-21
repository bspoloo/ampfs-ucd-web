import { CategoryResponse } from "../interfaces/category-response.interface";

const API_URL = process.env.BACKEND_API_URL;

export async function getCategories(
    token: string
): Promise<CategoryResponse[]> {
    const response = await fetch(
        `${API_URL}/categories`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );

    if(!response.ok) {
        throw new Error(
            "Error al obtener las categorías"
        );
    }

    const data = await response.json();
    return data;
}
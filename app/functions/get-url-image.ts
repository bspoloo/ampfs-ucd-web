import DefaultLogo from "../../public/logo_default.jpg";
import { File } from "../interfaces/file.interface";

export function getUrlImage(file?: File): string {
    return file ? `${process.env.BACKEND_API_URL}/file/${file.id}` : DefaultLogo.src;
}
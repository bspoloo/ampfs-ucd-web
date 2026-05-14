import { Profile } from "next-auth";
import { SyncUserResponse } from "../interfaces/auth/syn-user-response.interface";
import { BodyRequest } from "../classes/body-request";
import { SyncUserRequest } from "../interfaces/auth/syn-user-request.interface";
import { RequestEmail } from "../interfaces/request-email.interface";
import { CredentialsInterface } from "../interfaces/credentials.interface";
import { RegisterInterface } from "../interfaces/register.interface";
import { generatePassword } from "../functions/generate-password";

export class SyncUserRequestService {
    public static async syncUserRequestEmailRegistry(profile: Profile): Promise<SyncUserResponse> {
        try {
            const randomPassword = generatePassword(9);
            const res = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: BodyRequest.EntityToBody<RegisterInterface>({
                    fullname: profile?.name!,
                    username: profile.email?.split("@")[0]!,
                    email: profile?.email!,
                    image: (profile as Profile & { picture?: string })?.picture!,
                    googleId: profile?.sub!,
                    password: randomPassword,
                    confirmPassword: randomPassword,
                    // numberPhone: "Sin numero de telefono",
                    roles: ["user"]
                }),
            })
            const userInfo: SyncUserResponse = await res.json();
            return userInfo;
        } catch (err) {
            throw new Error("Error syncing user: " + err);
        }
    }

    public static async syncUserRequestCredentials(credentials: CredentialsInterface): Promise<SyncUserResponse | null> {
        try {
            const res = await fetch(`${process.env.BACKEND_API_URL}/auth/sync-user-credentials`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: BodyRequest.EntityToBody<CredentialsInterface>({
                    email: credentials.email,
                    password: credentials.password
                }),
            })
            if (res.status === 404) {
                return null;
            }

            if (!res.ok) {
                throw new Error('Error syncing user');
            }
            const userInfo: SyncUserResponse = await res.json();
            return userInfo;
        } catch (err) {
            // console.error("Error syncing user:", err);
            throw new Error("Error syncing user: " + err);
        }
    }

    public static async syncUserRequestEmail(profile: Profile): Promise<SyncUserResponse> {
        try {
            const res = await fetch(`${process.env.BACKEND_API_URL}/auth/sync-user-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: BodyRequest.EntityToBody<RequestEmail>({
                    email: profile.email!
                }),
            })
            const userInfo: SyncUserResponse = await res.json();
            return userInfo;
        } catch (err) {
            // console.error("Error syncing user:", err);
            throw new Error("Error syncing user: " + err);
        }
    }
}
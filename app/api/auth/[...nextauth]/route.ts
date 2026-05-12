import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"
import { SyncUserRequestService } from "@/app/services/auth.service";
import { RequestRegister } from "@/app/classes/request-register.class";
import { cookies } from "next/headers";
import { ACTIONS } from "@/app/enums/actions.enum";

declare module "next-auth" {
    export interface Session {
        user: {
            id?: string;
            fullname?: string | "";
            username?: string | "";
            email: string | "";
            roles: string[] | [];
            image: string;
        }
        accessToken: string;
        refreshToken: string;
    }
    export interface User {
        id?: string;
        fullname?: string;
        username?: string;
        image?: string;
        roles?: string[];
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    export interface JWT {
        roles?: string[];
        accessToken?: string;
        refreshToken?: string;
    }
}

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const data = await SyncUserRequestService.syncUserRequestCredentials(credentials);
                    if (data?.user) {
                        return {
                            email: data.user.email,
                            fullname: data.user.fullname,
                            username: data.user.username,
                            image: data.user.image,
                            roles: data.user.roles,
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            let action : ACTIONS = ACTIONS.LOGIN;
            let userResponse = null;

            if (account?.provider === "google") {
                const cookieStore = await cookies();
                const actionCookie = cookieStore.get("auth_action");

                if (actionCookie?.value) {
                    action = actionCookie.value as ACTIONS;
                }
                if (profile?.email) {
                    try {
                        userResponse = await RequestRegister.getActionRegister(action!, profile);
                        console.log(userResponse);

                        if (!userResponse || !userResponse.user) {
                            userResponse = await RequestRegister.getActionRegister(ACTIONS.REGISTER, profile);
                        }

                        return userResponse ? true : false;
                    } catch (error: any) {
                        if (error.message?.startsWith('/register')) {
                            throw new Error(error.message);
                        }
                        return false;
                    }
                }
            }
            return true;
        },
        async jwt({ token, user, account, profile }) {
            if (account?.provider === "google" && profile) {
                try {
                    const userResponse = await SyncUserRequestService.syncUserRequestEmail(profile);
                    // token.id = userResponse.user.id;
                    token.email = userResponse.user.email;
                    token.fullname = userResponse.user.fullname;
                    token.username = userResponse.user.username;
                    token.image = userResponse.user.image;
                    token.roles = userResponse.user.roles;
                    token.accessToken = userResponse.accessToken;
                    token.refreshToken = userResponse.refreshToken;
                } catch (error) {
                    console.error("Error in jwt callback:", error);
                    token.roles = ["user"];
                }
            }
            if (account?.provider === "credentials" && user) {
                token.id = user.id;
                token.email = user.email;
                token.fullname = user.fullname;
                token.username = user.username;
                token.image = user.image;
                token.roles = user.roles;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.fullname = token.fullname as string;
                session.user.username = token.username as string;
                session.user.roles = token.roles as string[];
                session.user.image = token.image as string;
                session.accessToken = token.accessToken as string;
                session.refreshToken = token.refreshToken as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/auth/error'
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
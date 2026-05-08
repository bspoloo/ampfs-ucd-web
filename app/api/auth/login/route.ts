import { UserInterface } from '@/app/interfaces/user.interface';
import { NextResponse } from 'next/server';


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
}

export async function POST(req: Request) {
    const body = await req.json();

    const backendRes = await fetch(`${process.env.BACKEND_API_URL}/sync-user-credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    if (!backendRes.ok) {
        return NextResponse.json({ message: data.message }, { status: 401 });
    }
    const { user } = data as { user: UserInterface };
    const response = NextResponse.json({ success: true });
    
    return response;
}
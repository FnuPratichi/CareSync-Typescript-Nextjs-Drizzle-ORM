import {NextResponse,NextRequest} from "next/server";
import { db } from '@/src/dbconfig/db';
import { users } from '@/src/dbconfig/schema';
import { eq } from 'drizzle-orm';
import { verify } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export async function GET(req:NextRequest){
    try{
        const token = req.cookies.get('token')?.value || "";

        if (!token){
            return NextResponse.json({message:"unauthorized user"},{status:401})
        }

        const decode = verify(token,SECRET!) as { id: number }

        const user = await db.select().from(users).where(eq(users.id,decode.id));

        if(user.length==0){
            return NextResponse.json({msg: "user dones not exit"},{status:404})
        }

        const {password, ...safeUser} = user[0];

        return NextResponse.json({data:safeUser});

    }catch(err){
        return NextResponse.json({msg:"get user failed"})

    }
}
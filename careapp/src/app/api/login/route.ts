import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/dbconfig/db'; // DB setup
import { users } from '@/src/dbconfig/schema'; // Schema
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { PostgresError } from 'postgres';
import jwt from "jsonwebtoken";



export async function POST(req:NextRequest){
    try{
        const body = await req.json();
        const {email,password} = body;
        const SECRET = process.env.JWT_SECRET;


        if(!email || !password){
            return NextResponse.json({error:"Email and password are missing"},{status:400});
        }

        const existinguser = await db
        .select()
        .from(users)
        .where(eq(users.email,email))

        if (existinguser.length == 0){
            return NextResponse.json({message:"user does not exist in database "},{status:404})
        }

        const user = existinguser[0];
        const matchedpassword = await bcrypt.compare(password,user.password)
        if(!matchedpassword){
            return NextResponse.json({message:"password mimatch"},{status:401})
        }

        if(!SECRET){
            return NextResponse.json({message:"JWT_SECRET IS NOT DEFINED IN ENV"})
        }

        // Defined token data 
        const payload = {
            id: user.id,
            email : user.email,
            roleid: user.roleid,
            username: user.username
        }

        const token = await jwt.sign(payload,SECRET as string,{expiresIn: "1hr"});

        const response = NextResponse.json({
            message:"Login Successfully",
            user:{
                id: user.id,
                email: user.email,
                role: user.roleid,
            },
            status:201
        });

        response.cookies.set('token', token, {
            httpOnly: true
          });


        return response

    }
    catch(err){
        console.error("Registration error",err)
        return NextResponse.json({error:"interal server error"},{status:300})
    }
}
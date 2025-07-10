import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/dbconfig/db'; // DB setup
import { users } from '@/src/dbconfig/schema'; // Schema
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { PostgresError } from 'postgres';

export async function POST(req:NextRequest){
    try{
        const body = await req.json();
        let {username,age,email,password,roleid} = body;
        console.log(body)

        // sanitize the inputs
        username = username?.trim()
        email = email?.toLowerCase().trim()
        password = password.trim()


        // existing user through email
        const existinguser = await db
        .select()
        .from(users)
        .where(eq(users.email,email))
        if(existinguser.length>0){
            return NextResponse.json({message:"email is already present, use unique email"},{status:407})
        }

        // validation for email and password and username
        if(!username || !email || !password){
            return NextResponse.json({error:"Missing fields"},{status:400});
        }

        // PASSWORD length check
        if(password.length<10){
            return NextResponse.json({message:"password length is less than 10"},{status:400}
            )
        }

        // email format check
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailregex.test(email)){
            console.log("Invalid email",email)
            return NextResponse.json({message:"email format is not correct"},{status:400});

        }

        // age optinal value validation
        const parseAge = age!=null && age!=undefined && age!="" ? Number(age):null;
        if (parseAge!=null && ((isNaN(parseAge) || age<0 || age>100))) {
            return NextResponse.json({message:"age is not given properly"},{status:400}) 
        }

        const hashedpassword = await bcrypt.hash(password,10);

        await db.insert(users).values({
            username,
            email,
            password:hashedpassword,
            age:parseAge,
            roleid: roleid || 3,

        })

        //console.log(users)
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });


    }
    catch(err){
        console.error("Registration error",err)
        return NextResponse.json({error:"interal server error"},{status:500})
    }
}
import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody)
        // check if user already exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User Not Found. Signup Now." }, { status: 400 })
        }

        // password compare
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Ivalid Password" }, { status: 400 })
        }

        // create token data
        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        // create token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' })

        const response = NextResponse.json({
            message: "User Create Successfully",
            success: true,
            user
        })

        response.cookies.set('token', token, { httpOnly: true })
        return response

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
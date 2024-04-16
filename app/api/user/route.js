import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import User from '../../../model/userschema';

export const GET = async (req,res) =>{
    try {
        await dbConnect();
        const users= await User.find();
        return new NextResponse("Data successfullt fetched"+users, {status:200})
    } catch (error) {
        return new NextResponse("Error in fetching the data" + error, {statue:500})
    }
}

export const POST = async (req,res) =>{
    try {
        await dbConnect();
        const reqBody = await req.json()
        const data= new User({
            username:reqBody.username,
            email:reqBody.email,
            password:reqBody.password
        })
        console.log(reqBody)
        const user = await data.save();
        return new NextResponse("Data successfully added"+ user, {status:200})
    } catch (error) {
        return new NextResponse("Error in storing the data" + error, {statue:500})
    }
}
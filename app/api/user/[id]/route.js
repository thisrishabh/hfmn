import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../model/userschema';

export const GET = async (req, res) => {
    try {
        await dbConnect();
        const id = req.url.split("user/")[1];
        const user = await User.findById(id)
        return new NextResponse("Data successfullt fetched" + user, { status: 200 })
    } catch (error) {
        return new NextResponse("Error in fetching the data" + error, { statue: 500 })
    }
}

export const PUT = async (req, res) => {
    try {
        await dbConnect();
        const id = req.url.split("user/")[1];
        const getUser = await User.findById(id)
        const reqBody = await req.json()
        if (getUser) {
            getUser.username = reqBody.username,
            getUser.emai = reqBody.email,
            getUser.password = reqBody.password
        }
        const user = await getUser.save();
        return new NextResponse("Data successfully updated" + user, { status: 200 })
    } catch (error) {
        return new NextResponse("Error in storing the data" + error, { statue: 500 })
    }
}

export const DELETE = async (req, res) => {
    try {
        await dbConnect();
        const id = req.url.split("user/")[1];
        const user = await User.findById(id)
        if(user){
            await User.findByIdAndDelete(id)
        }else {
            return new NextResponse("NOT Found " + id , { status: 200 })
        }
        return new NextResponse("Data successfullt deleted" , { status: 200 })
    } catch (error) {
        return new NextResponse("Error in deleting the data" + error, { statue: 500 })
    }
}
"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params{
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}
//connect to mongoose
export async function updateUser({
        userId, 
        username, 
        name, 
        bio, 
        image, 
        path
    }: Params): Promise<void> {
    connectToDB();

    await User.findOneAndUpdate(
        {id: userId},
        {
            username: username.toLowerCase(), 
            name, 
            bio, 
            image, 
            onboarded: true
        },
        {upsert: true} // update if exist, if not insert
    );
    
    try {
        if(path === '/profile/edit'){
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
    
    
}
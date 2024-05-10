
import { redis } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST (request: Request){
    try {

        const {todo} = await request.json();
        const uuid = crypto.randomUUID();

        const id = `todo-${uuid}`

        await redis.set(id,todo);
        return NextResponse.json(todo)
      

        // const uuid = crypto.randomUUID();


        // const key = `todo-${uuid}`

        // const data = await redis.set(key, todo)
        // return NextResponse.json({data})

       

        
    } catch (error) {

        console.log(error)

        return new NextResponse('Something went wrong', {status: 500})
        
    }
}
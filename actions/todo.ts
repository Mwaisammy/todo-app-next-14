"use server"
import { db } from '@/lib/db'
import { formSchema } from '@/lib/validators/page'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'


export const addTodo = async(values: z.infer<typeof formSchema>) => {
    try {
        const validatedFields = formSchema.safeParse(values)
            if(!validatedFields.success){
                return{
                    error: "Invalid fields"
                }
            }

        const { todo } = validatedFields.data;

        // add to db


        const newTodo = await db.todo.create({
            data: {
                todo,
                description: "This is a new description"

                
            }
        });

        revalidatePath("/")

        return {
            success: newTodo.id
        }

       


    } catch (error) {
        console.log(error)

        return{
            error: "Something went wrong"
    }
        
    }

}


export const onDeleteTodo = async(todoId: string)=> {
    try {
        if(!todoId){
            return{
                error: "Invalid fields"
            }
       
        }

        // delete from db

        await db.todo.delete({
            where:{
                id: todoId
            }
        });

        revalidatePath("/")

        return {
            success: "Todo deleted"
        
        }
        
    } catch (error) {
        console.log(error)

        return{
            error: "Something went wrong"
        }
        
    }

}


export const onUpdateTodo = async(values: z.infer<typeof formSchema>, id: string) => {
    try {

        const validatedFields = formSchema.safeParse(values)
        if(!validatedFields.success){
            return{
                error: "Invalid fields"
            }
        }

    const { todo } = validatedFields.data;


    //update the todo

    const updatedTodo = await db.todo.update({
        where:{
            id
        }, 
        data:{
            todo
        }
    })





    revalidatePath("/")

    return {
        success: updatedTodo.todo
    }



        
    } catch (error) {
        console.log(error)

        return{
            error: "Something went wrong"
        }
        
    }
}
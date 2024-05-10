import Image from "next/image";
import TodoForm from "./TodoForm";
import { db } from "@/lib/db";
import Todo from "./Todo";

async function Home() {
  const todos = await db.todo.findMany({});

  console.log(todos);
  return (
    <div className="bg-gradient-to-br from-[#3e5fa2f9] to-[#aa3cc5] min-h-screen flex  items-center justify-center">
      <div className="text-black bg-white w-full max-w-xl p-8 rounded-md shadow-2xl">
        <div className="flex items-center space-x-3">
          <h3 className="text-xl font-bold tracking-wide">To-Do-List</h3>
          <Image src={"/ledger.svg"} width={32} height={32} alt="notebook" />
          {/* <NotebookPen /> */}
        </div>

        {/* form shadcn */}
        <TodoForm />

        <div className="flex flex-col mt-5 space-y-3">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

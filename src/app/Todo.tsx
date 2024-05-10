"use client";

import { Button } from "@/components/ui/button";
import { Todo as TodoType } from "@prisma/client";
import { SquarePen, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { onDeleteTodo } from "../../actions/todo";
import EditForm from "./EditForm";
type Props = {
  todo: TodoType;
};

function Todo({ todo }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const deleteTodo = (todoId: string) => {
    startTransition(() => {
      onDeleteTodo(todoId);
    });
  };
  const editting = (value: boolean) => {
    setIsEditing(value);
  };
  return (
    <>
      {isEditing === false ? (
        <div className="rounded-md w-full bg-blue-300 p-4 flex items-center justify-between ">
          <h3>{todo.todo}</h3>

          <div className="space-x-3">
            <Button variant={"default"} onClick={() => setIsEditing(true)}>
              <SquarePen className="w-5 h-5 hover:text-yellow-300" />
            </Button>
            <Button
              variant={"default"}
              className=" hover:text-rose-400"
              disabled={isPending}
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <EditForm todo={todo.todo} todoId={todo.id} setIsEditing={editting} />
      )}
    </>
  );
}

export default Todo;

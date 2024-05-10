import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { onUpdateTodo } from "../../actions/todo";
import { toast } from "sonner";

type Props = {
  todo: string;
  todoId: string;
  setIsEditing: (value: boolean) => void;
};

const formSchema = z.object({
  todo: z.string().min(2, { message: "Todo must be two characters" }).max(50),
});

function EditForm({ todo, todoId, setIsEditing }: Props) {
  const [isPending, startTransition] = useTransition();
  const [edited] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      todo: todo || "",
    },
    resolver: zodResolver(formSchema),
  });
  const { isLoading, isSubmitting, isValid } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      onUpdateTodo(values, todoId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success("Todo updated successfully");
            setIsEditing(false);
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <>
      {!edited && (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" mt-4 flex items-center justify-between w-full  "
            >
              <FormField
                control={form.control}
                name="todo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="write a todo..."
                        disabled={isSubmitting || isLoading}
                        className="w-[400px] border-2 border-yellow-500 ring-0 ring-offset-0 
                      focus-within:ring-0 focus-within:ring-offset-0 
                      focus-visible:ring-0 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className=""
                disabled={isLoading || isSubmitting || !isValid || isPending}
              >
                Edit Todo
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}

export default EditForm;

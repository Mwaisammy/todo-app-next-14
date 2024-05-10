"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validators/page";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addTodo } from "../../actions/todo";
import { toast } from "sonner";

function TodoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const { isLoading, isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      addTodo(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success("Added todo successfully");
            form.reset();
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 flex justify-between items-center"
        >
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Add your todo"
                    disabled={isLoading || isSubmitting || isPending}
                    {...field}
                    className="w-[400px] ring-0 ring-offset-0 focus-within:ring-0 focus-within:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                  />
                </FormControl>

                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading || isSubmitting || !isValid}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TodoForm;

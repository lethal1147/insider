import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinSchema, JoinSchemaType } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function JoinDialog() {
  const form = useForm<JoinSchemaType>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: JoinSchemaType) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="min-w-40 text-3xl font-bold text-gray-main h-16"
          size="lg"
        >
          Join
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="max-w-[500px] w-full mx-auto border-none shadow-none">
          <DialogTitle>
            <CardHeader className="px-0">
              <CardTitle className="text-3xl font-bold text-gray-600">
                Join game
              </CardTitle>
            </CardHeader>
          </DialogTitle>
          <CardContent className="p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  name="roomId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Room ID" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Password" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="mt-10">Join</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

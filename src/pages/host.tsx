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
import { hostSchema, HostSchemaType } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Host() {
  const form = useForm<HostSchemaType>({
    resolver: zodResolver(hostSchema),
    defaultValues: {
      password: "",
      vetoTime: 1,
      guessTime: 3,
      round: 5,
    },
  });

  const onSubmit = async (data: HostSchemaType) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="h-screen w-screen relative bg-gray-main flex items-center text-gray-600">
      <Card className="max-w-[500px] w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-600">
            Host new game
          </CardTitle>
          <CardContent className="p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  name="vetoTime"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veto time</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Veto time"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="guessTime"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guess time</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Guess time"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="round"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Round</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Round" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Password" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button>Create</Button>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
      <Button
        asChild
        className="size-10 flex justify-center items-center bg-white rounded-full absolute top-5 left-5"
      >
        <Link to="/home">
          <ArrowLeft />
        </Link>
      </Button>
    </main>
  );
}

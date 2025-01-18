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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleError, handleSuccess, withAsync } from "@/utils";
import { RoomApi } from "@/api";
import { useNavigate } from "react-router-dom";
import { RoomType } from "@/types";

export default function HostDialog() {
  const navigate = useNavigate();
  const form = useForm<HostSchemaType>({
    resolver: zodResolver(hostSchema),
    defaultValues: {
      password: "",
      maxMember: 6,
      voteTime: 1,
      guessTime: 3,
      totalRound: 5,
    },
  });

  const onSubmit = async (data: HostSchemaType) => {
    try {
      const { response, error } = await withAsync<RoomType>(() =>
        RoomApi.createRoom(data)
      );
      if (error || !response) throw error;
      navigate(`/lobby/${response.data.publicId}`);
      handleSuccess(response.message);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="min-w-40 text-3xl font-bold text-gray-main h-16"
          size="lg"
        >
          Host
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="max-w-[500px] w-full mx-auto border-none shadow-none">
          <DialogTitle>
            <CardHeader className="px-0">
              <CardTitle className="text-3xl font-bold text-gray-600">
                Host new game
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
                  name="roomName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Room name" />
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
                <FormField
                  name="totalRound"
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
                  name="maxMember"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max member</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Max member"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="voteTime"
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
                <Button className="mt-10">Create</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

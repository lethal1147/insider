import { HostSchemaType } from "@/schema";
import { axiosInstance } from "@/lib";
import { PlayerType } from "@/types";

const roomApi = {
  createRoom: async (
    body: HostSchemaType & {
      hostData: PlayerType;
    }
  ) => axiosInstance.post("/room", body),
  joinRoom: async (
    roomId: string,
    body: {
      userId: string;
      password?: string;
      name: string;
      color: string;
    }
  ) => axiosInstance.post(`/room/${roomId}`, body),
};

export default roomApi;

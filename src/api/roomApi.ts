import { HostSchemaType } from "@/schema";
import { axiosInstance } from "@/lib";

const roomApi = {
  createRoom: async (body: HostSchemaType) => axiosInstance.post("/room", body),
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

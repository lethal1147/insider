import { HostSchemaType } from "@/schema";
import { axiosInstance } from "@/lib";

const roomApi = {
  createRoom: async (body: HostSchemaType) => axiosInstance.post("/room", body),
};

export default roomApi;

import store, { AppDispatch } from "@/stores/storeConfig";
import { useDispatch } from "react-redux";

export type AppDsipatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

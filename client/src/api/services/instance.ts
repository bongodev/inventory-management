import http from "@/lib/http";
import type { SearchInstanceRequest } from "../types";

 export const searchInstances = (searchPayload: SearchInstanceRequest) =>
 http.post("/api/admin/instances/search", searchPayload).then((res) => res.data);
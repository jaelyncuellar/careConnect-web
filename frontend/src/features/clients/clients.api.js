import { stringify } from "ajv";
import { apiRequest } from "../../shared/api/api.js";

export async function getClients() {
    return apiRequest("/clients");
}

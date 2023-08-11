import { type Film } from "./types";
import httpClient from "~/http-client";
export async function getAllFilms(): Promise<Film[]> {
    return await httpClient.get('/fims')
}
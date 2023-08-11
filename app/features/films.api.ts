import { type Film, type FilmMetaData } from "./types";
import httpClient from "~/http-client";
export async function getAllFilms(): Promise<Film[]> {
    const { results } = await httpClient.get<FilmMetaData>('/films')
    return results
}
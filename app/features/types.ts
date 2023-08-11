export type Film = {
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    species: string[]
    starships: string[]
    vehicles: string[]
    characters: string[]
    planets: string[]
    url: string
    created: string
    edited: string
}
export type FilmMetaData = {
    count: number,
    next: number | null,
    previous: number | null,
    results: Array<Film>
}
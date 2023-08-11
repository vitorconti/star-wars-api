import { defer, type LoaderArgs } from "@remix-run/node"
import { Await, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense } from "react";
import Loading from "~/components/shared/Loading";
import { getPaginatedPeople } from "~/features";
export async function loader({ params }: LoaderArgs) {
    const { id } = params
    const characters = getPaginatedPeople(id)
    return defer({ characters })
}
function findNumberInURL(url: any = '', paramName = 'page') {
    const parsedUrl = new URL(url);
    const searchParams = parsedUrl.searchParams;
    const paramValue = searchParams.get(paramName);

    if (paramValue) {
        const numberMatch = paramValue.match(/\d+/);
        if (numberMatch) {
            return parseInt(numberMatch[0]);
        }
    }

    return null;
}
export default function FilmInfo() {
    const { characters: charactersPromise } = useLoaderData<typeof loader>()
    const history = useNavigate()
    return (

        <div>
            <Suspense fallback={<Loading />}>
                <h2 className="text-xl text-gray-300 m-2">Personagens</h2>
                <Await errorElement={<p>something went wrong</p>} resolve={charactersPromise}>
                    {(characters) => {
                        return (
                            <div>
                                <ul>
                                    {characters.results.map((character) => (
                                        <li className="text-white" key={character.name}>
                                            {character.name}
                                        </li>
                                    ))}
                                </ul>
                                {characters.previous && <button className="text-white" onClick={() => {
                                    const param = findNumberInURL(characters.previous)
                                    return `/films/${param}`
                                }}> Previous</button>}
                                {characters.next && <button className="text-white" onClick={() => {
                                    const param = findNumberInURL(characters.next)
                                    return `/films/${param}`
                                }}> Next</button>}

                            </div>
                        )
                    }}
                </Await>
            </Suspense>
        </div>
    );
}
import StarWarsLogo from '~/assets/star-wars-logo.png'
import { defer } from "@remix-run/node"
import { getAllFilms } from '~/features';
import { Await, useLoaderData } from '@remix-run/react';
import FilmPoster from '~/components/features/FilmPoster';
import { Suspense } from 'react';
import Loading from '~/components/shared/Loading';
export async function loader() {
    const filmsPromise = getAllFilms()
    return defer({ filmsPromise })
}
export default function () {
    const { filmsPromise } = useLoaderData<typeof loader>()
    return (
        <>
            <div className='h-1/4 w-1/4'>
                <img className='fade' src={StarWarsLogo} alt="star-wars-logo" />
            </div>
            <div>
                <Suspense fallback={<Loading />}>
                    <Await errorElement={<p>something went wrong</p>} resolve={filmsPromise}>
                        {(films) => (

                            <ul>
                                {films.map((film) => (
                                    <li key={film.episode_id}>
                                        <FilmPoster title={film.title} release_date={film.release_date} episode_id={film.episode_id} />
                                    </li>
                                ))}
                            </ul>
                        )}

                    </Await>
                </Suspense>
            </div>
        </>
    );
}
export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
        </div>
    );
}
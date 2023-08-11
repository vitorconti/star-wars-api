import StarWarsLogo from '~/assets/star-wars-logo.png'
export default function () {
    return (
        <div className='h-1/4 w-1/4 '>
            <img className='fade' src={StarWarsLogo} alt="star-wars-logo" />
        </div>
    );
}
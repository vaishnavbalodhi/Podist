import { Link, useLocation } from "react-router-dom"

const Header = () => {

  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath);

  return (
    <nav className="flex justify-center">
      <div className="absolute -top-28 m-auto h-40 w-[800px] max-w-full bg-customColor-blue blur-[100px] -z-10"></div>
      <div className="mx-2 flex justify-center items-center sm:gap-10 gap-5 py-6 text-customColor-grey/70">
        <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/' && 'text-customColor-white'}`} to="/">SignUp</Link>
        <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/podcasts' && 'text-customColor-white'}`}>Podcasts</Link>
        <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/start-a-podcast' && 'text-customColor-white'}`}>Start a Podcast</Link>
        <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/profile' && 'text-customColor-white'}`}>Profile</Link>
        
      </div>
    </nav>
  )
}

export default Header
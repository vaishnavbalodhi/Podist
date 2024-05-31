import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"

const Header = () => {

  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath);

  const user = useSelector((state) => state.user.user);

  return (
    <nav className="flex justify-center">
      <div className="absolute -top-28 m-auto h-40 w-[800px] max-w-full bg-customColor-blue blur-[100px] -z-10"></div>
      <div className="mx-2 flex justify-center items-center sm:gap-10 gap-5 py-6 text-customColor-grey/70">
        {!user || currentPath === '/' ?
          <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/' && 'text-customColor-white'}`} to="/">SignUp</Link> : null
        }
        <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/podcasts' && 'text-customColor-white'}`} to="/podcasts" >Podcasts</Link>
        <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/create-a-podcast' && 'text-customColor-white'}`} to="/create-a-podcast">Start a Podcast</Link>
        <Link className={`hover:text-customColor-white hover:transition-all hover:duration-300 ${currentPath === '/profile' && 'text-customColor-white'}`} to="/profile">Profile</Link>

      </div>
    </nav>
  )
}

export default Header
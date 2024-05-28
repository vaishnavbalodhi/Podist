import { Link } from "react-router-dom"

const Header = () => {
  return (
    <nav className="flex justify-center">
      <div className="absolute -top-28 m-auto h-40 w-[800px] max-w-full bg-customColor-blue blur-[100px] -z-10"></div>
      <div className="flex justify-center items-center gap-10 py-6 text-customColor-grey/70">
        <Link className="hover:text-customColor-white hover:transition-all hover:duration-300" to="/">SignUp</Link>
        <Link className="hover:text-customColor-white hover:transition-all hover:duration-300" to="/podcasts">Podcasts</Link>
        <Link className="hover:text-customColor-white hover:transition-all hover:duration-300" to="/start-a-podcast">Start a Podcast</Link>
        <Link className="hover:text-customColor-white hover:transition-all hover:duration-300" to="/profile">Profile</Link>
      </div>
    </nav>
  )
}

export default Header
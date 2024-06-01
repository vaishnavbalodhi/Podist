import { Link } from "react-router-dom"

const PodcastCard = ({ id, title, displayImage }) => {
    return (
        <Link to={`/podcast/${id}`}>
            <div className="w-44 h-52 flex flex-col p-4 cursor-pointer hover:transition-all hover:duration-300 hover:bg-customColor-blue/10">
                <img className="w-full h-36 rounded-lg object-cover" src={displayImage} alt="display image" />
                <h4 className="mt-2 font-semibold">
                    {title.length <= 15 ? 
                        title :
                        title.slice(0,12) + '...'
                    }
                </h4>
            </div>
        </Link>
    )
}

export default PodcastCard
import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header/Header"
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import Button from "../components/Button/Button";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails";

const PodcastDetails = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such Podcast!");
        toast.error("No such Podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  // console.log(podcast);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error("Error fetching episodes:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      {podcast.id && (
        <div>
          <div className="absolute w-3/4 left-1/2 -translate-x-1/2 mt-8 mb-2 rounded-t-xl shadow-2xl shadow-[#2b0d3c]">
            <div className="relative w-full overflow-hidden">
              <img
                className="w-full h-72 rounded-t-xl object-cover"
                src={podcast.bannerImage}
                alt="banner image" />
              <h1 className="absolute bottom-10 left-8 font-bold text-3xl sm:text-4xl pr-4">{podcast.title}</h1>
              <h5 className="absolute bottom-4 left-8 text-sm text-customColor-white/80">By {podcast.creatorName}</h5>
            </div>
            <p className="my-4 text-sm text-customColor-puple_grey px-8">{podcast.description}</p>
            <div className="px-8 mb-8 flex justify-between items-center gap-5">
              <h3 className="sm:text-xl text-lg font-semibold">Episodes</h3>
              {podcast.creatorId === auth.currentUser.uid && (
                <Button
                  text="Create Episode"
                  width={"150px"}
                  onClick={() => { navigate(`/podcast/${id}/create-episode`) }}
                />
              )}
            </div>
            {episodes.length > 0 ? (
              <div className="px-8 mb-10">
                {episodes.map((episode, index) => (
                  <EpisodeDetails 
                    key={index}
                    index={index + 1}
                    title={episode.title}
                    description={episode.description}
                    audioFile={episode.audioFile}
                    onClick={(file) => setPlayingFile(file)}
                  />
                ) )}
              </div>
            ) : (
              <p className="px-8 mb-4">No episodes available</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PodcastDetails
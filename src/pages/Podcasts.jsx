import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header"
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcast } from "../feature/podcast/podcastSlice";
import { db } from "../firebase";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputField from "../components/Input/InputField";

const Podcasts = () => {

    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcast.podcasts);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts")),
            (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) => {
                    podcastsData.push({ id: doc.id, ...doc.data() });
                });
                dispatch(setPodcast(podcastsData));
            },
            (error) => {
                console.error("Error fetching podcasts:", error);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    // console.log(podcasts);

    var filteredPodcasts = podcasts.filter((item) =>
        item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div>
            <Header />
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-3xl font-semibold my-8">Discover Podcasts</h1>
                {podcasts.length > 0 && <InputField 
                    type="text"
                    input={search}
                    setInput={setSearch}
                    placeholder="Search Podcast by Title"
                />}
            </div>
            {filteredPodcasts.length > 0 ? (
                <div className="flex justify-center items-center">
                    <div className="mx-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                        {filteredPodcasts.map((item) => (
                            <PodcastCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                displayImage={item.displayImage} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <p>{search ? "Podcast not found": "No Podcasts Available"}</p>
                </div>
            )}
        </div>
    )
}

export default Podcasts
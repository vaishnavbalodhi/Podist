import Header from "../components/Header/Header"
import CreatePodcastForm from "../components/StartAPodcast/CreatePodcastForm";

const CreatePodcast = () => {
    return (
        <div>
            <Header />
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-3xl font-semibold my-8">Create A Podcast</h1>
                <CreatePodcastForm />
            </div>
        </div>
    )
}

export default CreatePodcast;
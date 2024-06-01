import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/Input/InputField";
import FileInput from "../components/Input/FileInput";
import Button from "../components/Button/Button";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisode = () => {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audioFile, setAudioFile] = useState();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

    const handleCreateEpisode = async () => {
        if (title && description && audioFile && id) {
            setLoading(true);
            // 1. Upload files -> get downloadable links
            // 2. create a new doc iin a new collection called podcasts
            // 3. save this new podcast episodes states in our podcasts
            try {
                // console.log(auth.currentUser);
                const audioFileRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/episodes/${title}/${Date.now()}`
                );
                await uploadBytes(audioFileRef, audioFile);

                const audioFileUrl = await getDownloadURL(audioFileRef);

                const episodeData = {
                    title: title,
                    description: description,
                    audioFile: audioFileUrl,
                    creatorId: auth.currentUser.uid,
                    creatorName: user.name,
                };

                const docRef = await addDoc(collection(db, "podcasts",id,"episodes"), episodeData);
                setTitle("");
                setDescription("");
                setAudioFile(null);
                toast.success("Episode Created!");
                setLoading(false);

                navigate(`/podcast/${id}`);

            } catch (e) {
                toast.error(e.message);
                console.log(e);
                setLoading(false);
            }

        }
        else {
            toast.error("Enter all values");
            setLoading(false);
        }
    }

    const handleAudioFile = (file) => {
        setAudioFile(file);
    }

    return (
        <div>
            <Header />
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-3xl font-semibold my-8">Create Episode</h1>
                <InputField
                    type="text"
                    input={title}
                    setInput={setTitle}
                    placeholder="Title"
                    required={true}
                />
                <InputField
                    type="text"
                    input={description}
                    setInput={setDescription}
                    placeholder="Description"
                    required={true}
                />
                <FileInput
                    accept={"audio/*"}
                    id="audio-file"
                    text="Audio file"
                    handleFile={handleAudioFile}
                />
                <Button text={loading ? "Loading..." : "Create Episode"} disabled={loading} onClick={handleCreateEpisode} />
            </div>
        </div>
    )
}

export default CreateEpisode
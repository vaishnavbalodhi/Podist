import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../Input/InputField";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import FileInput from "../Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreatePodcastForm = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

    const handleCreate = async () => {
        if (title && description && displayImage && bannerImage) {
            setLoading(true);
            // 1. Upload files -> get downloadable links
            // 2. create a new doc iin a new collection called podcasts
            // 3. save this new podcast episodes states in our podcasts
            try {
                console.log(auth.currentUser);
                const bannerImageRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${title}/bannerImage/${Date.now()}`
                );
                await uploadBytes(bannerImageRef, bannerImage);

                const bannerImageUrl = await getDownloadURL(bannerImageRef);

                const displayImageRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${title}/displayImage/${Date.now()}`
                );
                await uploadBytes(displayImageRef, displayImage);

                const displayImageUrl = await getDownloadURL(displayImageRef);
                const podcastData = {
                    title: title,
                    description: description,
                    bannerImage: bannerImageUrl,
                    displayImage: displayImageUrl,
                    creatorId: auth.currentUser.uid,
                    creatorName: user.name,
                };

                const docRef = await addDoc(collection(db, "podcasts"), podcastData);
                setTitle("");
                setDescription("");
                setBannerImage(null);
                setDisplayImage(null);
                toast.success("Podcast Created!");
                setLoading(false);

                navigate("/podcasts");

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

    const handleDisplayImage = (file) => {
        setDisplayImage(file);
    }
    const handleBannerImage = (file) => {
        setBannerImage(file);
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
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
                accept={"image/*"}
                id="display-image"
                text="Display Image"
                handleFile={handleDisplayImage}
            />
            <FileInput
                accept={"image/*"}
                id="banner-image"
                text="Banner Image"
                handleFile={handleBannerImage}
            />
            <Button text={loading ? "Loading..." : "Create Podcast"} disabled={loading} onClick={handleCreate} />
        </div>
    )
}

export default CreatePodcastForm
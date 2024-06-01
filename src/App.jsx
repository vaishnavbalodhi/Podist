import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./feature/user/userSlice";
import PrivateRoutes from "./components/PrivateRoutes";
import CreatePodcast from "./pages/CreatePodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetails from "./pages/PodcastDetails";
import CreateEpisode from "./pages/CreateEpisode";

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              // console.log(userData);
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route element={<PrivateRoutes />}> 
            <Route path="/profile" element={<Profile/>} />
            <Route path="/create-a-podcast" element={<CreatePodcast/>} />
            <Route path="/podcasts" element={<Podcasts/>} />
            <Route path="/podcast/:id" element={<PodcastDetails/>} />
            <Route path="/podcast/:id/create-episode" element={<CreateEpisode/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

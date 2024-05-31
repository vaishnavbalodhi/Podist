import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { clearUser } from "../feature/user/userSlice";

const Profile = () => {

  //user.user -> user(name of slice).user(object variable)
  const user = useSelector((state) => state.user.user)
  // console.log(user);

  const dispatch = useDispatch();

  if (!user) {
    return <p>Loading...</p>
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(clearUser(user));
      toast.success("Logout successful!");
    }).catch((e) => {
      toast.error(e.message);
    });
  }

  return (
    <div>
      <Header />
      <div className="w-full mt-10 p-10 flex flex-col justify-between items-center">
        <div className="w-48 h-48 bg-green-200 rounded-full">
          {user.profilePic}
        </div>
        <div className="text-2xl font font-semibold pt-3 mb-6">
          {user.name}
        </div>
        <div className="w-40 flex items-center justify-center">
          <Button text="Logout" onClick={handleLogout} />
        </div>
      </div>
    </div>
  )
}

export default Profile
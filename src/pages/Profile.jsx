import { useSelector } from "react-redux"
import Header from "../components/Header/Header";

const Profile = () => {

  //user.user -> user(name of slice).user(object variable)
  const user = useSelector((state) => state.user.user)
  console.log(user);

  return (
    <div>
      <Header />
      <div className="w-full mt-10 p-10 flex flex-col justify-between items-center">
        <div className="w-48 h-48 bg-green-200 rounded-full">
          {/* {user.profilePic} */}
        </div>
        <div className="text-2xl font font-semibold pt-5">{user.name}</div>
      </div>
    </div>
  )
}

export default Profile
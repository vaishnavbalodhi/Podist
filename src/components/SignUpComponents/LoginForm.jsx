import InputField from "../Input/InputField"
import Button from "../Button/Button"
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../../feature/user/userSlice";
import { toast } from "react-toastify";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        if(email && password){
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
                const user = userCredential.user;
    
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userData = userDoc.data();
                // console.log(userData);
    
                dispatch(setUser({
                    name: userData.name,
                    email: user.email,
                    uid: user.uid,
                    profilePic: user.photoURL,
                }))
                
                setLoading(false);
                toast.success("Login successful!");
                navigate("/profile", { replace: true });
            }
            catch (e) {
                console.log(e);
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            if(!email){
                toast.error("Email field is empty");
            }
            if(!password){
                toast.error("Password field is empty");
            }
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold my-8">Login</h1>

            <InputField
                type="text"
                input={email}
                setInput={setEmail}
                placeholder="Email"
                required={true}
            />
            <InputField
                type="text"
                input={password}
                setInput={setPassword}
                placeholder="Password"
                required={true}
            />
            <Button text={ loading ? "Loading..." : "Login" } disabled={loading} onClick={handleLogin} />
        </div>
    )
}

export default LoginForm
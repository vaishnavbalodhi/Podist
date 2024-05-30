import InputField from "../Input/InputField"
import Button from "../Button/Button"
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../feature/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        if(password == confirmPassword && password.length >=8 && fullName && email) {
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                const user = userCredential.user;
                // console.log(user);

                //Saving user deatils
                //users -> name of collection, user.uid -> document id
                await setDoc(doc(db, "users", user.uid), {
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                    profilePic: user.photoURL,
                })

                dispatch(setUser({
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                    profilePic: user.photoURL,
                }))

                setLoading(false);
                
                toast.success("User has been created!");
                navigate("/profile");
            }
            catch (e) {
                console.log(e);
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            if(password.length<8){
                toast.error("Password is too short!")
            }
            else if(password!= confirmPassword){
                toast.error("Confirm Password doesn't match Password!");
            }
            else if(!fullName){
                toast.error("Full Name field is empty");
            }
            else if(!email){
                toast.error("email field is empty");
            }
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold my-8">Sign Up</h1>
            <InputField
                type="text"
                input={fullName}
                setInput={setFullName}
                placeholder="Full Name"
                required={true}
            />
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
            <InputField
                type="text"
                input={confirmPassword}
                setInput={setConfirmPassword}
                placeholder="Confirm Password"
                required={true}
            />
            <Button text={loading ? "Loading..." : "Sign up"} disabled={loading} onClick={handleSignup} />
        </div>
    )
}

export default SignUpForm
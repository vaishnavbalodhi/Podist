import { useState } from "react"
import Header from "../components/Header/Header"
import InputField from "../components/Input/InputField"
import Button from "../components/Button/Button";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    
  }
  return (
    <div>
        <Header />
        <div className="flex flex-col justify-center items-center">
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
          <Button text="Sign up" onClick={handleSignup}/>
        </div>
    </div>
  )
}

export default SignUp
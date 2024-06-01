import { useState } from "react"
import Header from "../components/Header/Header"
import SignUpForm from "../components/SignUpComponents/SignUpForm"
import LoginForm from "../components/SignUpComponents/LoginForm"

const SignUp = () => {

  const [flag, setFlag] = useState(false);

  return (
    <div>
        <Header />
        <div className="flex flex-col items-center">
            {!flag ? <SignUpForm /> : <LoginForm />}
            {!flag ? (
              <p 
                onClick={() => setFlag(!flag)}
                className="cursor-pointer mt-8">
                  Already have an account? Click here to Login.
              </p>
            ):
            <p 
              onClick={() => setFlag(!flag)}
              className="cursor-pointer mt-8">
                Don't have an account? Click here to SignUp.
            </p>
            }
        </div>
    </div>
  )
}

export default SignUp
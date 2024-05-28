import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

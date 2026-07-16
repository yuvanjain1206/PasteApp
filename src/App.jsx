import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div className="min-h-screen bg-[#0D1117]">
          <Navbar />
          <Home />
        </div>
    },

    {
      path: "/pastes",
      element:
        <div className="min-h-screen bg-[#0D1117]">
          <Navbar />
          <Paste />
        </div>
    },

    {
      path: "/pastes/:id",
      element:
        <div className="min-h-screen bg-[#0D1117]">
          <Navbar />
          <ViewPaste />
        </div>
    },
  ]
)

function App() {


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

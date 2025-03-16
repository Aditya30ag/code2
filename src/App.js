import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DominoScene from "./components/DominoScene";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <DominoScene/>
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

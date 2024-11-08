import { Outlet } from "react-router";
import Footer from "./Components/Footer/Footer.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";

const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;

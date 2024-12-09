import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "./Routes/Routes.tsx";
import "./index.css";
import { UserProvider } from "./Components/ContentComponents/UserContext/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      {/* <RouterProvider router={router} /> */}
      <Routes />
    </UserProvider>
  </StrictMode>
);

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AppWrapper } from "./components/common/PageMeta.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AppWrapper>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppWrapper>
  </ThemeProvider>
);

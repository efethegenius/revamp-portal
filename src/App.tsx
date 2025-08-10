import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DesignSystems from "./Pages/DesignSystems/DesignSystems.component";
import Home from "./Pages/Home/Home.components";
import NotFound from "./Pages/NotFound/NotFound.component";
import Onboarding from "./Pages/Onboarding/Onboarding.component";
import { useEffect, useState } from "react";
// import { isDark as initialIsDark } from "../src/constants/data";
import { AppContext } from "./Context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "./components/Toast/CustomToast.component";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout.component";
import Dashboard from "./Pages/LoggedIn/Dashboard.component";
import Profile from "./Pages/LoggedIn/Profile.component";
import Products from "./Pages/LoggedIn/Products.component";
import MyPolicies from "./Pages/LoggedIn/MyPolicies.component";
import Investments from "./Pages/LoggedIn/Investments.component";
import Claims from "./Pages/LoggedIn/Claims.component";
import Settings from "./Pages/LoggedIn/Settings.component";
import Support from "./Pages/LoggedIn/Support.component";

function App() {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;
    return false;
  };
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkTheme);
    document.body.classList.toggle("light", !isDarkTheme);
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);
  const queryClient = new QueryClient();

  const showToast = (
    type: "success" | "error" | "warning",
    title: string,
    onAction?: () => void
  ) => {
    toast(
      <CustomToast
        type={type}
        title={title}
        onClose={() => toast.dismiss()}
        onAction={onAction}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
        style: {
          boxShadow: "none",
          background: "transparent",
          width: "400px",
        },
      }
    );
  };
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          isDarkMode: isDarkTheme,
          setIsDarkMode: setIsDarkTheme,
          showToast: showToast,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-systems" element={<DesignSystems />} />
          <Route path="/onboarding/*" element={<Onboarding />} />
          <Route path="/app" element={<ProtectedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="products" element={<Products />} />
            <Route path="policies" element={<MyPolicies />} />
            <Route path="investment" element={<Investments />} />
            <Route path="claims" element={<Claims />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkTheme ? "dark" : "light"}
      />
    </QueryClientProvider>
  );
}

export default App;

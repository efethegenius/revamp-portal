import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WebHeader from "../../components/Header/webHeader/webHeader.component";
import Footer from "../../components/Footer/Footer.component";
import styles from "./Onboarding.module.css";
import Login from "./Components/Login.component";
import ResetPassword from "./Components/ResetPassword.compoent";
import CreatePassword from "./Components/CreatePassword.component";
import Header from "../../components/Header/Header.component";
import { AppContext } from "../../Context/AppContext";
import Nin from "./Components/Nin.component";
import OTPModal from "./Components/OTPModal.component";
import CreateAccount from "./Components/CreateAccount.component";
import ActivateAccount from "./Components/ActivateAccount.component";
import { BriefcaseBusiness, HelpCircle, Info, LogIn } from "lucide-react";

const Onboarding = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);
  const location = useLocation();
  const [page, setPage] = useState("login");
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("reset-password")) {
      setPage("create-password");
    }
  }, [location.pathname]);

  const renderPage = () => {
    switch (page) {
      case "create-account":
        return <CreateAccount onPageClick={(page: string) => setPage(page)} />;
      case "login":
        return <Login onPageClick={(page: string) => setPage(page)} />;
      case "reset":
        return (
          <ResetPassword onBackToLoginClick={(page: string) => setPage(page)} />
        );
      case "create-password":
        return <CreatePassword onPageClick={(page: string) => setPage(page)} />;
      case "activate-account":
        return <ActivateAccount />;
      case "nin":
        return (
          <Nin
            onPageClick={(page: string) => setPage(page)}
            onOtpTrigger={() => setIsOtpOpen(true)}
          />
        );
      default:
        return <Login onPageClick={(page: string) => setPage(page)} />;
    }
  };

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  return (
    <div className={styles.container}>
      <div className={styles.webHeader}>
        <WebHeader isDark={isDarkMode} />
      </div>
      <div className={styles.mobileHeader}>
        <Header
          isDark={isDarkMode}
          onThemeToggle={handleThemeToggle}
          menuItems={[
            { icon: Info, label: "About", active: true },
            { icon: BriefcaseBusiness, label: "Get Quote" },
            { icon: HelpCircle, label: "Support" },
            { icon: LogIn, label: "Login" },
          ]}
          isLoggedIn={false}
        />
      </div>
      <div className={styles.content}>{renderPage()}</div>
      <div>
        <Footer />
      </div>

      {/* OTP Modal Overlay */}
      <OTPModal
        onComplete={() => setPage("create-account")}
        isOpen={isOtpOpen}
        onOpenChange={setIsOtpOpen}
      />
    </div>
  );
};

export default Onboarding;

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styles from "./ProtectedLayout.module.css";
import {
  Grid2X2,
  BriefcaseBusiness,
  FolderHeart,
  TrendingUp,
  FileText,
  Settings2,
  MessageSquareText,
  Power,
} from "lucide-react";
import Header from "../Header/Header.component";
import { AppContext } from "../../Context/AppContext";
import { FullHeader } from "../Header/fullHeader/FullHeader.component";
import logoWhite from "../../assets/logos/logoWhite.png";
import logoBlack from "../../assets/logos/logoBlack.png";

type userType = {
  fullName: string;
};
const ProtectedLayout = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("token");
  const [user, setUser] = useState<userType>({ fullName: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/onboarding");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const location = useLocation();

  const menuItems = [
    { icon: Grid2X2, label: "Dashboard", route: "dashboard" },
    { icon: BriefcaseBusiness, label: "Products", route: "products" },
    { icon: FolderHeart, label: "My Policies", route: "policies" },
    { icon: TrendingUp, label: "Investment", route: "investment" },
    { icon: FileText, label: "Claims", route: "claims" },
    { icon: Settings2, label: "Settings", route: "settings" },
    { icon: MessageSquareText, label: "Support", route: "support" },
  ];

  const handleNavigate = (route: string) => {
    navigate(`/app/${route}`);
  };

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/onboarding");
  };

  useEffect(() => {
    const details = sessionStorage.getItem("details");
    const parsedDetails = JSON.parse(details as string);

    setUser(parsedDetails);
  }, []);

  const truncatedText = (text: string, maxLength: number) => {
    const truncated =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    return truncated;
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <nav
          className={`${styles.mobileMenu} ${styles.mobileMenuOpen} ${
            isDarkMode ? styles.mobileMenuDark : styles.mobileMenuLight
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className={styles.logo}>
            <img src={isDarkMode ? logoWhite : logoBlack} alt="CORONATION" />
          </div>
          <div className={styles.menuItems}>
            {menuItems.map((item, index) => {
              const isActive = location.pathname.startsWith(
                `/app/${item.route}`
              );
              return (
                <button
                  key={index}
                  onClick={() => handleNavigate(item.route)}
                  className={`${styles.menuItem} ${
                    isActive ? styles.menuItemActive : ""
                  } ${isDarkMode ? styles.menuItemDark : styles.menuItemLight}`}
                  tabIndex={0}
                >
                  <item.icon size={20} className={styles.menuItemIcon} />
                  <span className={styles.menuItemLabel}>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.menuFooter}>
            <button
              className={`${styles.logoutButton} ${
                isDarkMode ? styles.logoutButtonLight : styles.logoutButtonDark
              }`}
              onClick={handleLogout}
              tabIndex={0}
            >
              <Power size={20} className={styles.logoutIcon} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      <div className={styles.mainContent}>
        <div className={`${styles.header} ${styles.mobileHeader}`}>
          <Header
            isDark={isDarkMode}
            onThemeToggle={handleThemeToggle}
            onLogout={handleLogout}
            menuItems={menuItems}
            isLoggedIn={true}
            name={truncatedText(user.fullName || "", 12)}
          />
        </div>
        <div className={`${styles.header} ${styles.desktopHeader}`}>
          <FullHeader
            isDark={isDarkMode}
            name={truncatedText(user.fullName || "", 12)}
            onThemeToggle={handleThemeToggle}
            image={""}
          />
        </div>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;

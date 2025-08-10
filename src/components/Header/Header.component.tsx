import React, { useState, useEffect } from "react";
import { Menu, X, MoonStar, Power, UserRound } from "lucide-react";
import styles from "./Header.module.css";
import { PiLightbulbFilament } from "react-icons/pi";
import logoWhite from "../../assets/logos/logoWhite.png";
import logoBlack from "../../assets/logos/logoBlack.png";
import PrimaryButton from "../button/PrimaryButton.component";
import { useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  route: string;
}

interface HeaderProps {
  onThemeToggle?: (isDark: boolean) => void;
  onLogout?: () => void;
  isDark: boolean;
  menuItems: MenuItem[];
  isLoggedIn: boolean;
  image?: string;
  name: string;
}

const Header: React.FC<HeaderProps> = ({
  onThemeToggle,
  onLogout,
  isDark,
  menuItems,
  isLoggedIn,
  image,
  name,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    onThemeToggle?.(newTheme);
  };

  const handleLogout = () => {
    onLogout?.();
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate(`/app/${route}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          isDark ? styles.headerLight : styles.headerDark
        }`}
      >
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <img src={isDark ? logoWhite : logoBlack} alt="CORONATION" />
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            {/* Theme Toggle */}
            <button
              className={`${styles.themeToggle} ${
                isDark ? styles.themeToggleLight : styles.themeToggleDark
              }`}
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "dark" : "light"} mode`}
            >
              <div
                className={`${styles.toggleIcon} ${
                  isDark ? styles.toggleIconDarkColor : styles.toggleIconLight
                }`}
              >
                <PiLightbulbFilament size={16} />
              </div>

              <div
                className={`${styles.toggleIcon} ${
                  isDark ? styles.toggleIconDark : styles.toggleIconDarkColor
                }`}
              >
                <MoonStar size={16} />
              </div>
            </button>

            {/* Menu Toggle */}
            <button
              className={`${styles.menuToggle} ${
                isDark ? styles.menuToggleLight : styles.menuToggleDark
              }`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.menuOverlay} ${
          isMenuOpen ? styles.menuOverlayOpen : ""
        } ${isDark ? styles.menuOverlayLight : styles.menuOverlayDark}`}
        onClick={toggleMenu}
      />

      <nav
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        } ${isDark ? styles.mobileMenuDark : styles.mobileMenuLight}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`${styles.userContainer} ${
            !isDark && styles.userContainerLight
          }`}
          style={{ marginBottom: "10px" }}
        >
          <div className={styles.profileContainer}>
            <div
              className={`${styles.avatarContainer}`}
              style={{ fontSize: "1.4rem", cursor: "pointer" }}
            >
              {!image ? (
                <UserRound className={styles.person} />
              ) : (
                <img
                  src={image}
                  alt="dp"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
            <div className={styles.userName}>
              <p>{name}</p>
              <span
                onClick={() => {
                  navigate("/app/profile");
                  setIsMenuOpen(false);
                }}
                className={styles.viewProfile}
              >
                View Profile
              </span>
            </div>
          </div>
          <GoBell
            className={`${styles.bell} ${
              isDark ? styles.bellLight : styles.bellDark
            }`}
          />
        </div>
        <div className={styles.menuItems}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(`/app/${item.route}`);
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

          {!isLoggedIn && (
            <div className={styles.getStartedBtn}>
              <PrimaryButton
                id="success-toast-button"
                label="Get Started"
                isDisabled={false}
                hasIcon={false}
                onClick={() => {}}
              />
            </div>
          )}
        </div>

        {isLoggedIn && (
          <div className={styles.menuFooter}>
            <button
              className={`${styles.logoutButton} ${
                isDark ? styles.logoutButtonLight : styles.logoutButtonDark
              }`}
              onClick={handleLogout}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <Power size={20} className={styles.logoutIcon} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;

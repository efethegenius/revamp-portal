import PrimaryButton from "../../button/PrimaryButton.component";
import styles from "../Header.module.css";

import logoBlack from "../../../assets/logos/logoBlack.png";
import logoWhite from "../../../assets/logos/logoWhite.png";
import { PiLightbulbFilament } from "react-icons/pi";
import { MoonStar } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";

interface HeaderProps {
  isDark: boolean;
}

const WebHeader: React.FC<HeaderProps> = ({ isDark }) => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
  };

  return (
    <header
      className={`${styles.webHeader} ${
        !isDark ? styles.webHeaderLight : styles.webHeaderDark
      }`}
    >
      <div className={styles.webLogo}>
        <img
          src={isDark ? logoWhite : logoBlack}
          alt="CORONATION"
          onClick={() => window.location.reload()}
          style={{ cursor: "pointer" }}
        />
      </div>
      <nav
        className={`${styles.webNav} ${
          !isDark ? styles.textDark : styles.textWhite
        }`}
      >
        <div className={styles.controls}>
          {/* Theme Toggle */}
          <button
            className={`${styles.themeToggle} ${
              isDark ? styles.themeToggleLight : styles.themeToggleDark
            }`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          >
            <div
              className={`${styles.toggleIcon} ${
                isDark ? styles.toggleIconDarkColor : styles.toggleIconLightWeb
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
        </div>
        <a href="#about">About</a>
        <a href="#get-quote">Quote</a>
        <a href="#support">Support</a>
        <a href="#login">Login</a>
        <PrimaryButton
          id="success-toast-button"
          label="Get Started"
          isDisabled={false}
          hasIcon={false}
          onClick={() => {}}
        />
      </nav>
    </header>
  );
};

export default WebHeader;

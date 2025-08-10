// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../Header.module.css";
import { GoBell } from "react-icons/go";
import { MoonStar, UserRound } from "lucide-react";
import { PiLightbulbFilament } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onThemeToggle?: (isDark: boolean) => void;
  isDark: boolean;
  name: string;
  image: string;
}
export const FullHeader: React.FC<HeaderProps> = ({
  onThemeToggle,
  isDark,
  name,
  image,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  const location = useLocation();
  const pathname = location.pathname;
  const currentRoute = pathname.split("/app/")[1] || "dashboard";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const descriptions = {
    dashboard:
      "Check your active policies. No surprises—just peace of mind, protection, and power at your fingertips.",
    "my-policies":
      "Check your active policies. No surprises—just peace of mind, protection, and power at your fingertips.",
    claims: "Claims payout in 48 hours.",
    profile:
      "A few clicks today, for a smoother experience tomorrow--let’s get you updated!",
    products: "Review and purchase available products on the retail portal.",
    support:
      "No worries—our support team is ready to jump in. Drop your a chat below.",
    settings:
      "Personalize your experience. Update preferences and manage your account details with ease.",
    policies:
      "Stay informed about your coverage. Review, manage, and track all your active policies in one place.",
    investment:
      "Grow your wealth with tailored investment options designed for your goals and financial security.",
    prompt: "Manage your policies, see due dates, review history.",
  };

  const title =
    currentRoute.charAt(0).toUpperCase() +
    currentRoute.slice(1).replace("-", " ");
  const description =
    descriptions[currentRoute as keyof typeof descriptions] ||
    descriptions.prompt;

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    onThemeToggle?.(newTheme);
  };

  const navigate = useNavigate();
  return (
    <div
      className={`${styles.col2} ${
        isDark ? styles.col2Dark : styles.col2Light
      }`}
    >
      <div className={styles.titleContainer}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
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
                isDark ? styles.toggleIconDarkColor : styles.toggleIconLightFull
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
      </div>
    </div>
  );
};

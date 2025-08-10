import React from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import loaderIcon from "../../assets/Icons/loading.png";
import { loadingButtonLabel, isDark } from "../../constants/data"; // 👈 add isDark

import type { IButton } from "../../types/IButton.interface";

const PrimaryButton: React.FC<IButton> = ({
  id,
  label,
  onClick,
  isDisabled,
  isLoading,
  hasIcon,
  icon,
}) => {
  const isDarkLoadingOrDisabled = isDark && (isLoading || isDisabled);

  return (
    <Button
      id={id}
      onClick={onClick}
      className={`${styles.commonAttribute} ${
        isDarkLoadingOrDisabled
          ? styles.primaryButtonDark
          : styles.primarybutton
      }`}
      disabled={isDisabled}
    >
      {!isLoading ? (
        <>
          {hasIcon && icon && (
            <img
              src={icon}
              alt=""
              className={`${styles.icon} ${isDark ? styles.iconDark : ""}`}
            />
          )}
          {label}
        </>
      ) : (
        <>
          <img
            src={loaderIcon}
            alt=""
            className={`${styles.icon} ${isDark ? styles.iconDark : ""}`}
          />
          <span
            className={
              isDark
                ? styles.primaryButtonLoadingDark
                : styles.primarybuttonLoading
            }
          >
            {loadingButtonLabel}
          </span>
        </>
      )}
    </Button>
  );
};

export default PrimaryButton;

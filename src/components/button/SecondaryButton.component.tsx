import React from "react";
import { Button } from "react-bootstrap";
import type { IButton } from "../../types/IButton.interface";
import { loadingButtonLabel, isDark } from "../../constants/data";

import loaderIcon from "../../assets/Icons/dark-loading.png";

import styles from "./styles.module.css";

const SecondaryButton: React.FC<IButton> = ({
  id,
  label,
  onClick,
  isDisabled,
  hasIcon,
  isLoading,
  icon,
}) => {
  return (
    <Button
      id={id}
      onClick={onClick}
      className={`${styles.commonAttribute} ${
        isDark && (isDisabled || isLoading)
          ? styles.secondaryButtonDark
          : styles.secondaryButton
      } ${isDark && !isDisabled && !isLoading ? styles.secondaryButtonTextDark : ""}`}
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
                ? styles.secondaryButtonLoadingDark
                : styles.secondaryButtonLoading
            }
          >
            {loadingButtonLabel}
          </span>
        </>
      )}
    </Button>
  );
};

export default SecondaryButton;

import React from "react";
import { Button } from "react-bootstrap";
import type { IButton } from "../../types/IButton.interface";
import loaderIconError from "../../assets/Icons/red-loading.png";
import { loadingButtonLabel, isDark } from "../../constants/data";

import styles from "./styles.module.css";

const DestructiveButton: React.FC<IButton> = ({
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
          ? styles.destructiveButtonDark
          : styles.destructiveButton
      }`}
      disabled={isDisabled}
    >
      {!isLoading && (
        <>
          {hasIcon &&
            icon &&
            (typeof icon === "string" ? (
              <img src={icon} alt="" className={styles.destructiveIcon} />
            ) : (
              React.createElement(icon, { className: styles.destructiveIcon })
            ))}
          {label}
        </>
      )}
      {isLoading && (
        <>
          <img src={loaderIconError} alt="" className={styles.icon} />
          <span
            className={
              isDark ? styles.destructiveLoadingDark : styles.destructiveLoading
            }
          >
            {loadingButtonLabel}
          </span>
        </>
      )}
    </Button>
  );
};

export default DestructiveButton;

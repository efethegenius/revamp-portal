import React from "react";
import { CheckCircle, AlertTriangle, AlertCircle, X } from "lucide-react";
import styles from "./CustomToast.module.css";

interface CustomToastProps {
  type: "success" | "warning" | "error";
  title: string;
  onClose: () => void;
  onAction?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  type,
  title,
  onClose,
  onAction,
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className={styles.icon} />;
      case "warning":
        return <AlertTriangle size={20} className={styles.icon} />;
      case "error":
        return <AlertCircle size={20} className={styles.icon} />;
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>{getIcon()}</div>
        <div className={styles.textContainer}>
          <span className={styles.title}>{title}</span>
          {onAction && (
            <button className={styles.actionButton} onClick={onAction}>
              Action
            </button>
          )}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;

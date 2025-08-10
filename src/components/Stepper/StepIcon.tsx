import React from "react";
import styles from "./Stepper.module.css";

interface Props {
  icon: React.ReactNode;
  status: "completed" | "active" | "next" | "upcoming";
}

const StepIcon: React.FC<Props> = ({ icon, status }) => {
  return <div className={`${styles.icon} ${styles[status]}`}>{icon}</div>;
};

export default StepIcon;

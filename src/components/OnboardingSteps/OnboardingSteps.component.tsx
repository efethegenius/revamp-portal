import React from "react";
import styles from "./OnboardingSteps.module.css";

type ProgressStepsProps = {
  totalSteps: number;
  activeStep: number;
};

const OnboardingSteps: React.FC<ProgressStepsProps> = ({
  totalSteps,
  activeStep,
}) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index + 1 <= activeStep;
        return (
          <div
            key={index}
            className={`${styles.line} ${isCompleted ? styles.completed : ""}`}
          ></div>
        );
      })}
    </div>
  );
};

export default OnboardingSteps;

import React from "react";
import StepIcon from "./StepIcon";
import styles from "./Stepper.module.css";

interface StepProps {
  label: string;
  status: "completed" | "active" | "next" | "upcoming";
  icon: React.ReactNode;
}

interface Props {
  steps: StepProps[];
  isMobile?: boolean;
  onStepClick: (index: number) => void;
  currentStep: number;
}

const Stepper: React.FC<Props> = ({
  steps,
  isMobile = false,
  onStepClick,
  currentStep,
}) => {
  console.log(isMobile);
  return (
    <div
      className={`${styles.stepper} ${
        isMobile ? styles.mobile : styles.desktop
      }`}
    >
      {steps.map((step, i) => {
        if (isMobile && currentStep + 1 < i) {
          return <></>;
        } else {
          return (
            <div
              key={step.label}
              className={`${styles.step} ${styles[step.status]}`}
              onClick={() => onStepClick(i)}
            >
              <StepIcon icon={step.icon} status={step.status} />
              {isMobile && step.status === "active" && (
                <span className={styles.label}>{step.label}</span>
              )}
              {!isMobile && <span className={styles.label}>{step.label}</span>}
              {isMobile && i < 4 && <div className={styles.line}></div>}
              {i < steps.length - 1 && <span className={styles.dot}>·</span>}
            </div>
          );
        }
        // return (
        //   <div
        //     key={step.label}
        //     className={`${styles.step} ${styles[step.status]}`}
        //     onClick={() => onStepClick(i)}
        //   >
        //     <StepIcon icon={step.icon} status={step.status} />
        //     {isMobile && step.status === "active" && (
        //       <span className={styles.label}>{step.label}</span>
        //     )}
        //     {!isMobile && <span className={styles.label}>{step.label}</span>}
        //     {i < steps.length - 1 && <span className={styles.dot}>·</span>}
        //   </div>
        // );
      })}
    </div>
  );
};

export default Stepper;

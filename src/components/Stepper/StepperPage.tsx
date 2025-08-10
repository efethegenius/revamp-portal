import { useEffect, useState } from "react";
import styles from "./Stepper.module.css";
import Stepper from "./Stepper.component";
import BoxIcon from "../../assets/Icons/bag-icon.svg";
import QuoteIcon from "../../assets/Icons/calculator-icon.svg";
import InfoIcon from "../../assets/Icons/file-icon.svg";
import UploadIcon from "../../assets/Icons/download-icon.svg";
import PayIcon from "../../assets/Icons/pay-icon.svg";
import { ChevronLeft } from "lucide-react";

const stepIcons = [BoxIcon, QuoteIcon, InfoIcon, UploadIcon, PayIcon];

export default function StepperPage({
  currentStep,
  onStepChange,
  isDark,
}: {
  currentStep: number;
  onStepChange: (n: number) => void;
  isDark: boolean;
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    "Select Product",
    "Get Quote",
    `Additional Info${isMobile ? "" : "rmation"}`,
    `Upload ${isMobile ? "" : "document"}`,
    "Pay",
  ];

  return (
    <div
      className={`${styles.container} ${isDark ? styles.dark : styles.light}`}
    >
      <div className={styles.nav}>
        <button
          className={styles.navButton}
          onClick={() => {
            if (currentStep === 0) {
              console.log("Exit clicked");
            } else {
              onStepChange(currentStep - 1);
            }
          }}
        >
          <ChevronLeft fontSize={10} />
        </button>
      </div>

      <Stepper
        steps={steps.map((label, i) => ({
          label,
          status:
            i < currentStep
              ? "completed"
              : i === currentStep
              ? "active"
              : "upcoming",
          icon: (
            <img
              src={stepIcons[i]}
              alt={`${label} icon`}
              className={styles.stepIcon}
            />
          ),
        }))}
        isMobile={isMobile}
        onStepClick={onStepChange}
        currentStep={currentStep}
      />
    </div>
  );
}

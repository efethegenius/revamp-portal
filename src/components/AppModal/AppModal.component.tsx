import * as Dialog from "@radix-ui/react-dialog";
import styles from "./AppModal.module.css";
import { Smartphone } from "lucide-react";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import PrimaryButton from "../button/PrimaryButton.component";

const AppModal = ({
  isOpen,
  onOpenChange,
  onComplete,
  title,
  subtitle,
  buttonLabel,
  icon,
  buttonAction,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  title: string;
  subtitle: string;
  buttonLabel: string;
  icon: React.ReactNode;
  buttonAction: () => void;
}) => {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      onComplete();
      onOpenChange(false);
    }
  }, [otp]);
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modalContent}>
          <div className={styles.icon}>{icon}</div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>

          <PrimaryButton
            id={buttonLabel}
            label={buttonLabel}
            isDisabled={false}
            hasIcon={false}
            onClick={() => {
              buttonAction();
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AppModal;

import * as Dialog from "@radix-ui/react-dialog";
import styles from "../OTPModal.module.css";
import { Smartphone } from "lucide-react";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";

const OTPModal = ({
  isOpen,
  onOpenChange,
  onComplete,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
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
          <div className={styles.icon}>
            <Smartphone size={32} className={styles.smartphone} />
          </div>
          <h2 className={styles.title}>Enter OTP</h2>
          <p className={styles.subtitle}>
            Enter the 6-digit code sent to your registered NIN number
            0814*****274
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={styles.otpBox}
          />
          <p className={styles.resend}>Resend</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OTPModal;

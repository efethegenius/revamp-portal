import styles from "../Onboarding.module.css";
import { LockKeyhole } from "lucide-react";
import TextInput from "../../../components/TextInputField/TextInput.component";
import PrimaryButton from "../../../components/button/PrimaryButton.component";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordCredentials } from "../../../Services/serviceTypes";
import { SendResetPasswordLink } from "../../../Services/services";
import { AppContext } from "../../../Context/AppContext";

type Props = {
  onBackToLoginClick: (page: string) => void;
};

const ResetPassword = ({ onBackToLoginClick }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { showToast } = useContext(AppContext);
  const [emailError, setEmailError] = useState(false);

  const { mutateAsync: handleResetPassword } = useMutation({
    mutationFn: (credentials: ResetPasswordCredentials) =>
      SendResetPasswordLink(credentials),
  });

  const handlePasswordReset = async () => {
    if (email.trim() === "") {
      setEmailError(true);
      showToast("error", "Please enter your email address");
      return;
    } else {
      setEmailError(false);
    }

    try {
      setIsLoading(true);
      const response = await handleResetPassword({ email });
      console.log("Response", response.data);
      if (response.success) {
        showToast("success", response.message);
        setEmail("");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      showToast("error", error.response?.data?.message);
      console.log(error, "Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.icon}>
          <LockKeyhole />
        </div>
        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>
          Enter your registered email address to reset your password
        </p>

        <div className={styles.emailContainer}>
          <TextInput
            placeholder="Email"
            label="Email"
            onChange={(val) => {
              setEmail(val);
              if (val.trim() !== "") setEmailError(false);
            }}
            variant={emailError ? "error" : undefined}
            error={emailError}
            feedback={emailError ? "Required" : ""}
          />
        </div>

        <PrimaryButton
          id="reset-btn"
          label="Reset Password"
          isLoading={isLoading}
          isDisabled={isLoading}
          hasIcon={false}
          onClick={() => {
            handlePasswordReset();
          }}
        />

        <div className={styles.signUp}>
          Go back to{" "}
          <a
            onClick={() => {
              onBackToLoginClick("login");
            }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

import styles from "../Onboarding.module.css";
import { CircleCheck, CircleCheckBig, LockKeyhole } from "lucide-react";
import PrimaryButton from "../../../components/button/PrimaryButton.component";
import PasswordInput from "../../../components/TextInputField/PasswordInput.component";
import AppModal from "../../../components/AppModal/AppModal.component";
import { useContext, useEffect, useState } from "react";
import { NewResetPassword } from "../../../Services/services";
import { AppContext } from "../../../Context/AppContext";

interface Props {
  onPageClick: (page: string) => void;
}
const CreatePassword = ({ onPageClick }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { showToast } = useContext(AppContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    setEmail(emailParam);
    setToken(tokenParam);
  }, [location.search]);

  const validatePasswordRules = {
    minLength: (password: string) => password.length >= 8,
    uppercase: (password: string) => /[A-Z]/.test(password),
    lowercase: (password: string) => /[a-z]/.test(password),
    number: (password: string) => /[0-9]/.test(password),
    specialChar: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passwordRuleStates = {
    minLength: validatePasswordRules.minLength(newPassword),
    uppercase: validatePasswordRules.uppercase(newPassword),
    lowercase: validatePasswordRules.lowercase(newPassword),
    number: validatePasswordRules.number(newPassword),
    specialChar: validatePasswordRules.specialChar(newPassword),
  };
  const handleResetPassword = async () => {
    let hasError = false;

    if (newPassword.trim() === "") {
      setNewPasswordError(true);
      hasError = true;
    } else {
      setNewPasswordError(false);
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError(true);
      hasError = true;
    } else {
      setConfirmPasswordError(false);
    }

    if (newPassword !== confirmPassword) {
      showToast("warning", "Passwords do not match");
      setConfirmPasswordError(true);
      return;
    }

    if (hasError) {
      showToast("warning", "All fields are required");
      return;
    }

    const allRulesPassed = Object.values(passwordRuleStates).every(
      (val) => val
    );
    if (!allRulesPassed) {
      showToast("warning", "Password does not meet the required criteria");
      return;
    }

    try {
      setIsLoading(true);
      const response = await NewResetPassword({
        email: email as string,
        token: token as string,
        newPassword: newPassword,
        channel: "retail portal",
      });

      if (response.success) {
        setIsModalOpen(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      showToast("error", error.response?.data?.message);
      console.log(error);
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
        <h2 className={styles.title}>New Password</h2>
        <p className={styles.subtitle}>Change password for {email}</p>

        <div className={styles.passwordContainer}>
          <PasswordInput
            label="New Password"
            placeholder="New Password"
            showToggle
            type="password"
            value={newPassword}
            onChange={(val) => {
              setNewPassword(val);
              if (val.trim() !== "") setNewPasswordError(false);
            }}
            variant={newPasswordError ? "error" : undefined}
            error={newPasswordError}
            feedback={newPasswordError ? "Required" : ""}
          />
        </div>
        <div className={styles.passwordContainer}>
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            showToggle
            type="password"
            value={confirmPassword}
            onChange={(val) => {
              setConfirmPassword(val);
              if (val.trim() !== "") setConfirmPasswordError(false);
            }}
            variant={confirmPasswordError ? "error" : undefined}
            error={confirmPasswordError}
            feedback={confirmPasswordError ? "Required" : ""}
          />
        </div>

        <div className={styles.passwordRules}>
          <div className={styles.passwordRuleItem}>
            <CircleCheck
              size={16}
              color={passwordRuleStates.minLength ? "green" : "grey"}
            />
            Minimum 8 characters
          </div>
          <div className={styles.passwordRuleItem}>
            <CircleCheck
              size={16}
              color={passwordRuleStates.uppercase ? "green" : "grey"}
            />
            At least one uppercase letter (A-Z)
          </div>
          <div className={styles.passwordRuleItem}>
            <CircleCheck
              size={16}
              color={passwordRuleStates.lowercase ? "green" : "grey"}
            />
            At least one lowercase letter (a-z)
          </div>
          <div className={styles.passwordRuleItem}>
            <CircleCheck
              size={16}
              color={passwordRuleStates.number ? "green" : "grey"}
            />
            At least one number (0-9)
          </div>
          <div className={styles.passwordRuleItem}>
            <CircleCheck
              size={16}
              color={passwordRuleStates.specialChar ? "green" : "grey"}
            />
            At least one special character (e.g. ! @ # $ % ^ & *)
          </div>
        </div>

        <PrimaryButton
          id="reset-btn"
          label="Reset Password"
          isLoading={isLoading}
          isDisabled={isLoading}
          hasIcon={false}
          onClick={() => {
            handleResetPassword();
          }}
        />
      </div>
      <AppModal
        onComplete={() => console.log("create-account")}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Password Reset"
        subtitle="You can now login to your dashboard with your new password"
        buttonLabel="Go to Login"
        icon={<CircleCheckBig className={styles.modalIcon} />}
        buttonAction={() => {
          setIsModalOpen(false);
          onPageClick("login");
        }}
      />
    </div>
  );
};

export default CreatePassword;

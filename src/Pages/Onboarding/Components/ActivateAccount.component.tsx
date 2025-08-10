import styles from "../Onboarding.module.css";
import PasswordInput from "../../../components/TextInputField/PasswordInput.component";
import PrimaryButton from "../../../components/button/PrimaryButton.component";
import { CircleCheck, CircleCheckBig } from "lucide-react";
import AppModal from "../../../components/AppModal/AppModal.component";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ChangePassword } from "../../../Services/services";
import type { PasswordChangeCredentials } from "../../../Services/serviceTypes";
import { AppContext } from "../../../Context/AppContext";
import OnboardingSteps from "../../../components/OnboardingSteps/OnboardingSteps.component";
import { useNavigate } from "react-router-dom";

const ActivateAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { showToast } = useContext(AppContext);

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

  const { mutateAsync: handleChangePassword } = useMutation({
    mutationFn: (credentials: PasswordChangeCredentials) =>
      ChangePassword(credentials),
  });

  const handlePasswordChange = async () => {
    let hasError = false;

    if (currentPassword.trim() === "") {
      setCurrentPasswordError(true);
      hasError = true;
    } else {
      setCurrentPasswordError(false);
    }

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

    // Check if password rules are all passed
    const allRulesPassed = Object.values(passwordRuleStates).every(
      (val) => val
    );
    if (!allRulesPassed) {
      showToast("warning", "Password does not meet the required criteria");
      return;
    }

    try {
      setIsLoading(true);
      const response = await handleChangePassword({
        currentPassword: currentPassword ?? "",
        newPassword: newPassword ?? "",
      });

      if (response.success) {
        setIsModalOpen(true);
        setNewPassword("");
        setConfirmPassword("");
        setCurrentPassword("");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showToast("error", "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Activate Account</h2>
        <p className={styles.subtitle}>
          Create a password to activate your account
        </p>

        <OnboardingSteps activeStep={3} totalSteps={3} />

        <div className={styles.passwordContainer}>
          <PasswordInput
            label="Default Password"
            placeholder="Default Password"
            showToggle
            type="password"
            onChange={(val) => {
              setCurrentPassword(val);
              if (val.trim() !== "") setCurrentPasswordError(false);
            }}
            variant={currentPasswordError ? "error" : undefined}
            error={currentPasswordError}
            feedback={currentPasswordError ? "Required" : ""}
          />
        </div>
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
            {passwordRuleStates.minLength ? (
              <CircleCheck
                size={16}
                className={styles.checkIcon}
                color="green"
              />
            ) : (
              <span className={styles.errorIcon}>
                <CircleCheck size={16} color="grey" />
              </span>
            )}
            Minimum 8 characters
          </div>
          <div className={styles.passwordRuleItem}>
            {passwordRuleStates.uppercase ? (
              <CircleCheck
                size={16}
                className={styles.checkIcon}
                color="green"
              />
            ) : (
              <span className={styles.errorIcon}>
                <CircleCheck size={16} color="grey" />
              </span>
            )}
            At least one uppercase letter (A-Z)
          </div>
          <div className={styles.passwordRuleItem}>
            {passwordRuleStates.lowercase ? (
              <CircleCheck
                size={16}
                className={styles.checkIcon}
                color="green"
              />
            ) : (
              <span className={styles.errorIcon}>
                <CircleCheck size={16} color="grey" />
              </span>
            )}
            At least one lowercase letter (a-z)
          </div>
          <div className={styles.passwordRuleItem}>
            {passwordRuleStates.number ? (
              <CircleCheck
                size={16}
                className={styles.checkIcon}
                color="green"
              />
            ) : (
              <span className={styles.errorIcon}>
                <CircleCheck size={16} color="grey" />
              </span>
            )}
            At least one number (0-9)
          </div>
          <div className={styles.passwordRuleItem}>
            {passwordRuleStates.specialChar ? (
              <CircleCheck
                size={16}
                className={styles.checkIcon}
                color="green"
              />
            ) : (
              <span className={styles.errorIcon}>
                <CircleCheck size={16} color="grey" />
              </span>
            )}
            At least one special character (e.g. ! @ # $ % ^ & *)
          </div>
        </div>

        <PrimaryButton
          id="activate-account-btn"
          label="Activate Account"
          isDisabled={isLoading}
          isLoading={isLoading}
          hasIcon={false}
          onClick={() => {
            handlePasswordChange();
          }}
        />
      </div>
      <AppModal
        onComplete={() => console.log("create-account")}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Activation Successful"
        subtitle="You are ready to purchase and manage your insurance policies"
        buttonLabel="Go to Dashboard"
        icon={<CircleCheckBig className={styles.modalIcon} />}
        buttonAction={() => {
          setIsModalOpen(false);
          navigate("/app/dashboard");
        }}
      />
    </div>
  );
};

export default ActivateAccount;

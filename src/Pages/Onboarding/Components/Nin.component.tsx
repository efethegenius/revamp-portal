import styles from "../Onboarding.module.css";
import TextInput from "../../../components/TextInputField/TextInput.component";
import PrimaryButton from "../../../components/button/PrimaryButton.component";
import OnboardingSteps from "../../../components/OnboardingSteps/OnboardingSteps.component";

type Props = {
  onOtpTrigger: () => void;
  onPageClick: (page: string) => void;
};

const Nin = ({ onOtpTrigger, onPageClick }: Props) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>
          Sign up to purchase insurance products and manage your policies with
          us
        </p>

        <OnboardingSteps activeStep={1} totalSteps={3} />

        <div className={styles.emailContainer}>
          <TextInput placeholder="Enter your Nin" label="Enter your Nin" />
        </div>

        <PrimaryButton
          id="get-started-btn"
          label="Get Started"
          isDisabled={false}
          hasIcon={false}
          onClick={onOtpTrigger}
        />

        <div className={styles.signUp}>
          Don’t have your Nin?{" "}
          <a
            onClick={() => {
              onPageClick("create-account");
            }}
          >
            Sign Up here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nin;

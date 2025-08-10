import styles from "../Onboarding.module.css";
import TextInput from "../../../components/TextInputField/TextInput.component";
import PrimaryButton from "../../../components/button/PrimaryButton.component";
import TelephoneInput from "../../../components/TextInputField/TelephoneInput.component";
import Dropdown from "../../../components/TextInputField/Dropdown.component";
import { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import OnboardingSteps from "../../../components/OnboardingSteps/OnboardingSteps.component";
import { register } from "../../../Services/services";
import CheckBoxComponent from "../../../components/TextInputField/Checkbox.component";

type Props = {
  onPageClick: (page: string) => void;
};

export type IRegisterPayload = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  country: string;
  rcNumber: string;
  gender: string;
  address: string;
  occupation: string;
  dateofBirth: string;
};

const CreateAccount = ({ onPageClick }: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dateofBirth, setDateOfBirth] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { isDarkMode, showToast } = useContext(AppContext);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [agree, setAgree] = useState(false);

  const payload: IRegisterPayload = {
    firstName,
    lastName,
    companyName: "",
    email,
    phoneNumber,
    country: "",
    rcNumber: "",
    gender,
    address: "",
    occupation: "",
    dateofBirth,
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (firstName.trim() === "") {
      setFirstNameError(true);
      console.log("first error");
      hasError = true;
    } else {
      setFirstNameError(false);
    }

    if (lastName.trim() === "") {
      setLastNameError(true);
      console.log("last error");
      hasError = true;
    } else {
      setLastNameError(false);
    }

    if (!agree) {
      setTermError(true);
      hasError = true;
    } else {
      setTermError(false);
    }

    if (email.trim() === "") {
      setEmailError(true);
      console.log("email error");
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (phoneNumber.trim() === "") {
      setPhoneError(true);
      console.log("phone error");
      hasError = true;
    } else {
      setPhoneError(false);
    }

    if (dateofBirth.trim() === "") {
      setDobError(true);
      console.log("dob error");
      hasError = true;
    } else {
      setDobError(false);
    }

    if (gender.trim() === "") {
      setGenderError(true);
      console.log(gender);

      console.log("gender error");

      hasError = true;
    } else {
      setGenderError(false);
    }

    if (hasError) {
      showToast("error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await register(payload);
      if (res.success) {
        onPageClick("activate-account");
        showToast(
          "success",
          "User registered successfully, A temporary password has been sent to your email"
        );
      } else {
        showToast("error", res.message);
      }
    } catch (error: any) {
      showToast("error", error.response?.data?.message);
      console.error("Registration failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>
          Sign up to purchase insurance products and manage your policies with
          us
        </p>

        <OnboardingSteps activeStep={2} totalSteps={3} />

        <div className={styles.doubleInput}>
          <div className={styles.emailContainer}>
            <TextInput
              placeholder="First Name"
              label="First Name"
              onChange={(val) => {
                setFirstName(val);
                if (val.trim() !== "") setFirstNameError(false);
              }}
              variant={firstNameError ? "error" : undefined}
              error={firstNameError}
              feedback={firstNameError ? "Required" : ""}
            />
          </div>
          <div className={styles.emailContainer}>
            <TextInput
              placeholder="Last Name"
              label="Last Name"
              onChange={(val) => {
                setLastName(val);
                if (val.trim() !== "") setLastNameError(false);
              }}
              variant={lastNameError ? "error" : undefined}
              error={lastNameError}
              feedback={lastNameError ? "Required" : ""}
            />
          </div>
        </div>
        <div className={styles.emailContainer}>
          <TextInput
            placeholder="Email Address"
            label="Email Address"
            onChange={(val) => {
              setEmail(val);
              if (val.trim() !== "") setEmailError(false);
            }}
            variant={emailError ? "error" : undefined}
            error={emailError}
            feedback={emailError ? "Required" : ""}
          />
        </div>
        <div className={styles.emailContainer}>
          <TelephoneInput
            placeholder="Enter phone number"
            onChange={(val) => {
              setPhoneNumber(val);
              if (val.trim() !== "") setPhoneError(false);
            }}
            variant={phoneError ? "error" : undefined}
            error={phoneError}
            feedback={phoneError ? "Required" : ""}
          />
        </div>

        <div className={styles.doubleInput}>
          <div className={styles.emailContainer} style={{ width: "100%" }}>
            <TextInput
              placeholder="Date of birth"
              label="Date of birth"
              type="date"
              onChange={(val) => {
                setDateOfBirth(val);
                if (val.trim() !== "") setDobError(false);
              }}
              variant={dobError ? "error" : undefined}
              error={dobError}
              feedback={dobError ? "Required" : ""}
            />
          </div>

          <Dropdown
            label="Gender"
            searchable
            isDark={isDarkMode}
            options={["", "Male", "Female"]}
            onChange={(val) => {
              setGender(val);
              console.log(gender);
            }}
            variant={genderError ? "error" : undefined}
            error={genderError}
            feedback={genderError ? "Required" : ""}
          />
        </div>

        <div className={styles.optionss}>
          <div className={styles.terms}>
            <CheckBoxComponent
              label={
                <>
                  I have read and agree to Coronation{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms of use
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.coronation.ng/privacy-and-cookie-policy/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </>
              }
              checked={agree}
              onChange={(value) => {
                setAgree(value);
                if (value) {
                  setTermError(false);
                }
              }}
            />
          </div>
          {termError && (
            <span className={styles.termError}>
              Please read and agree to the terms of use and privacy policy
            </span>
          )}
        </div>

        <PrimaryButton
          id="create-account-btn"
          label="Create Account"
          isDisabled={loading}
          hasIcon={false}
          onClick={() => handleSubmit()}
          isLoading={loading}
        />
      </div>
      <div className={styles.signUp}>
        Already have an account?{" "}
        <a
          onClick={() => {
            onPageClick("login");
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default CreateAccount;

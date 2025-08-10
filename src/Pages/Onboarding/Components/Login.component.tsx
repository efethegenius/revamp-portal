import styles from "../Onboarding.module.css";
import TextInput from "../../../components/TextInputField/TextInput.component";
import PasswordInput from "../../../components/TextInputField/PasswordInput.component";
import PrimaryButton from "../../../components/button/PrimaryButton.component";
import { signIn } from "../../../Services/services";
import type { SignInCredentials } from "../../../Services/serviceTypes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { AppContext } from "../../../Context/AppContext";
import CheckBoxComponent from "../../../components/TextInputField/Checkbox.component";
type Props = {
  onPageClick: (page: string) => void;
};

const Login = ({ onPageClick }: Props) => {
  const [email, setEmail] = useState("");
  const { showToast } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const { mutateAsync: handleSignIn } = useMutation({
    mutationFn: (credentials: SignInCredentials) => signIn(credentials),
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    let hasError = false;

    if (email.trim() === "") {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (password.trim() === "") {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) {
      showToast("error", "Please fill in the required fields");
      return;
    }

    setIsLoading(true);
    sessionStorage.setItem("email", email);
    try {
      const response = await handleSignIn({
        email,
        password,
        channel: "retail portal",
      });
      console.log("Response:", response.data);

      sessionStorage.setItem("email", response.data.email);
      sessionStorage.setItem("details", JSON.stringify(response.data));

      if (response.statusCode === 200 && response.data.token) {
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        console.log("Success:", response.data);
        navigate("/app/dashboard");
        showToast("success", "Logged in successfully");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        sessionStorage.setItem(
          "details",
          JSON.stringify(error.response.data.data)
        );
        const { token } = error.response.data;
        sessionStorage.setItem("token", token);
        navigate("/app/profile");
      } else if (error.response && error.response.status === 401) {
        sessionStorage.setItem(
          "details",
          JSON.stringify(error.response.data.data)
        );
        sessionStorage.setItem("token", error.response.data.data.token);
        onPageClick("activate-account");
        showToast("warning", error.response.data.message);
      } else {
        showToast("error", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>Enter email and password to login.</p>

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

        <div className={styles.passwordContainer}>
          <PasswordInput
            label="Password"
            placeholder="Password"
            showToggle
            type="password"
            value={password}
            onChange={(val) => {
              setPassword(val);
              if (val.trim() !== "") setPasswordError(false);
            }}
            variant={passwordError ? "error" : undefined}
            error={passwordError}
            feedback={passwordError ? "Required" : ""}
          />
        </div>

        <div className={styles.options}>
          <a
            className={styles.forgotPassword}
            onClick={() => {
              onPageClick("reset");
            }}
          >
            Forgot Password?
          </a>
          {/* <label className={styles.checkboxLabel}> */}
          <div>
            <CheckBoxComponent
              label="Keep me logged in"
              checked={isRemember}
              onChange={setIsRemember}
            />
          </div>
          {/* </label> */}
        </div>

        <PrimaryButton
          id="login-btn"
          label="Login"
          isDisabled={isLoading}
          hasIcon={false}
          onClick={() => {
            handleSubmit();
          }}
          isLoading={isLoading}
        />

        <div className={styles.signUp}>
          Don’t have an account?{" "}
          <a
            onClick={() => {
              onPageClick("nin");
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

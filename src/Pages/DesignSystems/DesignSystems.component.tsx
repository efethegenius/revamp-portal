import { useContext, useState } from "react";
import PrimaryButton from "../../components/button/PrimaryButton.component";
import "bootstrap/dist/css/bootstrap.min.css";
import DestructiveButton from "../../components/button/DestructiveButton.component";
import SecondaryButton from "../../components/button/SecondaryButton.component";
import TextInput from "../../components/TextInputField/TextInput.component";
import PasswordInput from "../../components/TextInputField/PasswordInput.component";
import TelephoneInput from "../../components/TextInputField/TelephoneInput.component";
import Dropdown from "../../components/TextInputField/Dropdown.component";
import SearchBox from "../../components/TextInputField/SearchBox.component";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../constants/global.module.css";
import StepperPage from "../../components/Stepper/StepperPage";
import Header from "../../components/Header/Header.component";
import CustomToast from "../../components/Toast/CustomToast.component";
import { FullHeader } from "../../components/Header/fullHeader/FullHeader.component";
import WebHeader from "../../components/Header/webHeader/webHeader.component";
import Footer from "../../components/Footer/Footer.component";
import { AppContext } from "../../Context/AppContext";
import {
  BriefcaseBusiness,
  FileText,
  FolderHeart,
  Grid2X2,
  MessageSquareText,
  Settings2,
  TrendingUp,
} from "lucide-react";
import CheckBoxComponent from "../../components/TextInputField/Checkbox.component";

function DesignSystems() {
  const [, setCount] = useState(0);
  const [loading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);
  const [isMobileHeader, setIsMobileHeader] = useState(true);
  const [isTermAgreed, setIsTermAgreed] = useState(false);

  const showSuccessToast = () => {
    toast(
      <CustomToast
        type="success"
        title="Insert your alert title here!"
        onClose={() => toast.dismiss()}
        onAction={() => console.log("Action clicked")}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
        style: {
          boxShadow: "none",
          background: "transparent",
          width: "400px",
        },
      }
    );
  };

  const showWarningToast = () => {
    toast(
      <CustomToast
        type="warning"
        title="Insert your alert title here!"
        onClose={() => toast.dismiss()}
        onAction={() => console.log("Action clicked")}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
        style: {
          boxShadow: "none",
          background: "transparent",
          width: "400px",
        },
      }
    );
  };

  const showErrorToast = () => {
    toast(
      <CustomToast
        type="error"
        title="Insert your alert title here!"
        onClose={() => toast.dismiss()}
        onAction={() => console.log("Action clicked")}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
        style: {
          boxShadow: "none",
          background: "transparent",
          width: "400px",
        },
      }
    );
  };

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  // useEffect(() => {
  //   const screen = window.screen.availWidth;
  //   if (screen < 1024) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }, []);

  return (
    <div
      className={
        isDarkMode ? styles.dsBodyContainerDark : styles.dsBodyContainerLight
      }
    >
      <h1>Primary Button</h1>
      <div className={`${styles.dsContainer}`}>
        <PrimaryButton
          id="primary-button"
          label="Primary Button"
          isDisabled={false}
          hasIcon={false}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      {/* <div className={`${styles.dsContainer}`}>
        <PrimaryButton
          id="primary-button"
          label="Active"
          isDisabled={false}
          hasIcon={false}
          icon={light}
          onClick={() => setCount((count) => count + 1)}
        />
      </div> */}

      <CheckBoxComponent
        label="Check this"
        checked={isTermAgreed}
        onChange={setIsTermAgreed}
      />

      <div className={`${styles.dsContainer}`}>
        <PrimaryButton
          id="primary-button-disabled"
          label="Disabled"
          isDisabled={true}
          hasIcon={false}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <PrimaryButton
          id="destructive-button-disabled"
          label={"Not Loading"}
          isDisabled={true}
          hasIcon={false}
          isLoading={loading}
          icon={""}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      <h2>Destructive Button</h2>
      <div className={`${styles.dsContainer}`}>
        <DestructiveButton
          id="destructive-button"
          label="Active"
          isDisabled={false}
          hasIcon={false}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>
      {/* <div className={`${styles.dsContainer}`}>
        <DestructiveButton
          id="primary-button"
          label="Active"
          isDisabled={false}
          hasIcon={true}
          icon={light}
          onClick={() => setCount((count) => count + 1)}
        />
      </div> */}

      <div className={`${styles.dsContainer}`}>
        <DestructiveButton
          id="primary-button"
          label="Disabled"
          isDisabled={true}
          hasIcon={false}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <DestructiveButton
          id="destructive-button-disabled"
          label={"Not Loading"}
          isDisabled={true}
          hasIcon={false}
          isLoading={loading}
          icon={""}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      <h2>Secondary Button</h2>
      <div className={`${styles.dsContainer}`}>
        <SecondaryButton
          id="secondary-button"
          label="Active"
          isDisabled={false}
          hasIcon={false}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <SecondaryButton
          id="secondary-button"
          label="Disabled"
          isDisabled={true}
          hasIcon={false}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <SecondaryButton
          id="secondary-button-disabled"
          label={"Not Loading"}
          isDisabled={true}
          hasIcon={false}
          isLoading={loading}
          icon={""}
          onClick={() => setCount((count) => count + 1)}
        />
      </div>

      <h2>Text Inputs</h2>

      <div className={`${styles.dsContainer}`}>
        <TextInput placeholder="Input Label" />
      </div>
      <div className={`${styles.dsContainer}`}>
        <TextInput
          placeholder="Number Field"
          type="number"
          label="Number Field"
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <TextInput placeholder="Input Label" disabled />
      </div>

      <div className={`${styles.dsContainer}`}>
        <TextInput placeholder="Input Label" value="yetyeryt" disabled />
      </div>
      {/* 
      <TextInput
        label="Email"
        value="preloaded@email.com"
        onChange={(val) => console.log(val)}
      /> */}

      <div className={`${styles.dsContainer}`}>
        <TextInput
          label="Input Label"
          placeholder="Input field"
          showLabel={true}
          variant="error"
          error={true}
          feedback="Feedback"
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <TextInput
          label="Number Field"
          placeholder="1234567890"
          showLabel={true}
          variant="error"
          error={true}
          feedback="Feedback"
          type="number"
        />
      </div>

      <div>Password</div>
      <div className={`${styles.dsContainer}`}>
        <PasswordInput
          label="Input Label"
          placeholder="Enter password"
          showToggle
          type="password"
          value=""
        />
      </div>
      <div className={`${styles.dsContainer}`}>
        <PasswordInput
          placeholder="Enter your password"
          value={passwordVal}
          onChange={setPasswordVal}
          isHighlighted
          disabled
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <PasswordInput
          placeholder="Enter your password"
          value="password"
          onChange={setPasswordVal}
          isHighlighted
          disabled
        />
      </div>
      <div className={`${styles.dsContainer}`}>
        <PasswordInput
          label="Input Label"
          placeholder="Input field"
          showLabel={true}
          variant="error"
          error={true}
          feedback="Feedback"
        />
      </div>

      <h2>Telephone Inputs</h2>

      <div className={`${styles.dsContainer}`}>
        <TelephoneInput placeholder="Enter phone number" />
      </div>

      <div className={styles.dsContainer}>
        <TelephoneInput
          label="Enter Phone Number"
          placeholder="Enter phone number"
          disabled
          isHighlighted={false}
          value=""
        />
      </div>
      <div className={`${styles.dsContainer}`}>
        <TelephoneInput
          label="Enter Phone Number"
          placeholder="Enter phone number"
          showLabel={true}
          disabled
          isHighlighted={false}
          value=""
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <TelephoneInput
          label="Enter Phone Number"
          placeholder="Enter phone number"
          showLabel={true}
          error={true}
          feedback="Invalid phone number"
          value=""
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <Dropdown
          label="Dropdown content"
          searchable
          isDark={isDarkMode}
          options={[
            "Premium is too high",
            "Found a more competitive offer",
            "Others (Please specify)",
          ]}
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <SearchBox
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search"
        />
      </div>
      <div className={styles.dsContainer}>
        <div className={styles.custom}>
          <StepperPage
            currentStep={currentStep}
            onStepChange={(i: number) => {
              setCurrentStep(i);
            }}
            isDark={isDarkMode} // or false for white background
          />
        </div>
      </div>

      <h2>Header Component</h2>
      {isMobileHeader ? (
        <div className={`${styles.dsContainer}`}>
          <Header
            isDark={isDarkMode}
            onThemeToggle={handleThemeToggle}
            onLogout={handleLogout}
            menuItems={[
              { icon: Grid2X2, label: "Dashboard", active: true, route: "" },
              { icon: BriefcaseBusiness, label: "Products", route: "" },
              { icon: FolderHeart, label: "My Policies", route: "" },
              { icon: TrendingUp, label: "Investment", route: "" },
              { icon: FileText, label: "Claims", route: "" },
              { icon: Settings2, label: "Settings", route: "" },
              { icon: MessageSquareText, label: "Support", route: "" },
            ]}
            isLoggedIn={true}
            name="Test User"
          />
        </div>
      ) : (
        <div className={`${styles.dsContainer}`}>
          <FullHeader
            isDark={isDarkMode}
            onThemeToggle={handleThemeToggle}
            name="Olivia Rhye"
            image={""}
          />
        </div>
      )}

      <div className={`${styles.dsContainer}`}>
        <PrimaryButton
          id="success-toast-button"
          label={isMobileHeader ? "Show Desktop Header" : "Show Mobile Header"}
          isDisabled={false}
          hasIcon={false}
          onClick={() => {
            setIsMobileHeader(!isMobileHeader);
          }}
        />
      </div>
      <div className={`${styles.dsContainer}`}>
        <WebHeader isDark={isDarkMode} />
      </div>

      <h2>Toast Notifications</h2>
      <div className={`${styles.dsContainer}`}>
        <PrimaryButton
          id="success-toast-button"
          label="Show Success Toast"
          isDisabled={false}
          hasIcon={false}
          onClick={showSuccessToast}
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <SecondaryButton
          id="warning-toast-button"
          label="Show Warning Toast"
          isDisabled={false}
          hasIcon={false}
          onClick={showWarningToast}
        />
      </div>

      <div className={`${styles.dsContainer}`}>
        <DestructiveButton
          id="error-toast-button"
          label="Show Error Toast"
          isDisabled={false}
          hasIcon={false}
          onClick={showErrorToast}
        />
      </div>

      <h2>Footer</h2>
      <div className={`${styles.dsContainer}`}>
        <Footer />
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default DesignSystems;

import { useState, useEffect } from "react";
import type { TextInputProps } from "../../types/TInput.interface";
import styles from "./style.module.css";
import { Eye, EyeOff } from "lucide-react";
import { isDark } from "../../constants/data";
import global from "../../constants/global.module.css";

const PasswordInput: React.FC<TextInputProps> = ({
  id,
  label = "Input Label",
  placeholder = "Input field",
  value = "",
  onChange,
  disabled = false,
  error = false,
  feedback,
  showLabel = false,
  readOnly = false,
  isHighlighted = false,
  type = "text",
  showToggle = true,
  isNeutral = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isVisible, setIsVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    onChange?.(newVal);
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const toggleVisibility = () => {
    if (disabled) return;
    setIsVisible((prev) => !prev);
  };

  const inputType = showToggle ? (isVisible ? "text" : "password") : type;
  const hasValue = inputValue.trim() !== "";
  const showFloatingLabel = showLabel || focused || hasValue;

  const boxClass = error
    ? styles.withLabelBox
    : isNeutral
    ? isDark
      ? global.neutralBoxDark
      : showFloatingLabel
      ? global.neutralBox
      : styles.defaultBox
    : isDark
    ? showFloatingLabel
      ? global.withLabelBoxDark
      : global.defaultBoxDark
    : showFloatingLabel
    ? styles.withLabelBox
    : styles.defaultBox;

  return (
    //when fixing 100% width is what is needed
    <div
      style={{ width: "100%" }}
      className={`${styles.wrapper} ${styles.textBase}`}
    >
      <div
        className={`
          ${boxClass}
          ${error ? styles.inputBoxError : ""}
          ${isDark && error ? global.darkInputBoxError : ""}
          ${disabled ? styles.inputBoxDisabled : ""}
          ${isDark && disabled ? global.darkInputBoxDisabled : ""}
          ${!error && focused && isNeutral ? styles.neutralFocused : ""}
          ${!error && focused && !isNeutral ? styles.inputFocused : ""}
          ${hasValue ? styles.hasValue : ""}
          ${showToggle ? styles.withToggleIcon : ""}
          ${styles.textBase}
        `}
      >
        {showFloatingLabel && (
          <span
            className={`
              ${styles.insideLabel}
              ${styles.textBase}
              ${error ? styles.labelError : ""}
              ${
                isDark && disabled
                  ? global.labelGreyDark
                  : !error && isDark && hasValue && !focused
                  ? global.labelGreyDark
                  : !error && isDark
                  ? global.labelDark
                  : ""
              }
              ${
                !error &&
                (isNeutral
                  ? focused
                    ? styles.labelGreyFocused
                    : styles.labelGrey
                  : hasValue && !focused
                  ? styles.labelNormal
                  : "")
              }
            `}
          >
            {label}
          </span>
        )}

        <div style={{ width: "100%" }} className={styles.inputWrapper}>
          <input
            id={id}
            type={inputType}
            className={`
              ${styles.inputField}
              ${isNeutral ? styles.neutralInput : ""}
              ${disabled ? styles.inputFieldDisabled : ""}
              ${hasValue ? styles.hasValue : ""}
              ${!disabled && !error && isDark ? global.inputFieldDark : ""}
              ${isDark && error ? global.inputFieldErrorDark : ""}
          `}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            readOnly={readOnly}
            style={{ backgroundColor: "transparent" }}
          />

          {showToggle && (
            <button
              type="button"
              onClick={toggleVisibility}
              disabled={disabled}
              className={`
                ${styles.eyeToggleBtn}
                ${isHighlighted ? styles.highlightedIcon : ""}
                ${disabled ? styles.disabled : ""}
                ${isDark && !disabled ? global.eyeToggleBright : ""}
                ${isDark && disabled ? global.eyeToggleDarkDisabled : ""}
                  `}
              tabIndex={-1}
            >
              {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div
          className={`${styles.feedback} ${styles.textBase} ${
            error ? styles.labelError : ""
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;

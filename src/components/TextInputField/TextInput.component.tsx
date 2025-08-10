import React, { useState, useEffect, useRef } from "react";
import type { TextInputProps } from "../../types/TInput.interface";
import styles from "./style.module.css";
import global from "../../constants/global.module.css";
import { isDark } from "../../constants/data"; // 👈 assuming this is a boolean
import { Calendar, CalendarDays } from "lucide-react";

const TextInput: React.FC<TextInputProps> = ({
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
  type = "text",
  isNeutral = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
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

    // Allow only letters, numbers, spaces, and hyphens (-)
    const sanitizedValue = newVal.replace(/[^a-zA-Z0-9 @.-]/g, "");

    setInputValue(sanitizedValue);
    onChange?.(sanitizedValue);
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const inputRef = useRef<HTMLInputElement>(null);

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
    <div
      style={{ width: "100%" }}
      className={`${styles.wrapper} ${styles.textBase} `}
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
          ${hasValue ? global.hasValue : ""}
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
                !error && isDark && hasValue && !focused
                  ? global.labelGreyDark
                  : !error && isDark
                  ? global.labelDark
                  : ""
              }
              ${
                !error && isNeutral
                  ? focused
                    ? styles.labelGreyFocused
                    : styles.labelGrey
                  : !error && hasValue && !focused
                  ? styles.labelNormal
                  : ""
              }
            `}
          >
            {label}
          </span>
        )}

        <div className={styles.inputWrapper} style={{ position: "relative" }}>
          <input
            id={id}
            type={type}
            className={`
            ${styles.inputField}
            ${styles.textBase}
            ${isNeutral ? styles.neutralInput : ""}
            ${!disabled && !error && isDark ? global.inputFieldDark : ""}
            ${isDark && error ? global.inputFieldErrorDark : ""}
            ${disabled ? styles.inputFieldDisabled : ""}
            ${hasValue ? styles.hasValue : ""}
          `}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            readOnly={readOnly}
            style={{ backgroundColor: "transparent" }}
            onClick={() => {
              if (type === "date") {
                inputRef.current?.showPicker?.();
              }
            }}
            ref={inputRef}
          />
          {type === "date" && (
            <span className={styles.dateIcon}>
              <Calendar size={12} />
            </span>
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

export default TextInput;

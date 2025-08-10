import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { TextInputProps } from "../../types/TInput.interface";
import global from "../../constants/global.module.css";
import styles from "./style.module.css";
import { isDark } from "../../constants/data";

const TelephoneInput: React.FC<TextInputProps> = ({
  id,
  label = "Enter phone number",
  placeholder = "Enter phone number",
  value = "",
  onChange,
  disabled = false,
  error = false,
  feedback,
  showLabel = false,
  countryCode = "+234",
  isHighlighted = false,
  isBackground = false,
  isNeutral = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const formatPhoneNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectionStart = input.selectionStart || 0;

    const rawDigitsAfter = input.value.replace(/\D/g, "");

    const formatted = formatPhoneNumber(rawDigitsAfter);

    // Compute caret position
    let newPos = selectionStart;
    const addedChars = formatted.length - input.value.length;
    newPos += addedChars;

    setInputValue(rawDigitsAfter);
    onChange?.(rawDigitsAfter);

    requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(newPos, newPos);
    });
  };

  const displayValue = formatPhoneNumber(inputValue);
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
      className={`${styles.telephoneInputContainer} ${styles.textBase}`}
    >
      <div
        className={`
          ${boxClass}
          ${error ? styles.inputBoxError : ""}
          ${isDark && error ? global.darkInputBoxError : ""}
          ${disabled && !isDark ? styles.inputBoxDisabled : ""}
          ${isDark && disabled ? global.darkInputBoxDisabled : ""}
          ${!error && focused && isNeutral ? styles.neutralFocused : ""}
          ${!error && focused && !isNeutral ? styles.inputFocused : ""}
          ${isHighlighted ? styles.highlightedTelephoneBox : ""}
          ${isBackground ? styles.highlightedBackgroundChange : ""}
          ${hasValue ? global.hasValue : ""}
          ${styles.textBase}
        `}
        onClick={() => {
          if (!disabled) inputRef.current?.focus();
        }}
        style={{ cursor: disabled ? "not-allowed" : "text" }}
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

        <div className={`${styles.telephoneInputWrapper} ${styles.textBase}`}>
          <div
            className={`${styles.countryCodeContainer} ${styles.textBase}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span
              className={`
                ${styles.countryCode}
                ${styles.textBase}
                ${isDark && !disabled ? global.darkCountryCode : ""}
                ${isDark && disabled ? global.darkCountryCodeDisabled : ""}
              `}
            >
              {countryCode}
            </span>
            <ChevronDown
              size={16}
              className={`${styles.dropdownIcon} ${styles.textBase} ${
                isDropdownOpen ? styles.rotated : ""
              }`}
            />
          </div>

          <input
            ref={inputRef}
            id={id}
            type="tel"
            className={`
              ${styles.telephoneInput}
              ${styles.textBase}
              ${isDark && !error && !disabled ? global.darkPhoneInput : ""}
              ${isDark && error ? global.inputFieldErrorDark : ""}
              ${!disabled && !error && isDark ? global.inputFieldDark : ""}
              ${isDark && disabled ? global.darkPhoneDisabledInput : ""}
              ${disabled && !isDark ? styles.inputFieldDisabled : ""}
            `}
            placeholder={placeholder}
            value={displayValue}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            maxLength={14}
            style={{ backgroundColor: "transparent" }}
          />
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

export default TelephoneInput;

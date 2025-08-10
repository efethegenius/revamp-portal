import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";
import { ChevronDown } from "lucide-react";
import type { DropdownProps } from "../../types/TInput.interface";
import TextInput from "./TextInput.component";

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  isDark,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [otherValue, setOtherValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const showOtherInput = selected === "Others (Please specify)";
  const hasValue = selected !== "";
  const hasLabel = label?.trim() !== "";
  const isFloating = isOpen || hasValue;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (option !== "Others (Please specify)") {
      setOtherValue("");
    }
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div className={styles.dropdownContainer}>
        <div
          className={`${styles.dropdownInput} 
            ${isOpen ? styles.dropdownInputActive : ""} 
            ${!hasLabel ? styles.noLabel : ""} 
            ${isDark ? styles.dropdownInputDark : ""}`}
          onClick={toggleDropdown}
        >
          {hasLabel && (
            <label
              className={`${styles.label} ${styles.textBase} 
                ${isFloating ? styles.labelFloat : ""} 
                ${isFloating ? styles.labelActive : ""} 
                ${isDark ? styles.labelDark : ""}`}
            >
              {label}
            </label>
          )}

          <div className={styles.dropdownRow}>
            <span
              className={`${styles.selectedText} ${styles.textBase} 
                ${!hasLabel && !hasValue ? styles.placeholderText : ""} 
                ${hasLabel && isFloating ? styles.selectedTextShift : ""} 
                ${isDark ? styles.selectedTextDark : ""}`}
            >
              {selected || (!hasLabel ? label : "")}
            </span>

            <span
              className={`${styles.chevron} ${isOpen ? styles.rotate : ""} 
                ${isDark ? styles.chevronDark : ""}`}
            >
              <ChevronDown size={18} />
            </span>
          </div>
        </div>

        {isOpen && (
          <div
            className={`${styles.dropdownContent} ${
              isDark ? styles.dropdownContentDark : ""
            }`}
          >
            <ul className={styles.optionList}>
              {options.map((option) => (
                <li
                  key={option}
                  className={`${styles.optionItem} ${
                    isDark ? styles.optionItemDark : ""
                  }`}
                  onClick={() => {
                    handleSelect(option);
                    onChange?.(option);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showOtherInput && (
        <div style={{ position: "relative", marginTop: "16px", zIndex: 1 }}>
          <TextInput
            placeholder="Other reason"
            value={otherValue}
            onChange={setOtherValue}
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;

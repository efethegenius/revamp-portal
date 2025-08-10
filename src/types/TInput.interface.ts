export interface TextInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  feedback?: string;
  showLabel?: boolean;
  readOnly?: boolean;
  type?: string;
  extraClassName?: string;
  showToggle?: boolean;
  countryCode?: string;
  showCountryCode?: boolean;
  isHighlighted?: boolean;
  isBackground?: boolean;
  isNeutral?: boolean;
  variant?: "normal" | "focused" | "disabled" | "error";
}

export interface DropdownProps extends TextInputProps {
  showDropdown?: boolean;
  options: string[];
  searchable?: boolean;
  isDark: boolean;
  onChange?: (value: string) => void;
}

export interface SearchBoxProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

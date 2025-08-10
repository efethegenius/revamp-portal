// components/TextInputField/SearchBox.tsx
import React from "react";
import styles from "./style.module.css";
import { Search } from "lucide-react";

import type { SearchBoxProps } from "../../types/TInput.interface";

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search",
  value,
  onChange,
}) => {
  return (
    <div className={styles.searchBoxWrapper}>
      <Search className={styles.searchIcon} size={18} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;

export type AppContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (
    type: "success" | "error" | "warning",
    title: string,
    onAction?: () => void
  ) => void;
};

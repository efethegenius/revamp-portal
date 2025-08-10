export interface IButton {
  id: string;
  label: React.ReactNode;
  isDisabled?: boolean;
  hasIcon: boolean;
  icon?: string;
  isLoading?: boolean;
  onClick: () => void;
}

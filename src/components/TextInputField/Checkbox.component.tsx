import Form from "react-bootstrap/Form";
import styles from "./style.module.css";

type Props = {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function CheckBoxComponent({ label, checked, onChange }: Props) {
  return (
    <Form>
      <Form.Check
        type="checkbox"
        id="custom-switch"
        label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkbox}
      />
    </Form>
  );
}

export default CheckBoxComponent;

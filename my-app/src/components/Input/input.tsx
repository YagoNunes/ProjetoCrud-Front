import styles from "./Input.module.css";

type InputProps = {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ label, type = "text", value, placeholder, onChange }: InputProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

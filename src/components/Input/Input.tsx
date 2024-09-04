import styles from "./Input.module.css";

type InputProps = {
  OnChange: (newValue: string) => void;
};

export const Input = (props: InputProps) => {
  return (
    <input
      class={styles.input}
      onChange={(e) => props.OnChange(e.target.value)}
    />
  );
};

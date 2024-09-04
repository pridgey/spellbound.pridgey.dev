import styles from "./Button.module.css";

type ButtonProps = {
  children: string;
  OnClick: () => void;
};

export const Button = (props: ButtonProps) => {
  return (
    <button class={styles.button} onClick={props.OnClick}>
      {props.children}
    </button>
  );
};

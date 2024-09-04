import { JSX } from "solid-js";
import styles from "./Card.module.css";

type CardProps = {
  children: JSX.Element;
};

export const Card = (props: CardProps) => {
  return <div class={styles.card}>{props.children}</div>;
};

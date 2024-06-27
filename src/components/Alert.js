import styles from "../components/Alert.module.css";

export function Alert({ message }) {
  return (
    <div className={styles.alert}>
      <span className={styles.home}>{message}</span>
    </div>
  );
}

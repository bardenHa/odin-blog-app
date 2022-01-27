import styles from "./header.module.css";

export default function Header({
  title,
}: {
  title: string;
}): React.ReactElement {
  return (
    <section className={styles.headerSection}>
      <h1 className={styles.headerTitle}>{title}</h1>
    </section>
  );
}

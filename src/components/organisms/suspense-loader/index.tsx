import Loader from "components/atoms/loader";
import styles from "./suspense.module.css";

const SuspenseLoader = () => {
  return (
    <div className={styles.suspenseContainer}>
      <Loader suspense={true} />
    </div>
  );
};

export default SuspenseLoader;

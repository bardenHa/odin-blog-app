import { forwardRef, ComponentProps } from "react";

import styles from "./card.module.css";

export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string;
  description: string;
  icon?: string;
  callToAction: JSX.Element;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, callToAction, icon, ...rest }, ref) => {
    return (
      <div ref={ref} className={styles.card} {...rest}>
        {icon && (
          <div>
            <span className={styles.iconContainer}>
              <img src={icon} alt="Author icon" className={styles.icon} />
            </span>
          </div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          {callToAction}
        </div>
      </div>
    );
  }
);

export default Card;

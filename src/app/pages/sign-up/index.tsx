import { useEffect } from "react";
import styles from "./signup.module.css";

export default function SignUp() {
  useEffect(() => {
    document.title = "Sign up - Odin Blog";
  }, []);

  return (
    <section className={styles.formWrapper}>
      <form
        className="new_user"
        id="new_user"
        action="/"
        acceptCharset="UTF-8"
        method="post"
      >
        <input type="hidden" />
        <div className={styles.formField}>
          <label htmlFor="user_email">Email</label>
          <input
            autoFocus={true}
            autoComplete="email"
            required={true}
            type="email"
            name="user[email]"
            className={styles.emailInput}
          />
        </div>
        <div className={styles.formField}>
          <div className="flex items-center justify-between leading-none mb-1.5">
            <label className="mb-0" htmlFor="user_password">
              Password
            </label>
            <div
              className="js-password-strength-container"
              aria-live="polite"
            />
          </div>
          <input
            className="js-password-strength"
            autoComplete="off"
            required
            type="password"
            name="user[password]"
            id="user_password"
            spellCheck="false"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="user_password_confirmation">
            Password confirmation
          </label>
          <input
            autoComplete="new-password"
            required={true}
            type="password"
            name="user[password_confirmation]"
            id="user_password_confirmation"
          />
        </div>
        <div className={styles.signupButtonWrapper}>
          <button name="button" type="submit" className={styles.signupButton}>
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
}

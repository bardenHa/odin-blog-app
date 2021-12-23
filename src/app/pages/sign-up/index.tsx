import { useEffect, useState } from "react";
import styles from "./signup.module.css";
import { API_URL } from "constants/urls";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign up - Odin Blog";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      user: {
        username: formData.get("username"),
        email: formData.get("email"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        password: formData.get("password"),
      },
    };

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "cache-control": "no-cache",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
    } catch (error) {
      console.log("post error", error);
    }
  };

  return (
    <section className={styles.formWrapper}>
      <div className={styles.formHeader}>
        <h2>Sign up</h2>
        <p>
          Already have an account?
          <a href="/sign-in"> Sign in</a>.
        </p>
      </div>
      <form
        className={styles.form}
        id="new_user"
        acceptCharset="UTF-8"
        method="post"
        onSubmit={handleSubmit}
      >
        <input type="hidden" />
        <div className={styles.formField}>
          <label htmlFor="user_email">Email</label>
          <input
            autoFocus={true}
            autoComplete="email"
            required={true}
            type="email"
            name="email"
            className={styles.emailInput}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <input
            autoComplete="nickname"
            required={true}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="first_name">First Name</label>
          <input
            autoComplete="given-name"
            required={true}
            type="text"
            name="first_name"
            id="first_name"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="last_name">Last Name</label>
          <input
            autoComplete="family-name"
            required={true}
            type="text"
            name="last_name"
            id="last_name"
          />
        </div>
        <div className={styles.passwordField}>
          <label className="mb-0" htmlFor="user_password">
            Password
          </label>
          <input
            className="js-password-strength"
            autoComplete="off"
            required
            type="password"
            name="password"
            id="user_password"
            spellCheck="false"
          />
        </div>
        <div className={styles.formField}>
          <label className="mb-0" htmlFor="user_password">
            Password confirmation
          </label>
          <input
            className="js-password-strength"
            autoComplete="off"
            required
            type="password"
            name="password_confirmation"
            id="user_password_confirmation"
            spellCheck="false"
          />
        </div>
        <div className={styles.signupButtonWrapper}>
          <button name="button" type="submit" className={styles.signupButton}>
            Sign up
          </button>
        </div>
        <ErrorMessage error={error} />
      </form>
    </section>
  );
}

const ErrorMessage = ({ error }) => {
  return (
    <>
      {error && (
        <div>
          <p>Error message</p>
        </div>
      )}
    </>
  );
};

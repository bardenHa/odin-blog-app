import { useEffect } from "react";
import styles from "./signup.module.css";
import { API_URL } from "constants/urls";

export default function SignUp() {
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
        <h2 className="text-xl font-semibold md:text-2xl">Sign up</h2>
        <p className="text-secondary">
          Already have an account?
          <a className="font-medium" href="/sign-in">
            {" "}
            Sign in
          </a>
          .
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
            autoComplete="new-password"
            required={true}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="first_name">First Name</label>
          <input
            autoComplete="new-password"
            required={true}
            type="text"
            name="first_name"
            id="first_name"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="last_name">Last Name</label>
          <input
            autoComplete="new-password"
            required={true}
            type="text"
            name="last_name"
            id="last_name"
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
            name="password"
            id="user_password"
            spellCheck="false"
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

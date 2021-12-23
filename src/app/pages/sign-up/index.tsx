import { useEffect, useState } from "react";
import styles from "./signup.module.css";
import { API_URL } from "constants/urls";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
};

const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required.",
  MAX_LENGTH: "This field contains too many characters.",
  PASSWORD_CONFIRMATION: "Passwords must match.",
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  useEffect(() => {
    document.title = "Sign up - Odin Blog";
  }, []);

  const handleSubmittemp = async (event) => {
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
        onSubmit={handleSubmit(onSubmit)}
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
            {...register("email", {
              required: VALIDATION_MESSAGES.REQUIRED,
              maxLength: {
                value: 100,
                message: VALIDATION_MESSAGES.MAX_LENGTH,
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <input
            autoComplete="nickname"
            required={true}
            type="text"
            name="username"
            id="username"
            {...register("username", {
              required: VALIDATION_MESSAGES.REQUIRED,
              maxLength: {
                value: 25,
                message: VALIDATION_MESSAGES.MAX_LENGTH,
              },
            })}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="first_name">First Name</label>
          <input
            autoComplete="given-name"
            required={true}
            type="text"
            name="first_name"
            id="first_name"
            {...register("first_name", {
              required: VALIDATION_MESSAGES.REQUIRED,
              maxLength: {
                value: 25,
                message: VALIDATION_MESSAGES.MAX_LENGTH,
              },
            })}
          />
          {errors.first_name && <span>{errors.first_name.message}</span>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="last_name">Last Name</label>
          <input
            autoComplete="family-name"
            required={true}
            type="text"
            name="last_name"
            id="last_name"
            {...register("last_name", {
              required: VALIDATION_MESSAGES.REQUIRED,
              maxLength: {
                value: 25,
                message: VALIDATION_MESSAGES.MAX_LENGTH,
              },
            })}
          />
          {errors.last_name && <span>{errors.last_name.message}</span>}
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
            {...register("password", {
              required: VALIDATION_MESSAGES.REQUIRED,
              maxLength: {
                value: 150,
                message: VALIDATION_MESSAGES.MAX_LENGTH,
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
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
            {...register("password_confirmation", {
              required: VALIDATION_MESSAGES.REQUIRED,
              maxLength: {
                value: 150,
                message: VALIDATION_MESSAGES.MAX_LENGTH,
              },
              validate: {
                passwordMatch: (value) =>
                  value === getValues("password") ||
                  VALIDATION_MESSAGES.PASSWORD_CONFIRMATION,
              },
            })}
          />
          {errors.password_confirmation && (
            <span>{errors.password_confirmation.message}</span>
          )}
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

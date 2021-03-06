import { useEffect, useContext } from "react";
import styles from "./signup.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { VALIDATION_MESSAGES } from "constants/validation-messages";
import AuthContext from "components/context/AuthContext";
import Loader from "components/atoms/loader";

type Inputs = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
};

export default function SignUp() {
  const { error, loading, signUpUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      user: {
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
      },
    };

    signUpUser(formData);
  };

  useEffect(() => {
    document.title = "Sign up - Odin Blog";
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2>Sign up</h2>
          <p>
            Already have an account? <a href="/sign-in">Sign in</a>.
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
              {loading && <Loader />}
            </button>
          </div>
          {error && <ErrorMessage error={error} />}
        </form>
      </div>
    </section>
  );
}

const ErrorMessage = ({ error }) => {
  return (
    <>
      {Object.keys(error).map((field, index) => {
        return (
          <p
            className={styles.serverError}
            key={index}
          >{`${field} is ${error[field]}`}</p>
        );
      })}
    </>
  );
};

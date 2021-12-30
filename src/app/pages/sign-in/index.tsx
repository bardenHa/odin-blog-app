import { useEffect, useState, useContext } from "react";
import styles from "./signin.module.css";
import { API_URL } from "constants/urls";
import { useForm, SubmitHandler } from "react-hook-form";
import { VALIDATION_MESSAGES } from "constants/validation-messages";
import AuthContext from "components/context/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [error, setError] = useState(null);

  const { user, loading } = useContext(AuthContext);

  const authReq = () => {
    fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        console.log("auth data", data);
      })
      .catch((error) => {
        error.then((err) => {
          console.log("auth", err);
        });
      });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        setError(null);
        console.log("data", data);
      })
      .catch((error) => {
        error.then((errorObject: object) => {
          const errorMessages = errorObject[Object.keys(errorObject)[0]];
          setError(errorMessages);
        });
      });
  };

  useEffect(() => {
    document.title = "Sign in - Odin Blog";
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2>Sign in</h2>
          {user ? (
            <h3>{user}</h3>
          ) : loading ? (
            <h3>loading</h3>
          ) : (
            <h3>No user</h3>
          )}
          <p>
            Need an account? <a href="/sign-up">Sign up</a>.
          </p>
        </div>
        <form
          className={styles.form}
          id="sign_in"
          acceptCharset="UTF-8"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <div className={styles.signinButtonWrapper}>
            <button name="button" type="submit" className={styles.signinButton}>
              Sign in
            </button>
          </div>
          {error && <ErrorMessage error={error} />}
        </form>
        <div className={styles.signinButtonWrapper}>
          <button
            name="button2"
            className={styles.signinButton}
            onClick={authReq}
          >
            Auth route
          </button>
        </div>
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

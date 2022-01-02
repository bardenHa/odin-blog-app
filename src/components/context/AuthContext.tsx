import { createContext, useState, useEffect } from "react";
import { API_URL } from "constants/urls";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "constants/routes";

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (formData: object) => {
    try {
      setLoading(true);
      setError(null);
      const user = await fetch(`${API_URL}/users/login`, {
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
        .catch((error) => {
          error.then((errorObject: object) => {
            const errorMessages = errorObject[Object.keys(errorObject)[0]];
            setError(errorMessages);
          });
        });

      setUser(user);
      navigate(ROUTES.HOMEPAGE);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    try {
      await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setUser(null);
      navigate(ROUTES.HOMEPAGE);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    const user = fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          return;
        }

        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .catch((error) => {
        error.then((err) => {
          console.log("checkUserLoggedIn", err);
        });
      });

    return user;
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setRefreshing(true);
        setError(null);

        const userLoggedIn = await getUser();

        if (userLoggedIn) {
          const user = userLoggedIn;
          console.log(user);

          setUser(user);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setRefreshing(false);
    };

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshing, error, loginUser, logoutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

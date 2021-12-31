import { createContext, useState, useEffect } from "react";
import { API_URL } from "constants/urls";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //   const loginUser = async (email) => {
  //     try {
  //       await magic.auth.loginWithMagicLink({ email });
  //       setUser({ email });
  //       router.push("/");
  //     } catch (error) {
  //       setUser(null);
  //     }
  //   };

  const logoutUser = async () => {
    console.log("test");

    try {
      await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setUser(null);
      navigate("/");
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
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .catch((error) => {
        error.then((err) => {
          console.log("auth", err);
        });
      });

    return user;
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setLoading(true);

        const userLoggedIn = await getUser();

        if (userLoggedIn) {
          const user = userLoggedIn;
          setUser(user);
        }
      } catch (error) {
        console.log(error);
        setError(error);

        // logoutUser()
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

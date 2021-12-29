import { createContext, useState, useEffect } from "react";
import { API_URL } from "constants/urls";

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //   const loginUser = async (email) => {
  //     try {
  //       await magic.auth.loginWithMagicLink({ email });
  //       setUser({ email });
  //       router.push("/");
  //     } catch (error) {
  //       setUser(null);
  //     }
  //   };

  //   const logoutUser = async () => {
  //     try {
  //       await magic.user.logout();
  //       setUser(null);
  //       router.push("/");
  //     } catch (error) {}
  //   };

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

  const checkUserLoggedIn = async () => {
    try {
      setLoading(true);

      const userLoggedIn = await getUser();

      if (userLoggedIn) {
        const { email } = userLoggedIn;
        setUser(email);
      }
    } catch (error) {
      console.log(error);

      // logoutUser()
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

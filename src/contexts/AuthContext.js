import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

//initialize the state
const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

//declare the context and set initial values
const AuthContext = createContext({ ...initialState });

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

//function reducer
const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
  useEffect(() => {
    const initialize = async () => {
      try {
        const username = window.localStorage.getItem("username");

        if (username) {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: { username } },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  */

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);

    dispatch({ type: LOGIN_SUCCESS, payload: { user } });

    callback();
  };

  /*
  const logout = async (callback) => {
    const newData = {
      username: window.localStorage.getItem("username"),
      savedMovies: JSON.parse(window.localStorage.getItem("savedMovies")),
    };

    const userdata = JSON.parse(window.localStorage.getItem("userdata"));

    const newUserdata = userdata.filter(
      (item) => item.username !== newData.username
    );

    newUserdata.push(newData);

    //save the array as string in local storage
    window.localStorage.setItem("userdata", JSON.stringify(newUserdata));

    dispatch({ type: LOGOUT });
    callback();
  };*/

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

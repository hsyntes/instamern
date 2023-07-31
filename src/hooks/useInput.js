import { useReducer } from "react";
import validator from "validator";

const initialState = {
  value: "",
  isValid: null,
  isError: null,
};

const reducer = (state, action) => {
  const { type, name, payload } = action;

  switch (type) {
    case "onChange":
      switch (name) {
        case "firstname":
        case "lastname":
          return {
            value: String(
              `${payload.slice(0, 1).toUpperCase()}${payload
                .slice(1)
                .toLowerCase()
                .trim()}`
            ).replaceAll(/[0-9]/g, ""),
            isValid: payload.length >= 2 && payload.length <= 16,
          };

        case "username":
          return {
            value: payload.toLowerCase().trim(),
            isValid: payload.length >= 3 && payload.length <= 12,
          };

        case "email":
          return {
            value: payload.toLowerCase().trim(),
            isValid: validator.isEmail(payload),
          };

        case "password":
        case "current-password":
        case "password-confirm":
          return {
            value: payload.trim(),
            isValid: payload.length >= 8 && payload.length <= 24,
          };

        case "comment":
          return {
            value: payload,
            isValid: false,
          };

        case "caption":
          return {
            value: payload,
            isValid: payload.length >= 1,
          };

        case "bio":
          return {
            value: payload,
            isValid: payload.length >= 1,
          };

        case "search":
          return {
            value: payload,
            isValid: payload.length >= 1,
          };

        default:
          throw new Error(`Invalid input name: ${name}`);
      }
    case "onBlur":
      switch (name) {
        case "firstname":
        case "lastname":
        case "username":
        case "email":
        case "password":
        case "current-password":
        case "password-confirm":
          return {
            ...state,
            isError: !state.isValid,
          };

        default:
          throw new Error(`Invalid input name: ${name}`);
      }

    case "clear":
      switch (name) {
        case "comment":
          return {
            value: "",
          };

        default:
          throw new Error(`Invalid input type: ${type}`);
      }

    default:
      throw new Error(`Invalid input type: ${type}`);
  }
};

const useInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "onChange", name, payload: value });
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    dispatch({ type: "onBlur", name });
  };

  const handleClear = (e) =>
    dispatch({ type: "clear", name: "comment", value: "" });

  return { state, handleOnChange, handleOnBlur, handleClear };
};

export default useInput;

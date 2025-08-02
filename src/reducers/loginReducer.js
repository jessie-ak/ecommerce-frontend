export const loginReducer = (state, { type, payload }) => {
  switch (type) {
    case 'NAME':
        return {...state, name:payload.value};
    case "EMAIL":
      return { ...state, email: payload.value };
    case "PASSWORD":
      return { ...state, password: payload.value };
    case "AVATAR":
      return { ...state, avatar: payload.value };
    case "TOKEN":
      return { ...state, token: payload.token };
    case "LOGOUT":
      return { ...state, email: "", password: "", token: "" };
    case "REGISTER_USER":
      return { ...state, [payload.field]: payload.value };
    default:
      return state;
  }
};

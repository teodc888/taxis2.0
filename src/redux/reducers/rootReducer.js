import {
  DARK_MODE,
  AUTENTICACION,
  GET_USUARIO,
  GET_CHOFERES,
  GET_RECAUDACIONES,
} from "../actions/actionsType";

const inicialState = {
  darkMode: "dark",
  autenticacion: false,
  usuario: {},
  choferes: [],
  recaudaciones: [],
};

export default function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    case AUTENTICACION:
      return {
        ...state,
        autenticacion: action.payload,
      };
    case GET_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case GET_CHOFERES:
      return {
        ...state,
        choferes: action.payload,
      };
    case GET_RECAUDACIONES:
      return {
        ...state,
        recaudaciones: action.payload,
      };

    default:
      return state;
  }
}

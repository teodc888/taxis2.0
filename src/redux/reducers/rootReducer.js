import {
  DARK_MODE,
  AUTENTICACION,
  GET_USUARIO,
  GET_CHOFERES,
  GET_RECAUDACIONES,
  GET_CHOQUES,
  FILTRADO_NOMBRE,
  FILTRADO_TURNO,
  FILTRAR_RECAUDACION,
  FILTRAR_KILOMETROS,
} from "../actions/actionsType";

const inicialState = {
  darkMode: "dark",
  autenticacion: false,
  usuario: {},
  choferes: [],
  recaudaciones: [],
  filtroRecaudaciones: [],
  choques: [],
  filtrado: {
    nombre: "",
    total: "",
    turno: "",
    kilometros: "",
  },
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
        filtroRecaudaciones: action.payload,
      };
    case GET_CHOQUES:
      return {
        ...state,
        choques: action.payload,
      };

    case FILTRADO_NOMBRE:
      const filtroNombre = [...state.filtroRecaudaciones];

      const filtroN =
        action.payload === "todos"
          ? filtroNombre
          : filtroNombre.filter((recaudacion) => {
              return recaudacion.chofer === action.payload;
            });

      return {
        ...state,
        recaudaciones: filtroN,
        filtrado: {
          ...state.filtrado,
          nombre: action.payload,
        },
      };

    case FILTRADO_TURNO:
      const filtroTurno = [...state.filtroRecaudaciones];

      const filtroT =
        action.payload === "todos"
          ? filtroTurno
          : filtroTurno.filter((recaudacion) => {
              return recaudacion.turno === action.payload;
            });

      return {
        ...state,
        recaudaciones: filtroT,
        filtrado: {
          ...state.filtrado,
          turno: action.payload,
        },
      };

    case FILTRAR_RECAUDACION:
      const filtroRecaudacion = [...state.filtroRecaudaciones];

      const filtroR =
        action.payload === "todos"
          ? filtroRecaudacion
          : action.payload === "mayor"
          ? filtroRecaudacion.sort((a, b) => {
              return b.total - a.total;
            })
          : filtroRecaudacion.sort((a, b) => {
              return a.total - b.total;
            });

      return {
        ...state,
        recaudaciones: filtroR,
        filtrado: {
          ...state.filtrado,
          total: action.payload,
        },
      };

    case FILTRAR_KILOMETROS:
      const filtroKilometros = [...state.filtroRecaudaciones];

      const filtroK =
        action.payload === "todos"
          ? filtroKilometros
          : action.payload === "mayor"
          ? filtroKilometros.sort((a, b) => {
              return b.kilometros - a.kilometros;
            })
          : filtroKilometros.sort((a, b) => {
              return a.kilometros - b.kilometros;
            });

      return {
        ...state,
        recaudaciones: filtroK,
        filtrado: {
          ...state.filtrado,
          kilometros: action.payload,
        },
      };

    default:
      return state;
  }
}

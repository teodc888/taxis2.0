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
} from "./actionsType";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export function getChoferesFirebase(nombre) {
  return async function (dispatch) {
    try {
      const res = await getDocs(collection(db, `${nombre} chofer`));

      return dispatch({
        type: GET_CHOFERES,
        payload: res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecaudacionesFirebase(nombre) {
  return async function (dispatch) {
    try {
      const res = await getDocs(collection(db, `${nombre} recaudacion`));

      return dispatch({
        type: GET_RECAUDACIONES,
        payload: res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getChoquesFirebase(nombre) {
  return async function (dispatch) {
    try {
      const res = await getDocs(collection(db, `${nombre} choque`));

      return dispatch({
        type: GET_CHOQUES,
        payload: res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const darkModee = (payload) => {
  return {
    type: DARK_MODE,
    payload,
  };
};

export const verificarAutenticacion = (payload) => {
  return {
    type: AUTENTICACION,
    payload,
  };
};

export const getUsuario = (payload) => {
  return {
    type: GET_USUARIO,
    payload,
  };
};

export const filtradoNombre = (payload) => {
  return {
    type: FILTRADO_NOMBRE,
    payload,
  };
};

export const filtradoTurno = (payload) => {
  return {
    type: FILTRADO_TURNO,
    payload,
  };
};

export const filtrarRecaudacion = (payload) => {
  return {
    type: FILTRAR_RECAUDACION,
    payload,
  };
};

export const filtrarKilometros = (payload) => {
  return {
    type: FILTRAR_KILOMETROS,
    payload,
  };
};

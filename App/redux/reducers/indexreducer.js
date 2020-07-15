import ACTION_TYPE from "../actions/indexactions";
import { model } from "../model/reducerModel";

//APP GLOBAL INIT STATE
const initialState = {
  Envi: null,
  ServerID: 0,
  Token: "",
  FirstOpen: true,
  User: null,
  UserLocation: null,
  VisitSchedule: null,
  isLoading: false,
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_SERVER_ID:
      return { ...state, ServerID: action.value };
    case ACTION_TYPE.UPDATE_ENVI:
      return { ...state, Envi: action.value };
    case ACTION_TYPE.SET_LOADING:
      return { ...state, isLoading: action.value };
    case ACTION_TYPE.UPDATE_FIRST:
      return { ...state, FirstOpen: action.value };
    case ACTION_TYPE.UPDATE_TOKEN:
      return { ...state, Token: action.value };
    case ACTION_TYPE.UPDATE_USER:
      return { ...state, User: action.value };
    case ACTION_TYPE.UPDATE_USERLOCATION:
      return { ...state, UserLocation: action.value };
    case ACTION_TYPE.UPDATE_VISIT_SCHEDULE:
      return { ...state, VisitSchedule: action.value };
  }
  return state;
};

export default reducer;

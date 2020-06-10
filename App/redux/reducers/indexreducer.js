import ACTION_TYPE from "../actions/indexactions";
import { model } from "../model/reducerModel";

//APP GLOBAL INIT STATE
const initialState = {
  ServerID: 0,
  Token: "",
  FirstOpen: true,
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_SERVER_ID:
      return { ...state, ServerID: action.value };
    case ACTION_TYPE.UPDATE_FIRST:
      return { ...state, FirstOpen: action.value };
    case ACTION_TYPE.UPDATE_TOKEN:
      return { ...state, Token: action.value };
  }
  return state;
};

export default reducer;

import ACTION_TYPE from "../actions/indexactions";
import { model } from "../model/reducerModel";

//APP GLOBAL INIT STATE
const initialState = {
  ServerID: 0
};

//REDUCER
const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ACTION_TYPE.UPDATE_SERVER_ID:
      return { ...state, ServerID: action.value };
  }
  return state;
};

export default reducer;

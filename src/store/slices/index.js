import { combineReducers } from "redux";

import editor from "./editor";
import ingressMap from "./ingressMap";

export const reducer = combineReducers({
  editor,
  ingressMap
});

export default reducer;

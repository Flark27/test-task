import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/root-reducer";

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;

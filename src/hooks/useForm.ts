import { useContext, useSyncExternalStore } from "react";
import { FormationContext } from "../context/FormationContext";

/**
 * Using this hook will subscribe you to all values, causing it to re-render all children when values changes
 */
export function useForm() {
  const { Context, initialState, formation } = useContext(FormationContext);
  const store = useContext(Context);

  const values = useSyncExternalStore(
    store.subscribe,
    () => store.get(),
    () => initialState
  );

  return {
    values,
    initialValues: initialState,
    ...formation,
  };
}

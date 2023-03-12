import { useContext, useSyncExternalStore } from "react";
import { FormationContext } from "../context/FormationContext";

/**
 * Using this hook will subscribe you to all values, causing it to re-render all children when values changes
 */
export function useForm() {
  const { Context, initialState } = useContext(FormationContext);
  const store = useContext(Context);

  if (!store) {
    throw new Error("Store not found");
  }

  const values = useSyncExternalStore(
    store.subscribe,
    () => store.get(),
    () => initialState
  );

  return {
    values,
    initialValues: initialState,
  };
}

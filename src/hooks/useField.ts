import { useContext, useSyncExternalStore } from "react";
import { FormationContext } from "../context/FormationContext";

export function useField(name: string) {
  const { Context, initialState } = useContext(FormationContext);
  const store = useContext(Context);

  const selector = (store: any) => store[name];

  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(initialState)
  );

  const setValue = (value: any) => {
    store.set({ [name]: value });
  };

  return {
    value: state,
    setValue,
  };
}

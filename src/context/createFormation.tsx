import { createContext, ReactNode, useCallback, useRef } from "react";
import { FormationProvider } from "../providers/FormationProvider";
import { setIn } from "../utils/utils";
import { FormationContext } from "./FormationContext";

export type FormationProps = {
  children: ReactNode;
  onSubmit: (values: any) => void;
};

export type UseStoreData = {
  get: () => any;
  set: (name: string, value: any) => void;
  subscribe: (callback: () => void) => () => void;
};

export function createFormation<Store>(initialState: Store) {
  function useStoreData(): {
    get: () => Store;
    set: (name: string, value: any) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const valuesStore = useRef<any>(initialState);
    const errorsStore = useRef({});
    const touchesStore = useRef({});

    const get = useCallback(() => valuesStore.current, []);
    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((name: string, value: any) => {
      setIn(valuesStore.current, name, value);
      subscribers.current.forEach((callback) => callback());
    }, []);
    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
  const StoreContext = createContext<UseStoreDataReturnType>(null!);

  function Formation({ children, ...props }: FormationProps) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        <FormationContext.Provider
          value={{
            Context: StoreContext,
            initialState,
            formation: props,
          }}
        >
          {children}
        </FormationContext.Provider>
      </StoreContext.Provider>
    );
  }

  return {
    Formation,
  };
}

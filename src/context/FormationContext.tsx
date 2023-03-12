import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  Context,
  ReactNode,
} from "react";

export const FormationContext = createContext<{
  Context: Context<any>;
  initialState: any;
  onSubmit: (values: any) => void;
}>(null!);

export default function createFormation<Store>(initialState: Store) {
  function useStoreData(): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
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

  function Formation({
    children,
    onSubmit,
  }: {
    children: ReactNode;
    onSubmit: (values: any) => void;
  }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        <FormationContext.Provider
          value={{ Context: StoreContext, initialState, onSubmit }}
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

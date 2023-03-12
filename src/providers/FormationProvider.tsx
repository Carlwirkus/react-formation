import { FormationContext } from "../context/FormationContext";
import { Context, ReactNode, useMemo } from "react";
import { FormationProps, UseStoreData } from "../context/createFormation";

export type FormationContext = {
  Context: Context<UseStoreData>;
  initialState: any;
  formation: Omit<FormationProps, "children">;
};

export type FormationProviderProps = FormationContext & {
  children: ReactNode;
};

export function FormationProvider({
  formation,
  Context,
  initialState,
  children,
}: FormationProviderProps) {
  console.log(Context);

  return (
    <FormationContext.Provider
      value={{
        Context,
        initialState,
        formation,
      }}
    >
      {children}
    </FormationContext.Provider>
  );
}

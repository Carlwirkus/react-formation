import { FormationContext } from "../context/FormationContext";
import { useContext } from "react";

export function useFormationContext() {
  const { formation, Context } = useContext(FormationContext);
  const { get } = useContext(Context);

  const { onSubmit } = formation;

  return {
    onSubmit: () => onSubmit(get()),
  };
}

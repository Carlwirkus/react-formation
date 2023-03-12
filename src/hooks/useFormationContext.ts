import { FormationContext } from "../context/FormationContext";
import { useContext } from "react";

export function useFormationContext() {
  const { onSubmit, Context } = useContext(FormationContext);
  const { get } = useContext(Context);

  return {
    onSubmit: () => onSubmit(get()),
  };
}

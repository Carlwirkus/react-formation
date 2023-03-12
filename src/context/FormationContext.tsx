import React, { createContext } from "react";
import { FormationContext as IFormationContext } from "../providers/FormationProvider";

export const FormationContext = createContext<IFormationContext>(null!);

import { FormHTMLAttributes } from "react";
import { useFormationContext } from "../hooks/useFormationContext";

export type FormProps = Pick<
  FormHTMLAttributes<HTMLFormElement>,
  Exclude<keyof FormHTMLAttributes<HTMLFormElement>, "onReset" | "onSubmit">
>;

export function Form(props: FormProps) {
  const { onSubmit } = useFormationContext();

  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      onReset={(e) => {}}
      {...props}
    />
  );
}

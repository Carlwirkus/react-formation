import { useField } from "./hooks/useField";
import { Form } from "./components/Form";
import { useForm } from "./hooks/useForm";
import { createFormation } from "./context/createFormation";
import { useEffect, useRef, useState } from "react";

const { Formation } = createFormation({
  first: "",
  last: "",
  address: {
    street: "",
  },
});

function TextInput({ name }: { name: string }) {
  const { value, setValue } = useField(name);
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div className="field">
      {name}: <input value={value} onChange={(e) => setValue(e.target.value)} />
      <span
        style={{
          marginLeft: "1rem",
          color: "red",
        }}
      >
        Renders: {renderCount.current}
      </span>
    </div>
  );
}

const Display = ({ name }: { name: "first" | "last" }) => {
  const { value } = useField(name);
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div className="value">
      {name}: {value}
      <span
        style={{
          marginLeft: "1rem",
          color: "red",
        }}
      >
        Renders: {renderCount.current}
      </span>
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className="container">
      <h5>FormContainer</h5>
      <TextInput name="first" />
      <TextInput name="last" />
      <TextInput name="address.street" />
    </div>
  );
};

/**
 * Parent component that doesn't need to know about the form
 */
const DisplayContainer = () => {
  return (
    <div className="container">
      <h5>DisplayContainer</h5>
      <Display name="first" />
      <Display name="last" />
    </div>
  );
};

/**
 * Renders whenever values change
 */
function ContainerWithUseForm() {
  const { values } = useForm();
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <pre>{JSON.stringify(values)}</pre>
      <span
        style={{
          marginLeft: "1rem",
          color: "red",
        }}
      >
        Renders: {renderCount.current}
      </span>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <Formation
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <DisplayContainer />
          <FormContainer />
          <button type="submit">submit</button>
          <ContainerWithUseForm />
        </Form>
      </Formation>
    </div>
  );
}

export default App;

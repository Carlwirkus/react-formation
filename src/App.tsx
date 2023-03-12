import createFormation from "./context/FormationContext";
import { useField } from "./hooks/useField";
import { Form } from "./components/Form";
import { useForm } from "./hooks/useForm";

const { Formation } = createFormation({
  first: "",
  last: "",
});

function TextInput({ name }: { name: "first" | "last" }) {
  const { value, setValue } = useField(name);

  return (
    <div className="field">
      {name}: <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

const Display = ({ name }: { name: "first" | "last" }) => {
  const { value } = useField(name);
  return (
    <div className="value">
      {name}: {value}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className="container">
      <h5>FormContainer</h5>
      <TextInput name="first" />
      <TextInput name="last" />
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
  return <pre>{JSON.stringify(values)}</pre>;
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

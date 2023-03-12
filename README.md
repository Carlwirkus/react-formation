# Formation

Ideally, maintain a formik like api while only re-rendering the components that need to be re-rendered.

## Inspiration

I've been working with Formik in a B2B SaaS application and I really like the Formik API. However, there is an
issue with formik where every field is re-rendered when the values change. I recently watched a video by Jack Herrington
on how to use context with useSyncExternalStore and I wanted to try implementing that with a Formik like api.

### Credits

[Making React Context FAST! by Jack Herrington](https://www.youtube.com/watch?v=ZKlXqrcBx88)

## My Concern

I am concerned with perf as I have 2 Providers, one to store the 'state' of the form and another to avoid prop drilling
with the `StoreContext`

```tsx
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
```

# Example Usage

```tsx
const { Formation } = createFormation({
  first: "",
  last: "",
});

function FormContainer() {
  return (
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
  );
}
```

# Hooks

## `useField`

```tsx
function TextInput({ name }: { name: string }) {
  const { value, setValue } = useField(name);

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

This hook will re-render whenever the subscribed value changes

## `useForm`

```tsx
function Container() {
  const { values } = useForm();
  return <pre>{JSON.stringify(values)}</pre>;
}
```

This hook will render whenever any value changes

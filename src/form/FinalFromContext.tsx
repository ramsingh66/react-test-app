import React, { FC, useContext } from "react";
import { createForm, FormApi } from "final-form";
import { FormValues } from "./FromValues";

const onSubmit = () => {};

const form = createForm<FormValues, FormValues>({
  onSubmit,
  initialValues: { name: "", age: 1, gender: "Male" },
});

const FinalFormContext = React.createContext<FormApi<FormValues, FormValues>>(
  form
);

export const useFinalFormContext = () => useContext(FinalFormContext);

type Props = {};

export const FinalFormContextProvider: FC<Props> = ({ children }) => {
  return (
    <FinalFormContext.Provider value={form}>
      {children}
    </FinalFormContext.Provider>
  );
};

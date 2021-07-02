import React, { useCallback, useEffect, useState } from "react";
import {
  FormValues,
  useFinalFormContext,
  useFormField,
  useFormValues,
} from "../form";
import "./Functional.css";

export const Functional = () => {
  const form = useFinalFormContext();
  const [data, setData] = useState<Array<FormValues>>([]);

  useEffect(
    () =>
      form.setConfig("onSubmit", (formValues: FormValues) => {
        setData((data) => [...data, formValues]);
      }),
    [form]
  );

  const error = form.getState().errors;
  const formError = error && Object.keys(error).length;

  const { value: name, change: changeName } = useFormField("name", {
    value: true,
    dirty: true,
  });

  const { value: age, change: changeAge } = useFormField("age", {
    value: true,
    dirty: true,
  });

  const { value: gender, change: changeGender } = useFormField("gender", {
    value: true,
    dirty: true,
  });

  const handleChangeName = useCallback(
    (event: any) => {
      changeName(event.target.value);
    },
    [changeName]
  );

  const handleChangeGender = useCallback(
    (event: any) => {
    changeGender(event.target.value);
    },
    [changeGender]
  );

  const handleChangeAge = useCallback(
    (event: any) => {
      const val =Number(event.target.value)
     !Number.isNaN(val) && changeAge(val);
    },
    [changeAge]
  );

  const handleSubmit = useCallback(
    (event: any) => {
      form.submit();
      setTimeout(() => {
        form.reset();
      }, 0);
      event.preventDefault();
    },
    [form]
  );

  return (
    <>
      <label className="inputContainer" key="Name">
        Name:
        <input
          type="text"
          className="input"
          value={name}
          placeholder="name"
          onChange={handleChangeName}
        />
      </label>
      <label className="inputContainer" key="Age">
        Age:
        <input
          type="number"
          className="input"
          value={age}
          onChange={handleChangeAge}
        />
      </label>
      <label className="inputContainer" key="Gender">
        Gender:
        <select className="input" value={gender} onChange={handleChangeGender}>
          <option value={""}>Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </label>
      <button className="submit" disabled={!!formError} onClick={handleSubmit}>
        Submit
      </button>
      <ol>
        {data.map(({ name, gender }, index) => (
          <li key={index}>
            {name} {gender}
          </li>
        ))}
      </ol>
      <PP />
    </>
  );
};

const PP = () => {
  const { age } = useFormValues("age");
  return <div>{age}</div>;
};

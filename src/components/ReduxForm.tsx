import React, { useCallback, useEffect, useState } from "react";
import { subscribeToStore, dispatchAction } from "../store";
import { ActionType, Info } from "../store/types";
import "./Functional.css";

export const ReduxForm = () => {
  const [name, setName] = useState<string | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [data, setData] = useState<ReadonlyArray<Info>>([]);

  useEffect(() => {
    subscribeToStore((storeState) => {
      const { name, age, gender, record } = storeState;
      console.log(name, age, gender);
      setData(record);
      setName(name || "");
      setAge(age || 0);
      setGender(gender || "");
    });
  }, []);

  const formError = !name?.length || !age || !gender;

  const handleChangeName = useCallback((event: any) => {
    dispatchAction({ type: ActionType.SET_NAME, value: event.target.value });
  }, []);

  const handleChangeGender = useCallback((event: any) => {
    dispatchAction({ type: ActionType.SET_GENDER, value: event.target.value });
  }, []);

  const handleChangeAge = useCallback((event: any) => {
    const val = Number(event.target.value);
    !Number.isNaN(val) &&
      dispatchAction({ type: ActionType.SET_AGE, value: val });
  }, []);

  const handleSubmit = useCallback(() => {
    dispatchAction({ type: ActionType.SUBMIT });
  }, []);

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
        {data.map(({ name, age, gender }, index) => (
          <li key={index}>
            {name} {age} {gender}
          </li>
        ))}
      </ol>
    </>
  );
};

import { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { useFinalFormContext } from "./FinalFromContext";
import { FormValues } from "./FromValues";

export const useFormValues = (...fieldNames: ReadonlyArray<keyof FormValues>) => {
    const form = useFinalFormContext();
    const [formValues, setFormValues] = useState<Partial<FormValues>>(form.getState().values);

    useEffect(() => {
        const values$ = new Observable<FormValues>(subscriber => form.subscribe(({ values }) => subscriber.next(values), { values: true }));

        const subscription = values$.pipe(map(values => filterSubscribedFields(values, fieldNames))).subscribe(setFormValues)

        return () => subscription.unsubscribe();

        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [form, ...fieldNames])

    return formValues;
}

const filterSubscribedFields = (formValues: FormValues, fieldNames: ReadonlyArray<keyof FormValues>) => {
    return fieldNames.reduce((acc, key) => {
        acc[key] = formValues[key];
        return acc;
    }, {} as any);
}
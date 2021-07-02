import { FieldState, FieldSubscription, FormApi, getIn } from "final-form";
import { useEffect, useState } from "react";
import { useFinalFormContext } from "./FinalFromContext";
import { FormValues } from "./FromValues";

export const useFormField = <K extends keyof FormValues>(fieldName: K, subscription: FieldSubscription): FieldState<FormValues[K]> => {
    const form = useFinalFormContext();
    const [fieldState, setFieldState] = useState(() => form.getFieldState(fieldName));

    useEffect(() => {
        const unsubscription =
            form.registerField(
                fieldName,
                state => {
                    console.log('this is state', fieldName, state);
                    setFieldState(state)
                },
                subscription,
                {
                    validateFields: [],
                    getValidator: () => (value: FormValues[K], formValues) => {
                        const error= !!value ? undefined : 'values is invalid';
                        console.log('validating' + fieldName+ ' '+error, ' ',value);
                        return error;

                    }
                }
            );

        return () => unsubscription();
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [form, fieldName, ...subscriptionToDeps(subscription)]);

    return useFieldState(form, fieldName, fieldState);

}

function subscriptionToDeps(subscription: FieldSubscription) {
    return subscription ? Object.entries(subscription).map(([key, value]) => `${key}+${value}`) : [];
}

function useFieldState<K extends keyof FormValues>(
    form: FormApi<FormValues, FormValues>,
    fieldName: K,
    state?: FieldState<FormValues[K]>)
    : FieldState<FormValues[K]> {
    const value = state ? state.value : getIn(form.getState().values, fieldName);


    return { ...(state || {} as any), value };
}
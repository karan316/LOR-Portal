import { useState } from "react";
import { DropdownProps } from "semantic-ui-react";

export function useForm<T>(callback: any, initialState: T) {
    const [values, setValues] = useState(initialState);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onSelectChange = (
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        event.persist();
        setValues({
            ...values,
            [data.name]: data.value,
        });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await callback();
    };

    return {
        onChange,
        onSubmit,
        onSelectChange,
        values,
    };
}

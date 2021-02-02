import React from "react";
import { Field, FieldAttributes, useField } from "formik";
import { Form, Message, Select } from "semantic-ui-react";

type OptionValue = string | number;

type Option<T extends OptionValue> = {
    value: T;
    text: string;
};

type DropdownProps<T extends OptionValue> = {
    placeholder: string;
    options: Option<T>[];
    icon?: string;
} & FieldAttributes<{}>;

export function Dropdown<T extends OptionValue>({
    placeholder,
    style,
    options,
    // onChange,
    ...props
}: DropdownProps<T>) {
    const [field, meta] = useField<{}>(props);
    // get the error text from meta
    const errorText: string | undefined =
        meta.error && meta.touched ? meta.error : "";
    let output: any;
    if (!!errorText) {
        output = (
            <>
                <Form.Field
                    fluid
                    control={Select}
                    style={style}
                    {...field}
                    placeholder={placeholder}
                    error={!!errorText}
                    options={options}
                    // onChange={onChange}
                    as={Form.Select}
                />
                <Message error content={errorText} size='tiny' />
            </>
        );
    } else {
        output = (
            <Field
                fluid
                {...field}
                style={style}
                iconPosition='left'
                placeholder={placeholder}
                error={!!errorText}
                options={options}
                as={Form.Select}
            />
        );
    }
    return output;
}

import classes from './form.module.css';
import { IForm } from "../../types"
import React, { useState } from "react";

export interface IFormProps {
    handle: (item: IForm) => void;
}

export const Form: React.FC<IFormProps> = (props) => {

    const { handle } = props;

    const [form, setForm] = useState<IForm>({
        title: '',
        timezone: 0,
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handle({title: form.title, timezone: form.timezone})
    }

    // let timeout:ReturnType<typeof setTimeout>;

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {

        // window.clearTimeout(timeout)

        // timeout = setTimeout(() => {

            const { name, value } = event.target

            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));

        // }, 1000);
    }

    const timezones: number[] = [];
    for ( let i = -12; i < 13; i++ ) timezones.push(i);

    const reactFormElement = (
        <form className={ classes['form'] } onSubmit={ onSubmit }>
            <input 
                className={ classes["title"] } 
                type="text" 
                required 
                name='title' 
                onChange={ onChange }
                minLength={ 4 }
            />
            <select id="timezone-select" className={ classes["timezone"] } name='timezone' onChange={ onChange }>
                { timezones.map(i => (<option key={ `UTC${i}` } value={ i }>{ `UTC ${i > 0 ? '+' : ''}${i}` } </option>)) }
            </select>
            <button className={ classes["btn"] }>Add watch</button>
        </form>
    )


    return reactFormElement;
}

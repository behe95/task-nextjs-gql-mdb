import React from 'react'

export default function useForm(initValues) {
    const [values, setValues] = React.useState(initValues);

    const onChangeHandler = (e) => {
        console.log(e.target.value);
        setValues({
            ...values,
            [e.target.name]: e.target.value 
        })
    }
    return [values, onChangeHandler];
}

import { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { useRouter } from 'next/router';
import realtyForm from './realtyForm.module.css';

const Form = ({
    name,
    children,
    onSubmit,
}) => {


    const handleSubmit = () => {
        onSubmit();
    }

    return (
        <form name={name} onSubmit={handleSubmit}>
            {children}
        </form>
    );
}

export default Form;

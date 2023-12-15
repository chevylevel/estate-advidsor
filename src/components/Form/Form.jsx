import { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { useRouter } from 'next/router';
import realtyForm from './realtyForm.module.css';

const Form = ({
    name,
    children,
}) => {

    return (
        <form name={name} >
            {children}
        </form>
    );
}

export default Form;

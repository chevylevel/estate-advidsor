import { useContext, useEffect, useRef, useState } from 'react';

import authForm from './AuthForm.module.css';
import { Input } from '../Input/Input';
import useClickOutside from '../../hooks/useClickOutside';
import { Context } from '../../AppWrapper';

export const AuthForm = ({ onClose }) => {
    const ref = useRef();
    const googleAuthRef = useRef();

    const { store } = useContext(Context);

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const googleAuthParentElement = googleAuthRef.current;

    useClickOutside(ref, onClose);

    useEffect(
        () => {
            if (!googleAuthParentElement) {
                return;
            }

            google.accounts.id.renderButton(
                googleAuthParentElement,
                {
                    type: 'standard',
                    shape: 'pill',
                },
            );
        },
        [googleAuthParentElement],
    );

    return (
        <div
            ref={ref}
            className={authForm.AuthForm}
        >
            <div>
                Личный кабинет
            </div>

            <div style={{ margin: '40px 0 20px' }}>
                <Input
                    labelText={'email'}
                    type={'text'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div style={{ margin: '0 0 40px' }}>
                <Input
                    labelText={'Пароль'}
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button onClick={() => store.signUp(email, password)}>Зарегистрироваться</button>
                {' '}
                <button onClick={() => store.signIn({ email, password })}>Войти</button>

                <div
                    ref={googleAuthRef}
                    style={{ marginTop: '10px' }}
                ></div>
            </div>
        </div>
    );
}

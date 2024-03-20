import {
    ChangeEvent,
    MouseEvent,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';

import authForm from './AuthForm.module.css';
import { Input } from '../Input/Input';
import useClickOutside from '../../hooks/useClickOutside';
import { observer } from 'mobx-react-lite';
import { Context } from '~/src/app/Context';

const AuthForm = ({ onClose }) => {
    const { store } = useContext(Context);

    const ref = useRef<HTMLFormElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);
    const googleAuthRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    useClickOutside(ref, onClose);

    useEffect(
        () => {
            if (!googleAuthRef.current) {
                return;
            }

            google.accounts.id.renderButton(
                googleAuthRef.current,
                {
                    type: 'standard',
                    shape: 'pill',

                },
            );
        },
        [googleAuthRef.current],
    );

    const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        store.signIn({
            email: email || emailRef?.current?.value || '',
            password: password || pwdRef?.current?.value || '',
        });
    };

    const handleSignUp = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        store.signUp(
            email || emailRef?.current?.value || '',
            password || pwdRef?.current?.value || '',
        );
    };

    return (
        <form
            ref={ref}
            className={authForm.content}
        >
            <div>
                Личный кабинет
            </div>

            <div style={{ margin: '40px 0 20px' }}>
                <Input
                    ref={emailRef}
                    label={'email'}
                    type={'text'}
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget?.value)}
                />
            </div>

            <div style={{ margin: '0 0 40px' }}>
                <Input
                    ref={pwdRef}
                    label={'Пароль'}
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget?.value)}
                />
            </div>

            <div className={authForm.btn}>
                <button
                    onClick={handleSignUp}
                >
                    Зарегистрироваться
                </button>
                {' '}
                <button
                    onClick={handleSignIn}
                >
                    Войти
                </button>

                <div
                    ref={googleAuthRef}
                    className={authForm.gsiButton}
                ></div>
            </div>
        </form>
    );
}

export default observer(AuthForm);

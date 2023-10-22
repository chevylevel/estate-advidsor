import { useEffect, useRef } from 'react';
import whatsappForm from './WhatsappForm.module.css';
import { Input } from '../Input/Input';

export const WhatsappForm = ({ onClose }) => {
    const ref = useRef();

    useEffect(() => {
        const outsideClickListener = (e) => {
            const el = ref?.current;

            if (
                !el
                || el.contains(e.target)
                || el.contains(e.composedPath()[0])
            ) {
                return;
            }

            onClose();

        }

        addEventListener('mousedown', outsideClickListener);
        addEventListener('touchstart', outsideClickListener);

        return () => {
            removeEventListener('mousedown', outsideClickListener);
            removeEventListener('touchstart', outsideClickListener);
        }
    }, [ref]);

    return (
        <div
            ref={ref}
            className={whatsappForm.WhatsappForm}
        >
            <div>
                Оставьте свои контакты и мы отправим каталог по WhatsApp
            </div>

            <div style={{margin: '40px 0 20px'}}>
                <Input
                    labelText={'Ваше имя'}
                />
            </div>

            <div style={{margin: '0 0 40px'}}>
                <Input
                    labelText={'Номер телефона'}
                />
            </div>

            <button>Получить презентацию</button>
        </div>
    );
}

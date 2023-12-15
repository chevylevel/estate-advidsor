import { useEffect } from 'react';

export const useClickOutside = (ref, handler) => {
    useEffect(
        () => {
            const outsideClickListener = (e) => {
                const el = ref?.current;

                if (
                    !el
                    || el.contains(e.target)
                    || el.contains(e.composedPath()[0])
                ) {
                    return;
                }

                handler();
            }

            addEventListener('mousedown', outsideClickListener);
            addEventListener('touchstart', outsideClickListener);

            return () => {
                removeEventListener('mousedown', outsideClickListener);
                removeEventListener('touchstart', outsideClickListener);
            }
        },
        [
            ref,
            handler,
        ],

    );
}

export default useClickOutside;

import React from 'react';
import { ICoordinateMessageMenu } from '../interface/interface.client';

interface UseMessageMenu {
    open: (event: MouseEvent) => void;
    close: (event: MouseEvent) => void;
    coordinate: ICoordinateMessageMenu;
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const useMessageMenu = (li: React.MutableRefObject<HTMLLIElement | null>): UseMessageMenu => {
    const [status, setStatus] = React.useState<boolean>(false);
    const [coordinate, setCoordinate] = React.useState<ICoordinateMessageMenu>({ x: 0, y: 0 });

    const open = (event: MouseEvent): void => {
        event.preventDefault();
        setStatus(true);

        const isMyMessage: boolean = li.current?.getAttribute('data-user') === 'Вы' ? true : false;

        const clickX: number = event.clientX;
        const clickY: number = event.clientY;
        const container: HTMLElement | null | undefined = li.current?.parentElement;

        if (container) {
            const containerRect: DOMRect = container.getBoundingClientRect();
            const rectElement: DOMRect | undefined = li.current?.getBoundingClientRect();

            const distanceToRight: number = containerRect.right - clickX;
            const distanceToBottom: number = containerRect.bottom - clickY;

            if (rectElement) {
                const menuPositionY: number = clickY - rectElement.top;
                const menuPositionX: number = clickX - rectElement.left;
                setCoordinate({ x: menuPositionX, y: menuPositionY });
            }

            if (distanceToRight < 150) {
                setCoordinate((prev) => {
                    const updateX: number = prev.x - 122;

                    return {
                        x: updateX,
                        y: prev.y,
                    };
                });
            }

            if (distanceToBottom < 150) {
                console.log('Расстояние меньше 150 до низа');
                setCoordinate((prev) => {
                    const updateY: number = isMyMessage ? -90 : -30;
                    return {
                        x: prev.x,
                        y: updateY,
                    };
                });
            }
        }
    };

    const close = (event: MouseEvent): void => {
        if (li.current && !li.current.contains(event.target as Node)) {
            setStatus(false);
        }
    };

    return {
        open,
        close,
        coordinate,
        status,
        setStatus,
    };
};

export default useMessageMenu;

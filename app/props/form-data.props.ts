export type FormDataProps<E> = {
    data?: E | null;
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}
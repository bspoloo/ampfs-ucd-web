export type FormDataProps<E> = {
    data?: E | null;
    isOpen: boolean;
    onClose: () => void;
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}
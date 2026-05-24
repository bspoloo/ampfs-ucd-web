import { Dispatch, SetStateAction } from "react";

export type FormDataProps<E> = {
    data?: E | null
    setSelectedData: Dispatch<SetStateAction<E | null>>;
    isOpen: boolean;
    onClose: (state: "update" | "insert", data?: E) => void;
    onAccept: () => void;
}
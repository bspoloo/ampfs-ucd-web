export interface DataServer<E> {
    data: E | null,
    loading: boolean,
    error?: string
}
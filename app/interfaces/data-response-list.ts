export interface DataServer<E> {
    response: E | null,
    loading: boolean,
    refetch: () => Promise<void>
    error?: string
}
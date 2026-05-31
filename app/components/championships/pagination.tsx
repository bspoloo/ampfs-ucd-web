"use client";

import { Query } from "@/app/interfaces/query.interface";
import { Dispatch, SetStateAction, useState } from "react";

type PaginationProps = {
    pages: number,
    query?: Query,
    setQuery?: Dispatch<SetStateAction<Query>>
}


export default function Pagination({ pages, query, setQuery }: PaginationProps) {
    const { page: currentaPage } = query ?? {page: 0};
    const changePage = (page: number): void => {
        if (page <= 0 || page > pages) return;
        setQuery?.((prev) => ({
            ...prev,
            page,
        }))
    }

    return (
        <div className="flex justify-center items-center gap-2">
            {
                (currentaPage - 1) > 0 ?
                    <>
                        <button
                            onClick={() => changePage(currentaPage - 1)}
                            type="button" className="px-3 py-1 border border-(--border-dark) rounded hover:bg-(--hover-btn-sidebar)">
                            {"<"}
                        </button>
                        <button
                            onClick={() => changePage(currentaPage - 1)}
                            type="button" className="px-3 py-1 border border-(--border-dark) rounded hover:bg-(--hover-btn-sidebar)">
                            {currentaPage - 1}
                        </button>
                    </>
                    : null
            }

            <button
                onClick={() => changePage(currentaPage)}
                type="button" className={`px-3 py-1 border bg-(--btn-activo-sidebar) border-(--border-dark) rounded hover:bg-(--hover-btn-sidebar)`}>
                {currentaPage}
            </button>
            {
                currentaPage + 1 <= pages ?
                    <>
                        <button
                            onClick={() => changePage(currentaPage + 1)}
                            type="button" className="px-3 py-1 border border-(--border-dark) rounded hover:bg-(--hover-btn-sidebar)">
                            {currentaPage + 1}
                        </button>
                        <button
                            onClick={() => changePage(currentaPage + 1)}
                            type="button" className="px-3 py-1 border border-(--border-dark) rounded hover:bg-(--hover-btn-sidebar)">
                            {">"}
                        </button>
                    </>
                    : null
            }

        </div>
    );
}
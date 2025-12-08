"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  tag?: string;
};

const PER_PAGE = 12;

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // React Query: тягнемо нотатки
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { tag, search, page, perPage: PER_PAGE }],
    queryFn: () => fetchNotes(search, page, PER_PAGE, tag),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // при зміні пошуку — на першу сторінку
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong...</p>;

  const notes = data.notes;

  return (
    <div>
      {/* поле пошуку */}
      <SearchBox onSearchChange={handleSearchChange} />

      {/* список + пагінація */}
      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}

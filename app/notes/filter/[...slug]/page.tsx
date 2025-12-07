import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByTag = async ({ params }: Props) => {
  const { slug } = await params;

  // отримуємо тег з URL
  const tagFromUrl = slug[0];

  // якщо all → тег не передаємо
  const tag = tagFromUrl === "all" ? undefined : tagFromUrl;

  // перша сторінка, 12 нотаток, тег
  const response = await fetchNotes("", 1, 12, tag);

  return (
    <div>
      <h1>Notes list</h1>
      {response.notes.length > 0 ? (
        <NotesClient notes={response.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default NotesByTag;

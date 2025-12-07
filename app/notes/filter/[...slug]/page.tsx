// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByTag = async ({ params }: Props) => {
  const { slug } = await params;

  // перший сегмент після /notes/filter/
  const tagFromUrl = slug[0];

  // якщо all → тег бекенду не передаємо
  const tag = tagFromUrl === "all" ? undefined : tagFromUrl;

  const response = await fetchNotes("", 1, 12, tag);

  return (
    <div>
      <h1>Notes list</h1>
      {response.notes.length > 0 ? (
        <NoteList notes={response.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default NotesByTag;

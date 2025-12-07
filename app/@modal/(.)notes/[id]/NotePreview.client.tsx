"use client";

import type { Note } from "@/types/note";
import ModalNote from "@/components/ModalNote/ModalNote";

type Props = {
  note: Note;
};

const NotePreviewClient = ({ note }: Props) => {
  return (
    <ModalNote>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </ModalNote>
  );
};

export default NotePreviewClient;

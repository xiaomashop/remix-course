import { Link, useLoaderData } from "@remix-run/react";
import styles from "~/styles/note-details.css";
import { getStoredNotes } from "../data/note";

export default function NoteDetails() {
  const note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to All Notes</Link>
        </nav>
        <h1> {note.title} </h1>
      </header>
      <p className="note-details-content"> {note.content} </p>
    </main>
  )
}

export async function loader({params}) {
  const notes = await getStoredNotes();
  console.log(notes)
  const noteId = params.noteId;
  const selectedNote = notes.find(note => note.id === noteId);
  return selectedNote;
}

export function links(){
  return [
    {rel: 'stylesheet', href: styles},
  ]
}
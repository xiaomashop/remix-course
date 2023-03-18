import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, {links as newNoteLinks } from "../components/NewNote";
import NoteList, {links as noteListLinks} from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/note";

export default function NotesPage(){
    const notes = useLoaderData();
    return <main>
        <NewNote />
        <NoteList notes={notes}/>
    </main>;
}

// Server Side Codes
// loader is triggered whenever a GET request reach the route
export async function loader() {
    const notes = await getStoredNotes();
    return notes;
    // It is same to
    //return Response(JSON.stringify(notes), {headers: {"Content-Type": "application/json"}});
    //return json(notes);
}

// Server Side Codes
// action is triggered whenever a non GET request reach the route
export async function action({ request }){
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);
    noteData.id = new Date().toISOString();
    //console.log(noteData);
    const existingNotes = await getStoredNotes();
    const updateNotes = existingNotes.concat(noteData);
    await storeNotes(updateNotes);
    // return a response to redirect the user
    return redirect("/notes");
}
//surfacing link
export function links() {
    return [...newNoteLinks(), ...noteListLinks()];
}


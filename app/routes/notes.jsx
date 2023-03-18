import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, {links as newNoteLinks } from "../components/NewNote";
import NoteList, {links as noteListLinks} from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/note";

export default function NotesPage(){
    // access the return of loader
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
    if(noteData.title.trim().length<5){
        return {message: 'Invalid title - must be at least 5 characters long.'}
    }
    noteData.id = new Date().toISOString();
    //console.log(noteData);
    const existingNotes = await getStoredNotes();
    const updateNotes = existingNotes.concat(noteData);
    await storeNotes(updateNotes);
    await new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(),2000)
    });
    // return a response to redirect the user
    /*
    If we use <Form > in NewNote component, redirect will do client side routing
    instead of triggering a new request that would actually fetch a new page in the case we use <form >
    */
    return redirect("/notes");
}
//surfacing link
export function links() {
    return [...newNoteLinks(), ...noteListLinks()];
}


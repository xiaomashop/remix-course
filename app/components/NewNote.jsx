import {
  Form, 
  useNavigation, 
  useActionData }
  from '@remix-run/react';
import newNoteStyles from '~/components/NewNote.css';

export default function NewNote() {
  
  // access the return of action
  const data = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log("navigation.state: ", navigation.state )
  console.log("isSubmitting: ", isSubmitting);

  return (
    <Form method="post" id="note-form" action="/notes">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        {data?.message && <p>{data.message}</p>}
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding" : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export function links(){
    return [
      {rel: 'stylesheet', href: newNoteStyles},
    ]
  }


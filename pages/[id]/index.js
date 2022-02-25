import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Confirm, Button, Loader } from "semantic-ui-react";

const Note = ({ note }) => {
  const deleteNote = async () => {
    const NewId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${NewId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const open = () => setConfirm(true);
  const close = () => setConfirm(false);
  useEffect(() => { 
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);
  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClick={open}>Delete</Button>
          <Confirm onCancel={close} open={confirm} onConfirm={handleDelete} />
        </>
      )}
    </div>
  );
};
Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();
  return { note: data };
};

export default Note;
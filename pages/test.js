import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import "semantic-ui-css/semantic.min.css";
import { Button, Card } from "semantic-ui-react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";

function TestPage({ notes }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      <h2>
        {session ? 
        <>
          <p>{`Hello, ${session.user.email}`}</p>
         <Button onClick={()=> { signOut()
          router.push("/")

            }}>Logout</Button>
          
         </>:""}
      </h2>
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note-container">
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>

                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
TestPage.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes/");
  const { data } = await res.json();
  return { notes: data };
};

export default TestPage;

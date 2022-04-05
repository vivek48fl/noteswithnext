import Link from "next/link";
import fetch from "isomorphic-unfetch";
import "semantic-ui-css/semantic.min.css";
import { Button, Card } from "semantic-ui-react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Note from "../components/Note";

export default function Index ({notes})  {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="center">
      <div >
      <h2 className="h1">Notes app</h2>
      {session ? 
      <>
        <Button onClick={() => {
          signOut();
    
          }}>LogOut</Button>
          <Note notes={notes}/>
          </>
       : 
          <Button onClick={() => {
            signIn();
      
            }}>Login</Button>}
            </div>
              </div>)}
      
Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes/");
  const { data } = await res.json();
  return { notes: data };
};


import Link from "next/link";
import React from "react";


export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <a className="navbar-brand">Note App</a>
      </Link>
      <Link href="/new">
        <a className="create">Create Note</a>
      </Link>
    </nav>
  );
};
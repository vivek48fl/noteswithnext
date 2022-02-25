import Head from "next/head";
import Navbar from "./Navbar";

import React from 'react'

const Layout = ({children}) => {
  return (
    <>
    <Head>
        <title>Note App</title>
    </Head>
    <Navbar/>
    {children}
    </>
  )
}

export default Layout;
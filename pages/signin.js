import Link from "next/link";
import { useState, useEffect,useSession } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import mongoose from "mongoose";


export default function signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createUser();
        //alert("Success");
      } else {
        setIsSubmitting(false);
      }
    }
  });
  const validate = () => {
    let err = {};

    if (!form.email==="" || !form.email.includes("@")) {
      err.email = "email is not valid";
    }
    if (!form.password==="" || form.password.length < 8) {
      err.password = "password is  not valid";
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erros = validate();
    console.log(erros)
    setErrors(erros);
    setIsSubmitting(true);
    if(Object.keys(errors).length === 0){
        createUser();
        setIsSubmitting(false);
    }
    else{
        <h1>Errors are there</h1>
    }

  };
  const createUser = async () => {
      console.log("IN createUser()")
     
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    // aait to convert to json
    try {
        const data = await res.json();
        console.log(data);
        if(data){
       // router.push("/test")
      
       console.log(data);
        }
    } catch (error) {
        console.log(error);
       // res.status(400).json({ success: false})
       // res.status(400).json({ success: false,message: error})
        
    }
  
  };
  return (
    <>
    <h1>Registration Form</h1>
    {isSubmitting === true ? <Loader active inline="centered"/>:
      
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="email"
          placeholder="Email"
          error={
            errors.email
              ? { content: "Please enter a Email", pointing: "below" }
              : null
          }
          fluid
          name="email"
          onChange={handleChange}
          id="form-input"
        />
        <Form.Input
          label="Enter Password"
          type="password"
          autocomplete={true}
          placeholder="Enter passord"
          name="password"
          onChange={handleChange}
          error={
            errors.password
              ? { content: "Please enter password", pointing: "below" }
              : null
          }
        />
        <Button type="submit">Register</Button>
      </Form>}
    </>
  );
}

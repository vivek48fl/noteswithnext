import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const newNote = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setError] = useState({});
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const erros = validate();
    setError(erros);
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote();
        //alert("Success");
      } else {
        setIsSubmitting(false);
      }
    }
  });
  const createNote = async () => {
    try {
      const res=await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(form)
    });  
    router.push("/")
    } catch (error) {
      console.log(error);
    }
    
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };

  return (
    <div className="form-container">
      <h1>Create a new</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              fluid
              name="title"
              onChange={handleChange}
              id="form-input"
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              error={
                errors.description
                  ? {
                      content: "Please enter a description",
                      pointing: "below",
                    }
                  : null
              }
              fluid
              name="description"
              onChange={handleChange}
            />
            <Button type="submit">Create</Button>
          </Form>
        )}
      </div>
    </div>
  );
};
export default newNote;

import { useState } from "react";
import { useRef, useEffect } from "react";

import useHttp from "../hooks/use-http";
import { addComment } from "../lib/app";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const [commentText, setCommentText] = useState("");

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  const enteredCommentTextHandler = (event) => {
    console.log(event.target.value);
    setCommentText(event.target.value);
  };

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    // optional: Could validate here
    setCommentText("");
    sendRequest({ commentData: { text: commentText }, quoteId: props.quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          onChange={enteredCommentTextHandler}
          value={commentText}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;

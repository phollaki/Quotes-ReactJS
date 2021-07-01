import classes from "./NoQuotesFound.module.css";
import { Link } from "react-router-dom";

const NoQuotesFound = (props) => {
  const pageNotFound = props.text === "Page not found";
  return (
    <div className={classes.noquotes}>
      <p>{props.text}</p>
      {!pageNotFound && (
        <Link className="btn" to="/new-quote">
          Add a Quote
        </Link>
      )}
    </div>
  );
};

export default NoQuotesFound;

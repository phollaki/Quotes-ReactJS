import React, { Fragment, useEffect } from "react";
import QuoteList from "../quotes/QuoteList";
import useHttp from "../hooks/use-http";
import NoQuotesFound from "../quotes/NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";
import { getAllQuotes } from "../lib/app";
function AllQuotes() {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered focused">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound text="No quotes found" />;
  }
  return (
    <Fragment>
      <QuoteList quotes={loadedQuotes} />
    </Fragment>
  );
}

export default AllQuotes;

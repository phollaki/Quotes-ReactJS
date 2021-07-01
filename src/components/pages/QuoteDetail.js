import React, { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import { getSingleQuote } from "../lib/app";
function QuoteDetail(props) {
  const {
    sendRequest,
    data: loadedQuote,
    error,
    status,
  } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const params = useParams();
  const quoteId = params.quoteId;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }
  if (!loadedQuote.text) {
    return (
      <p>
        <NoQuotesFound text="No quote found!" />
      </p>
    );
  }
  if (!quoteId) {
    return <NoQuotesFound text="No quote found " />;
  }

  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
}

export default QuoteDetail;

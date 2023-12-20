import { useState, useCallback, useEffect } from "react";

function QuoteMachine() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const getQuote = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("https://api.quotable.io/random");
      const json = await response.json();

      setText(json.content);
      setAuthor(json.author);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  //first load API call
  useEffect(() => {
    getQuote();
  }, [getQuote]);

  {
    /*{ loading ? "fade-out" : "fade-in" }*/
  }

  return (
    <div
      className={`sm:w-[450px] w-[80vw] text-center sm:text-left text-sm flex flex-col items-center gap-4 ${
        loading ? "fade-out" : "fade-in"
      }`}
    >
      <p>{text}</p>
      <p>{author}</p>
    </div>
  );
}

export default QuoteMachine;

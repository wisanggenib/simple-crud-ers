import React, { useState } from "react";

import sendAsync from "./connector/render";

const App = () => {
  const [message, setMessage] = useState("SELECT * FROM PRODUK");
  const [response, setResponse] = useState();

  function send(sql) {
    sendAsync(sql).then((result) => setResponse(result));
  }
  return (
    <div className="App">
      <input
        type="text"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <button type="button" onClick={() => send(message)}>
        Send
      </button>
      <pre>
        {(response && JSON.stringify(response, null, 2)) ||
          "No query results yet!"}
      </pre>
    </div>
  );
};

export default App;

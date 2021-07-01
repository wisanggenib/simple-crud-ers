import React, { useState, useEffect, Fragment } from "react";

import sendAsync from "./connector/render";

const App = () => {
  const [data, setData] = useState("");
  const [response, setResponse] = useState();

  function send(sql) {
    sendAsync(sql).then((result) => setResponse(result));
  }

  useEffect(() => {
    send("SELECT * FROM PRODUK");
    console.log("Fetch");
  }, []);

  // useEffect(() => {
  //   send("SELECT * FROM PRODUK")
  //   console.log("FETCED")
  // });

  return (
    <div className="App">
      <input
        type="text"
        value={data}
        onChange={({ target: { value } }) => setData(value)}
      />
      <button type="button" onClick={() => send(`INSERT INTO PRODUK (PRODUK) VALUES ('${data}')`)}>
        Send
      </button>
      {/* <pre>
        {(response && JSON.stringify(response, null, 2)) ||
          "No query results yet!"}
      </pre> */}
      <h3>TABLE OF PRODUK</h3>
      <table>
        <thead>
          <tr>
            <th>ID PRODUK</th>
            <th>NAMA PRODUK</th>
          </tr>
        </thead>
        <tbody>
          {(response &&
            response.map((item, i) => {
              return (
                <Fragment key={item.ID}>
                  <tr>
                    <td>{item.ID}</td>
                    <td>{item.PRODUK}</td>
                  </tr>
                </Fragment>
              );
            }))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

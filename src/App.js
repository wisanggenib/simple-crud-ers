import React, { useState, useEffect, Fragment } from "react";

import sendAsync from "./connector/render";

const App = () => {
  const [data, setData] = useState("");
  const [response, setResponse] = useState();
  const [idSem, setIdSem] = useState("Data");
  const [jumlahSem, setJumlahSem] = useState(0);

  function send(sql) {
    sendAsync(sql).then((result) => setResponse(result));
  }

  const deleteData = (id) =>{
    send(`DELETE FROM PRODUK WHERE ID=${id}`);
  }

  const updateStock = (status) =>{
    if(idSem==="Data"){
      window.alert("SILAHKAN PILIH PRODUK TERLEBIH DAHULU");
      return
    }

    if(status === "TAMBAH"){
      send(`UPDATE PRODUK SET STOCK = STOCK + ${jumlahSem} WHERE ID = ${idSem}`);
    }else{
      send(`UPDATE PRODUK SET STOCK = STOCK - ${jumlahSem} WHERE ID = ${idSem}`);
    }
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
      <h3>INSER DATA PRODUK</h3>
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
      <hr />
      <h3>TABLE OF PRODUK</h3>
      <table>
        <thead>
          <tr>
            <th>ID PRODUK</th>
            <th>NAMA PRODUK</th>
            <th>JUMLAH STOCK</th>
            <th>ACTION</th>
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
                    <td>{item.STOCK}</td>
                    <td>
                      <button onClick={()=>deleteData(`${item.ID}`)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            }))}
        </tbody>
      </table>
      <hr />
      <h3>Update Data</h3>
      Pilih Produk: {" "}
      <select name="UpdateBarang" id="updateData" onChange={(e)=>setIdSem(e.target.value)} value={idSem}>
      <option>Pilih Produk</option>
      {(response &&
            response.map((item, i) => {
              return (
                <Fragment key={item.ID}>
                    <option value={item.ID}>{item.PRODUK}</option>
                </Fragment>
              );
            }))}
      </select>
      <br/>
      masukan Jumlah: {" "}
      <input type="number" min={0} value={jumlahSem} onChange={(e)=>setJumlahSem(e.target.value)}  />
      <br /><br />
      <button onClick={()=>updateStock("TAMBAH")}>Tambah</button>
      <button onClick={()=>updateStock("KURANG")}>Kurang</button>
      <br />
    </div>
  );
};

export default App;

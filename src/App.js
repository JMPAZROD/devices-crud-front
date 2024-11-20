import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

import Form from './components/Form.js';
import Grid from './components/Grid.js';

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [device_storage, setDeviceStorage] = useState("");

  const [devicesList, setDevices] = useState([]);
  const [edit, setEdit] = useState(false);

  const getDevices = async () => {
    try {
      const res = await Axios.get(`${API_URL}/devices`);
      setDevices(res.data.sort((a, b) => (a.id < b.id ? 1 : -1)));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    }
  }

  useEffect(() => {
    getDevices();
  }, [setDevices]);

  const clearFields = () => {
    setId("");
    setName("");
    setModel("");
    setDeviceStorage("");
    setEdit(false);
  } 

  return (
    <div className="container">
      <Form
        API_URL={API_URL}
        id={id}
        name={name}
        setName={setName}
        model={model}
        setModel={setModel}
        device_storage={device_storage}
        setDeviceStorage={setDeviceStorage}
        edit={edit}
        getDevices={getDevices}        
        clearFields={clearFields}
      />

      <Grid 
        API_URL={API_URL}
        setId={setId}
        setName={setName}
        setModel={setModel}
        setDeviceStorage={setDeviceStorage}
        setEdit={setEdit}
        devicesList={devicesList}
        getDevices={getDevices}
        clearFields={clearFields}
      />
    </div>
  );
}

export default App;

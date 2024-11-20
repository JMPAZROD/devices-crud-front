import { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const Form = ({
    API_URL,
    id,
    name,
    setName,
    model,
    setModel,
    device_storage,
    setDeviceStorage,
    edit,
    getDevices,
    clearFields
}) => {
    const [error, setError] = useState("");

    const updateDevice = () => {
        if (!name.trim()) {
            setError("El campo de nombre es obligatorio.");
            return;
        }
        setError("");

        Axios.put(`${API_URL}/devices/update/${id}`, {
            name: name,
            model: model,
            device_storage: device_storage
        }).then(() => {
            getDevices();
            clearFields();
            Swal.fire({
                title: "<strong>Actualización exitosa!</strong>",
                html: "<i>El dispositivo <strong>"+name+"</strong> fue actualizado con éxito!</i>",
                icon: 'success',
                timer: 3000
            })
        }).catch(function(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            });
        });
    }

    const addDevice = () => {
        if (!name.trim()) {
            setError("El campo de nombre es obligatorio.");
            return;
        }
        setError("");

        Axios.post(`${API_URL}/devices/create`, {
            name: name,
            model: model,
            device_storage: device_storage
        }).then(() => {
            getDevices();
            clearFields();
            Swal.fire({
                title: "<strong>Registro exitoso!</strong>",
                html: "<i>El dispositivo <strong>"+name+"</strong> fue registrado con éxito!</i>",
                icon: 'success',
                timer: 3000
            })
        }).catch(function(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            });
        });
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                Registro de dispositivo movil
            </div>
            <div className="card-body">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Nombre:</span>
                <input type="text" value={name} onChange={(event)=>{ setName(event.target.value); }} className="form-control" placeholder="Ingrese nombre" aria-label="Name" aria-describedby="basic-addon1"/>
            </div>
            {error && <div className="text-danger">{error}</div>}

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Modelo:</span>
                <input type="text" value={model} onChange={(event)=>{ setModel(event.target.value); }} className="form-control" placeholder="Ingrese modelo" aria-label="Model" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Almacenamiento:</span>
                <input type="text" value={device_storage} onChange={(event)=>{ setDeviceStorage(event.target.value); }} className="form-control" placeholder="Ingrese almacenamiento" aria-label="DeviceStorage" aria-describedby="basic-addon1"/>
            </div>
            </div>
            <div className="card-footer text-body-secondary">
            {
                edit ?
                <div>
                <button className='btn btn-warning m-2' onClick={updateDevice}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={clearFields}>Cancelar</button>
                </div>
                :
                <button className='btn btn-success' onClick={addDevice}>Registrar</button>
            }
            </div>
        </div>
    );
};

export default Form;
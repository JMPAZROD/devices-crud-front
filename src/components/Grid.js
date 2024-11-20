import Axios from 'axios';
import Swal from 'sweetalert2';

const Grid = ({
  API_URL,
  setId,
  setName,
  setModel,
  setDeviceStorage,
  setEdit,
  devicesList,
  getDevices,
  clearFields
}) => {
  const editDevice = (val) => {
    setEdit(true);
    setId(val.id);
    setName(val.name);
    setModel(val.model);
    setDeviceStorage(val.device_storage);
  }

  const deleteDevice = (val) => {
    Swal.fire({
      title: "<strong>Eliminar</strong>",
      html: "<i>Desea eliminar el dispositivo <strong>"+val.name+"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${API_URL}/devices/delete/${val.id}`).then(() => {
          getDevices();
          clearFields();
          Swal.fire({
            title: "Eliminado!",
            html: "Dispositivo <strong>"+val.name+"</strong> eliminado.",
            icon: "success",
            timer: 3000
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró eliminar el dispositivo!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
      }
    });
  }

  return (
    <div className="container-grid">
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Modelo</th>
          <th scope="col">Almacenamiento</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>
        {
          devicesList.map((val, key) => {
          return <tr key={val.id}>
            <td>{val.name}</td>
            <td>{val.model}</td>
            <td>{val.device_storage}</td>
            <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={()=>{ editDevice(val); }} className="btn btn-info">Editar</button>
                <button type="button" onClick={()=>{ deleteDevice(val); }} className="btn btn-danger">Eliminar</button>
              </div>
            </td>
          </tr>
          })
        }
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
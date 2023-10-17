import "./App.css";
import { useState } from "react";
import axios, * as others from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [id, setId] = useState();

  const [empleadosList, setEmpleados] = useState([]);
  const [editar, setEditar] = useState(false);

  const add = () => {
    axios
      .post("http://localhost:3001/create", {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
      })
      .then(() => {
        //getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html:
            "<i>El empleado <strong>" +
            nombre +
            "</strong> fue registrado con exito</i>",
          icon: "success",
          timer: 3000,
        });
      });
  };

  const update = () => {
    axios
      .put("http://localhost:3001/update", {
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
      })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualizacion exitosa</strong>",
          html:
            "<i>El empleado <strong>" +
            nombre +
            "</strong> fue actualizado con exito</i>",
          icon: "success",
          timer: 3000,
        });
      });
  };

  const deleteEmpleado = (val) => {
    Swal.fire({
      title: "Confirmar eliminacion?",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.nombre +
        "?</strong></i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          limpiarCampos();
          Swal.fire("Eliminado! ", val.nombre + " fue eliminado ", "success");
        });
      }
    });
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setId(val.id);
  };

  const limpiarCampos = () => {
    setNombre("");
    setPais("");
    setEdad("");
    setCargo("");
    setEditar(false);
  };

  const getEmpleados = () => {
    axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };
  getEmpleados();
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              value={nombre}
              type="text"
              className="form-control"
              placeholder="Nombre"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              value={edad}
              type="number"
              className="form-control"
              placeholder="Edad"
              aria-label="Edad"
              aria-describedby="basic-addon1"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:
            </span>
            <input
              value={pais}
              type="text"
              className="form-control"
              placeholder="Pais"
              aria-label="Pais"
              aria-describedby="basic-addon1"
              onChange={(event) => {
                setPais(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              value={cargo}
              type="text"
              className="form-control"
              placeholder="Cargo"
              aria-label="Cargo"
              aria-describedby="basic-addon1"
              onChange={(event) => {
                setCargo(event.target.value);
              }}
            />
          </div>
          {editar ? (
            <div>
              <button className="btn btn-warning m-1" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-info m-1" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteEmpleado(val);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

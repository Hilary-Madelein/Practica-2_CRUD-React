import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import { Libros, ObtenerLibro } from "../hooks/Conexion";
import mensajes from "../utilidades/Mensajes";
import Footer from "./Footer";
import RegistrarLibro from "./RegistrarLibro";
import EditarLibro from "./EditarLibro";
import { useForm } from "react-hook-form";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export const ListaLibro = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    //SHOW AGREGAR
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //SHOW EDITAR
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    //SHOW ELIMINAR
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
    const [lllibros, setLllibros] = useState(false);

    //DATOS
    const [data, setData] = useState([]);
    const [libroObtenido, setlibroObtenido] = useState([]);

    //ACCION HABILITAR EDICION CAMPOS
    const handleChange = e => {
        const { name, value } = e.target;
        setlibroObtenido((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    //ACCION OBTENER DATOS DE UN LIBRO POR ID
    const obtenerId = (id) => {
       ObtenerLibro(id).then((info) => {
            console.log(id);
            var datos = info;
            if (info.error == true) {
                mensajes(info.mensajes);
                console.log(info.error);
            } else {
                setlibroObtenido(datos);
            }
        })


    };

    //ACCION OBTENER DATOS DE TODOS LOS LIBROS
    if (!lllibros) {
        Libros().then((info) => {
            var datos = info;
            if (info.error == true) {
                mensajes(info.mensajes);
                console.log(info.error);
                //navegation("/sesion")
            } else {
                setData(datos);
                //console.log("ES NORMAL IMBECIL");
            }
            setLllibros(true);
        })
    }

    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar libro" aria-label="Search"

                                />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "red" }}><h2><b>Detalles Libros</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Agregar Libro</span>
                        </Button>
                    </div>
                </div>
                <div className="row">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titulo</th>
                                <th>Descripcion</th>
                                <th>Numero de paginas</th>
                                <th>Extracto</th>
                                <th>Fecha de publicacion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((libro) => (
                                <tr key={libro.id}>
                                    <td>{libro.id}</td>
                                    <td>{libro.title}</td>
                                    <td>{libro.description}</td>
                                    <td>{libro.pageCount}</td>
                                    <td>{libro.excerpt}</td>
                                    <td>{libro.publishDate}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>

                                            <Button variant="btn btn-outline-info btn-rounded" onClick={() => {
                                                handleShowEdit();
                                                obtenerId(libro.id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Button>

                                            <Button variant="btn btn-outline-danger btn-rounded" onClick={() => {
                                                handleShowDelete();
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Footer />
                </div>

                {/* MODAL AGREGAR LIBRO */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar libro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegistrarLibro />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* < VENTANA MODAL EDITAR> */}
                    <div className="model_box">
                        <Modal
                            show={showEdit}
                            onHide={handleCloseEdit}
                            //backdrop="static"
                            keyboard={true}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Libro</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditarLibro libroObtenido={libroObtenido} handleChange={handleChange}/>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEdit}>
                                    Cerrar
                                </Button>

                            </Modal.Footer>
                        </Modal>

                    {/* < VENTANA MODAL ELIMINAR> */}
                <div className="model_box">
                    <Modal
                        show={showDelete}
                        onHide={handleCloseDelete}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Libro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            "¿Estas seguro que desea eliminar el libro?
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary">
                                Aceptar

                            </Button>
                            <Button variant="secondary" onClick={handleCloseDelete}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default ListaLibro;
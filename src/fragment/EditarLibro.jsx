import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ActualizarLibro, GuardarLibro, Libros, ObtenerLibro } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';
import '../css/styleTxt.css';

function EditarLibro({libroObtenido, handleChange}) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();

    //CAMBIAR FORMATO FECHA
    const fechaString = libroObtenido.publishDate;

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };


    const editar = async() => {
        var datos = {
            "id": libroObtenido.id,
            "title": libroObtenido.title,
            "description": libroObtenido.description,
            "pageCount": libroObtenido.pageCount,
            "excerpt": libroObtenido.excerpt,
            "publishDate": libroObtenido.publishDate
          };
        ActualizarLibro(libroObtenido.id, datos).then((info) => {
            if (info.error === true) {
              mensajes(info.message, 'error', 'Error');
              //msgError(info.message);            
            } else {
              mensajes(info.message);
              navegation('/libros');
            }
          }
          );
    }

    return (
        <div className="wrapper">
        <div className="d-flex flex-column">
            <div className="content">
                <div className='container-fluid'>
                    <div className="col-lg-10">
                        <div className="p-5">
                            <form className="user" onSubmit={handleSubmit(()=>editar())}>
                                {/** PRESENTAR ID */}
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user" value={libroObtenido.id} readonly class="non-editable"/>
                                </div>

                                {/** INGRESAR TITULO */}
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el titulo" {...register('title', { required: true })} value={libroObtenido.title} onChange={handleChange} />
                                    {errors.title && errors.title.type === 'required' && <div className='alert alert-danger'>Ingrese un titulo</div>}
                                </div>

                                {/** INGRESAR DESCRIPCION */}
                                <div className="form-group">
                                    <input type="textarea" className="form-control form-control-user" placeholder="Ingrese una descripcion" {...register('description', { required: true })} value={libroObtenido.description} onChange={handleChange} />
                                    {errors.description && errors.description.type === 'required' && <div className='alert alert-danger'>Ingrese una descripcion</div>}
                                </div>

                                {/** INGRESAR NUMERO DE PAGINAS */}
                                <div className="form-group">
                                    <input type="number" className="form-control form-control-user" placeholder="Ingrese un numero de paginas" {...register('pageCount', { required: true })} value={libroObtenido.pageCount} onChange={handleChange} />
                                    {errors.pageCount && errors.pageCount.type === 'required' && <div className='alert alert-danger'>Ingrese un numero de paginas</div>}
                                </div>

                                {/** INGRESAR EXTRACTO */}
                                <div className="form-group">
                                    <input type="textarea" className="form-control form-control-user" placeholder="Ingrese el extracto" {...register('excerpt', { required: true })} value={libroObtenido.excerpt} onChange={handleChange} />
                                    {errors.excerpt && errors.excerpt.type === 'required' && <div className='alert alert-danger'>Ingrese el extracto</div>}
                                </div>

                                {/** INGRESAR FECHA*/}
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-user" placeholder="Ingrese la fecha de publicacion" {...register('publishDate', { required: true })} value={obtenerFechaFormateada(fechaString)} onChange={handleChange} />
                                    {errors.publishDate && errors.publishDate.type === 'required' && <div className='alert alert-danger'>Ingrese una fecha de publicacion</div>}
                                </div>

                                <hr />

                                {/** BOTÓN CANCELAR */}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <a href="/libros" className="btn btn-danger btn-rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                        <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                    </a>

                                    {/** BOTÓN EDITAR*/}
                                    <input className="btn btn-success btn-rounded" type='submit' value='Editar'></input>
                                </div>
                            </form>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}
export default EditarLibro;
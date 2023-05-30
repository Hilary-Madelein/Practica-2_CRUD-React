import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GuardarLibro, Libros } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';
import '../css/styleTxt.css';

function RegistrarLibro() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [validated, setValidated] = useState(false);
  const navegation = useNavigate();
  const [nroA, setNroA] = useState(0);

  //acciones
  // onsubmit
  Libros().then((info) => {
    var datos = info;
    if (info.error == true) {
      //borrarSesion();
      mensajes(info.mensajes);
      //navegation("/sesion")
    } else {
      setNroA(datos.length);
      console.log(nroA)
    }
  })

  const onSubmit = (data) => {

    var datos = {
      "id": nroA + 1,
      "title": data.title,
      "description": data.description,
      "pageCount": data.pageCount,
      "excerpt": data.excerpt,
      "publishDate": data.publishDate
    };
    //console.log(datos);
    GuardarLibro(datos).then((info) => {
      if (info.error === true) {
        mensajes(info.message, 'error', 'Error');
        //msgError(info.message);            
      } else {
        mensajes(info.message);
        navegation('/libros');
      }
    }
    );
  };

  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">
          <div className='container-fluid'>
            <div className="col-lg-10">
              <div className="p-5">
                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  {/** PRESENTAR ID */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" value={nroA + 1} readonly class="non-editable"/>
                  </div>

                  {/** INGRESAR TITULO */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el titulo" {...register('title', { required: true })} />
                    {errors.title && errors.title.type === 'required' && <div className='alert alert-danger'>Ingrese un titulo</div>}
                  </div>

                  {/** INGRESAR DESCRIPCION */}
                  <div className="form-group">
                    <input type="textarea" className="form-control form-control-user" placeholder="Ingrese una descripcion" {...register('description', { required: true })} />
                    {errors.description && errors.description.type === 'required' && <div className='alert alert-danger'>Ingrese una descripcion</div>}
                  </div>

                  {/** INGRESAR NUMERO DE PAGINAS */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese un numero de paginas" {...register('pageCount', { required: true })} />
                    {errors.pageCount && errors.pageCount.type === 'required' && <div className='alert alert-danger'>Ingrese un numero de paginas</div>}
                  </div>

                  {/** INGRESAR EXTRACTO */}
                  <div className="form-group">
                    <input type="textarea" className="form-control form-control-user" placeholder="Ingrese el extracto" {...register('excerpt', { required: true })} />
                    {errors.excerpt && errors.excerpt.type === 'required' && <div className='alert alert-danger'>Ingrese el extracto</div>}
                  </div>

                  {/** INGRESAR FECHA*/}
                  <div className="form-group">
                    <input type="date" className="form-control form-control-user" placeholder="Ingrese la fecha de publicacion" {...register('publishDate', { required: true })} />
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

                    {/** BOTÓN REGISTRAR */}
                    <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
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
export default RegistrarLibro;
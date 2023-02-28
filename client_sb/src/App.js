import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  //Link,
  //Outlet,

} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




import Start from './Start.js';
import Client from './Client.js';
import Login from './Login.js';
import Complaint from "./Complaint.js";
import Complaint_wr from "./Complaint_wr.js";
import Complaint_redaktion from "./Complaint_redaktion.js";
import To from "./To.js";
import To_wr from "./To_wr.js";
import To_redaktion from "./To_redaktion.js";
import Car_wr from "./Car_wr.js";
import Car_redaktion from "./Car_redaktion.js";



import './App.css';





function App() {

  const dispatch = useDispatch()
  const key = useSelector(state => state.key)
  const id_u = useSelector(state => state.id_u)
  const name_u = useSelector(state => state.name_u)
  const username_u = useSelector(state => state.username_u)
  const role_u = useSelector(state => state.role_u)

  const getKEY = (data) => {
    dispatch({ type: "KEY", payload: data })
  }
  const getID = (data) => {
    dispatch({ type: "ID", payload: data })
  }
  const getNAME = (data) => {
    dispatch({ type: "NAME", payload: data })
  }
  const getUSERNAME = (data) => {
    dispatch({ type: "USERNAME", payload: data })
  }
  const getROLE = (data) => {
    dispatch({ type: "ROLE", payload: data })
  }

  // модальное окно 
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  console.log('-----WW-----')
  console.log(key)
  console.log(id_u)
  console.log(username_u)
  console.log(name_u)
  console.log(role_u)
  console.log('------------')

  let delete_user = () => {

    handleClose1()

    let keyf = key
    getKEY('')
    getID('')
    getNAME('')
    getUSERNAME('')
    getROLE('anonim')

    //----------------------------------------
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api-sb-token/token/logout/',
      headers: {

        Authorization: keyf
      }
    }
    )
      .then(res => {
        console.log(res.data);
      });
    //----------------------------------------
    window.location.href = "/";

  }


  return (
    <>

      <header class="head">
        <div class="container text-center">
          <div class="row">
            <div class="col">
              <img src="logo_silant.jpg" alt="..." width="80" height="60" style={{ float: "left" }} />
            </div>
            <div class="col">
              Телеграмм &#128386; +7 8352-20-09
            </div>
            <div class="col" >
              {
                (role_u === 'anonim') ?
                  <a href='/login'>
                    <button class="astext1" style={{ float: "right" }}   > Авторизироваться в системе</button>
                  </a> :
                  <button class="astext1" onClick={handleShow1} style={{ float: "right" }}   > Выйти из системы</button>

              }
            </div>
          </div>
          <div>
            <h3>Электронная сервисная книжка &Prime;Мой Силант&Prime;</h3>
            {role_u}  {username_u}
          </div>
        </div>
        <span>
          <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Выход из системы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> Детальное описание : </p>
              <p > Выйти из системы и продолжить как анонимный пользователь</p>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={delete_user} style={{ background: "#163e6c" }}>
                Да
              </Button>
              <Button variant="primary" onClick={handleClose1} style={{ background: "#163e6c" }}>
                Нет
              </Button>
            </Modal.Footer>
          </Modal>
        </span>
      </header>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Start />} />
          <Route path="/client" element={<Client />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/complaint_wr" element={<Complaint_wr />} />
          <Route path="/complaint_redaktion/:id" element={<Complaint_redaktion />} />
          <Route path="/to" element={<To />} />
          <Route path="/to_wr" element={<To_wr />} />
          <Route path="/to_redaktion/:id" element={<To_redaktion />} />
          <Route path="/car_wr" element={<Car_wr />} />
          <Route path="/car_redaktion/:id" element={<Car_redaktion />} />

        </Routes>
      </BrowserRouter>

      <footer>
        <div class="foot">
          <div class="container text-center">
            <div class="row">
              <div class="col" style={{ textAlign: "left" }}>
                Телеграмм &#128386; +7 8352-20-09
              </div>
              <div class="col" style={{ textAlign: "right" }}>
                Мой Силант 2022
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}

export default App;


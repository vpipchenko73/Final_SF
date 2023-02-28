import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import BootstrapTable from 'react-bootstrap-table-next';
import ClearSearchButton from 'react-bootstrap-table-next';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import  {Search} from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Complaint_wr.css';

import ThemeProvider from 'react-bootstrap/ThemeProvider'

function Complaint_wr() {

  let [login, setLogin] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const key = useSelector(state => state.key)
  const id_u = useSelector(state => state.id_u)
  const name_u = useSelector(state => state.name_u)
  const username_u = useSelector(state => state.username_u)
  const role_u = useSelector(state => state.role_u)
  const refreshKey = useSelector(state => state.refreshKey)
  const getREFRESHKEY = (data) => {
    dispatch({ type: "REFRESHKEY", payload: data })
  }

  let [date_failure, setDate_failure] = useState('');
  let [date_recovery, setDate_recovery] = useState('');
  let [operating_time, setOperating_time] = useState(0);
  let [description_failure, setDescription_failure] = useState('');
  let [method_recovery, setMethod_recovery] = useState([]);
  let [method_recovery_id, setMethod_recovery_id] = useState('');
  let [repair_parts, setRepair_parts] = useState('');
  let [car, setCar] = useState([]);
  let [car_id, setCar_id] = useState('');
  let [node_failure, setNode_failure] = useState([]);
  let [node_failure_id, setNode_failure_id] = useState('');
  let [service_company, setService_company] = useState([]);
  let [ser_company_id, setSer_company_id] = useState('');



  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/car/',
      headers: {
        Authorization: key
      },
    })

      .then(res => {
        //console.log(res.data);
        setCar(res.data);
      });
  }, []);


  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/service_company/',
      headers: {
        Authorization: key
      },
    })

      .then(res => {
        //console.log(res.data);
        setService_company(res.data);
      });
  }, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/failure/',
      headers: {
        Authorization: key
      },
    })

      .then(res => {
        //console.log(res.data);
        setNode_failure(res.data);
      });
  }, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/recovery_method/',
      headers: {
        Authorization: key
      },
    })

      .then(res => {
        //console.log(res.data);
        setMethod_recovery(res.data);
      });
  }, []);


  let pr_date = () => {
    console.log('---------------')
    console.log(date_failure)
    console.log(date_recovery)
    console.log(operating_time)
    console.log(description_failure)
    console.log(node_failure_id)
    console.log(method_recovery_id)
    console.log(repair_parts)
    console.log(car_id)
    console.log(ser_company_id)
    console.log('---------------')

  }

  const post_date = () => {

    (async () => {
      console.log('metod_post')
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/complaint_wr/',
        headers: {

          Authorization: key
        },
        data: {
          date_failure: date_failure,
          date_recovery: date_recovery,
          operating_time: operating_time,
          description_failure: description_failure,
          method_recovery: method_recovery_id,
          repair_parts: repair_parts,
          car: car_id,
          node_failure: node_failure_id,
          service_company: ser_company_id

        },
      });
      await getREFRESHKEY(refreshKey + 1)
      await navigate("/complaint")

    })();

  }

  const return_go = () => navigate("/complaint")

  return (

    <>
      <div class="row">
        <div class="col">
          <Button class="btn btn-primary" onClick={return_go} style={{ background: "#163e6c", float: "left" }}>Назад</Button>
        </div >
        <div class="col">
          <Button onClick={post_date} style={{ background: "#163e6c", float: "right" }}>Сохранить </Button>
        </div>
      </div>
      <hr />
      <div div class="container text-center">
        <div class="row">
          <div class="col">
            <label for="floatingInput1">Дата отказа</label>
            <input type="date" class="form-control" id="floatingInput1" onChange={e => setDate_failure(e.target.value)} />
            <label for="floatingInput2">Дата восстановления</label>
            <input type="date" class="form-control" id="floatingInput2" onChange={e => setDate_recovery(e.target.value)} />
            <label for="floatingInput3">Наработка, м/час</label>
            <input class="form-control" id="floatingInput3" placeholder="Введите текущее количество, м/час" onChange={e => setOperating_time(e.target.value)} />
          </div>

          <div class="col">
            <label for="floatingInput4">Описание отказа</label>
            <input class="form-control" id="floatingInput4" placeholder="Опишите неисправность" onChange={e => setDescription_failure(e.target.value)} />
            <label for="floatingInput5">Узел отказа</label>
            <select class="form-select" id="floatingInput5" aria-label="Default select example" onChange={e => setNode_failure_id(e.target.value)} >
              <option selected>Укажите узел отказа</option>
              {
                node_failure.map(perem =>
                  //<p>{country.name}</p>
                  <option value={perem.id}>{perem.name}</option>

                )
              }
            </select>
            <label for="floatingInput6">Способ восстановления</label>
            <select class="form-select" id="floatingInput6" aria-label="Default select example" onChange={e => setMethod_recovery_id(e.target.value)}>
              <option selected>Способ восстановленя</option>
              {
                method_recovery.map(perem =>
                  //<p>{country.name}</p>
                  <option value={perem.id}>{perem.name}</option>

                )
              }
            </select>
          </div>

          <div class="col">
            <label for="floatingInput7">Используемые запчасти</label>
            <input class="form-control" id="floatingInput7" placeholder="Используемые запчасти" onChange={e => setRepair_parts(e.target.value)} />
            <label for="floatingInput8">Зав № машины</label>
            <select class="form-select" id="floatingInput8" aria-label="Default select example" onChange={e => setCar_id(e.target.value)}>
              <option selected>Укажите зав № машины</option>
              {
                car.map(perem =>
                  //<p>{country.name}</p>
                  <option value={perem.id}>{perem.car_number}</option>

                )
              }

            </select>
            <label for="floatingInput9">Сервисная компания</label>
            <select class="form-select" id="floatingInput9" aria-label="Default select example" onChange={e => setSer_company_id(e.target.value)}>
              <option selected>Укажите сервисную компанию</option>
              {
                service_company.map(perem =>
                  //<p>{country.name}</p>
                  <option value={perem.id}>{perem.name}</option>

                )
              }
            </select>
          </div>
        </div>
      </div>
      <div class="delta2"></div>
      <hr />
      {
        // <p>
        //   <Button onClick={pr_date}>Print button </Button>
        // </p>
      }

    </>
  );
}

export default Complaint_wr;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
//import { Link } from "react-router-dom";
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

import './To_wr.css';

import ThemeProvider from 'react-bootstrap/ThemeProvider'

function To_wr() {

    //let [login, setLogin] = useState('');

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

    let [date, setDate] = useState('');
    let [order_date, setOrder_date] = useState('');
    let [order_number, setOrder_number] = useState(0);
    let [operating_time, setOperating_time] = useState(0);
    let [type, setType] = useState([]);
    let [type_id, setType_id] = useState('');
    let [car, setCar] = useState([]);
    let [car_id, setCar_id] = useState('');
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
            url: 'http://127.0.0.1:8000/tip_to/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                //console.log(res.data);
                setType(res.data);
            });
    }, []);


    // let pr_date = () => { // тестовая функция
    //     console.log('---------------')
    //     console.log(date)
    //     console.log(order_date)
    //     console.log(order_number)
    //     console.log(operating_time)
    //     console.log(type_id)
    //     console.log(car_id)
    //     console.log(ser_company_id)
    //     console.log('---------------')

    // }

    const post_date = () => {
        (async () => {
            await console.log('metod_post')

            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/to_wr/',
                headers: {

                    Authorization: key
                },
                data: {

                    type: type_id,
                    date: date,
                    operating_time: operating_time,
                    order_number: order_number,
                    order_date: order_date,
                    service_company: ser_company_id,
                    car: car_id

                },

            });
            await getREFRESHKEY(refreshKey + 1)
            await navigate("/to")

        })();

    }

    const return_go = () => navigate("/to")

    return (

        <>
            <div class="row">
                <div class="col">
                    <Button class="btn btn-primary" onClick={return_go} style={{ background: "#163e6c", float: "left" }}>Назад</Button>
                </div>
                <div class="col">
                    <Button onClick={post_date} style={{ background: "#163e6c", float: "right" }}>Сохранить </Button>
                </div>
            </div>
            <hr/>
            <div div class="container text-center">
                <div class="row">
                    <div class="col">
                        <label for="floatingInput1">Дата проведения ТО</label>
                        <input type="date" class="form-control" id="floatingInput1" onChange={e => setDate(e.target.value)} />
                        <label for="floatingInput2">Дата заказ-наряда</label>
                        <input type="date" class="form-control" id="floatingInput2" onChange={e => setOrder_date(e.target.value)} />
                        <label for="floatingInput3">№ заказ-наряда</label>
                        <input class="form-control" id="floatingInput3" placeholder="Введите номер наряд-заказа ТО" onChange={e => setOrder_number(e.target.value)} />
                        <label for="floatingInput4">Наработка, м/час</label>
                        <input class="form-control" id="floatingInput4" placeholder="Введите текущее количество, м/час" onChange={e => setOperating_time(e.target.value)} />
                    </div>

                    <div class="col">
                        <label for="floatingInput5">Вид ТО</label>
                        <select class="form-select" id="floatingInput5" aria-label="Default select example" onChange={e => setType_id(e.target.value)}>
                            <option selected>Выберите вид ТО </option>
                            {
                                type.map(perem =>
                                    //<p>{country.name}</p>
                                    <option value={perem.id}>{perem.name}</option>

                                )
                            }
                        </select>
                        <label for="floatingInput6">Зав № машины</label>
                        <select class="form-select" id="floatingInput6" aria-label="Default select example" onChange={e => setCar_id(e.target.value)}>
                            <option selected>Укажите зав № машины</option>
                            {
                                car.map(perem =>
                                    //<p>{country.name}</p>
                                    <option value={perem.id}>{perem.car_number}</option>

                                )
                            }

                        </select>
                        <label for="floatingInput7">Сервисная компания</label>
                        <select class="form-select" id="floatingInput7" aria-label="Default select example" onChange={e => setSer_company_id(e.target.value)}>
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
            <hr/>
            {
            // <p>
            //     <Button onClick={pr_date}>Print button </Button>
            // </p>
            }



        </>
    );
}

export default To_wr;
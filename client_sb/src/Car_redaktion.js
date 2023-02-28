import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
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

function Car_wr() {

    let [login, setLogin] = useState('');

    const dispatch = useDispatch()
    const key = useSelector(state => state.key)
    const refreshKey = useSelector(state => state.refreshKey)
    const getREFRESHKEY = (data) => {
        dispatch({ type: "REFRESHKEY", payload: data })
    }


    const navigate = useNavigate();
    const params = useParams();

    let [car_number, setCar_number] = useState('');
    let [engine_number, setEngine_number] = useState('');
    let [transmission_number, setTransmission_number] = useState('');
    let [driving_bridge_number, setDriving_bridge_number] = useState('');
    let [controlled_bridge_number, setControlled_bridge_number] = useState('');
    let [delivery_contract, setDelivery_contract] = useState('');
    let [date_shipment, setDate_shipment] = useState('');
    let [consignee, setConsignee] = useState('');
    let [delivery_address, setDelivery_address] = useState('');
    let [equipment, setEquipment] = useState('');
    let [technic, setTechnic] = useState([]);  // вложенные поля 
    let [technic1, setTechnic1] = useState([]);
    let [technic_id, setTechnic_id] = useState([]);
    let [engine, setEngine] = useState([]);
    let [engine1, setEngine1] = useState([]);
    let [engine_id, setEngine_id] = useState('');
    let [transmission, setTransmission] = useState([]);
    let [transmission1, setTransmission1] = useState([]);
    let [transmission_id, setTransmission_id] = useState('');
    let [driving_bridge, setDriving_bridge] = useState([]);
    let [driving_bridge1, setDriving_bridge1] = useState([]);
    let [driving_bridge_id, setDriving_bridge_id] = useState('');
    let [controlled_bridge, setControlled_bridge] = useState([]);
    let [controlled_bridge1, setControlled_bridge1] = useState([]);
    let [controlled_bridge_id, setControlled_bridge_id] = useState('');
    let [client, setClient] = useState([]);
    let [client1, setClient1] = useState([]);
    let [client_id, setClient_id] = useState('');
    let [service_company, setService_company] = useState([]);
    let [service_company1, setService_company1] = useState([]);
    let [ser_company_id, setSer_company_id] = useState('');


    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/car/${params.id}/`,
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                console.log(res.data);
                setCar_number(res.data.car_number);
                setEngine_number(res.data.engine_number)
                setTransmission_number(res.data.transmission_number)
                setDriving_bridge_number(res.data.driving_bridge_number)
                setControlled_bridge_number(res.data.controlled_bridge_number)
                setDelivery_contract(res.data.delivery_contract)
                setDate_shipment(res.data.date_shipment)
                setDelivery_address(res.data.delivery_address)
                setConsignee(res.data.consignee)
                setEquipment(res.data.equipment)
                setTechnic1(res.data.technic)
                setTechnic_id(res.data.technic.id)
                setEngine1(res.data.engine)
                setEngine_id(res.data.engine.id)
                setTransmission1(res.data.transmission)
                setTransmission_id(res.data.transmission.id)
                setDriving_bridge1(res.data.driving_bridge)
                setDriving_bridge_id(res.data.driving_bridge.id)
                setControlled_bridge1(res.data.controlled_bridge)
                setControlled_bridge_id(res.data.controlled_bridge.id)
                setClient1(res.data.client)
                setClient_id(res.data.client.id)
                setService_company1(res.data.service_company)
                setSer_company_id(res.data.service_company.id)

            });
    }, []);


    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/technic/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                //console.log(res.data);
                setTechnic(res.data);
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
            url: 'http://127.0.0.1:8000/engine/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                //console.log(res.data);
                setEngine(res.data);
            });
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/transmission/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                //console.log(res.data);
                setTransmission(res.data);
            });
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/driving_bridge/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                //console.log(res.data);
                setDriving_bridge(res.data);
            });
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/controlled_bridge/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                //console.log(res.data);
                setControlled_bridge(res.data);
            });
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/users/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                //console.log(res.data);
                setClient(res.data);
            });
    }, []);


    let pr_date = () => {
        console.log('---------------')
        console.log('1' + car_number)
        console.log('2' + technic_id)
        console.log('3' + engine_id)
        console.log('4' + engine_number)
        console.log('5' + transmission_id)
        console.log('6' + transmission_number)
        console.log('7' + driving_bridge_id)
        console.log('8' + driving_bridge_number)
        console.log('9' + controlled_bridge_id)
        console.log('10' + controlled_bridge_number)
        console.log('11' + delivery_contract)
        console.log('12' + date_shipment)
        console.log('13' + consignee)
        console.log('14' + delivery_address)
        console.log('15' + equipment)
        console.log('16' + client_id)
        console.log('17' + ser_company_id)
        console.log('---------------')

    }

    const post_date = () => {
        (async () => {
            //--------------------------------------------------------------    
            await console.log('metod_post')
            //--------------------------------------------------------------
            await axios({
                method: 'put',
                url: `http://127.0.0.1:8000/car_wr/${params.id}/`, // добавить id  
                headers: {

                    Authorization: key
                },
                data: {

                    car_number: car_number,
                    technic: technic_id,
                    engine: engine_id,
                    engine_number: engine_number,
                    transmission: transmission_id,
                    transmission_number: transmission_number,
                    driving_bridge: driving_bridge_id,
                    driving_bridge_number: driving_bridge_number,
                    controlled_bridge: controlled_bridge_id,
                    controlled_bridge_number: controlled_bridge_number,
                    delivery_contract: delivery_contract,
                    date_shipment: date_shipment,
                    consignee: consignee,
                    delivery_address: delivery_address,
                    equipment: equipment,
                    client: client_id,
                    service_company: ser_company_id

                },

            });
            //----------------------------------------------
            await getREFRESHKEY(refreshKey + 1)
            //----------------------------------------------
            await navigate("/")
            //---------------------------------------------
        })();

    }

    const return_go = () => navigate("/")

    return (

        <>
            <div class="row">
                <div class="col">
                    <Button class="btn btn-primary" onClick={return_go} style={{ background: "#163e6c", float: "left" }}>На главную</Button>
                </div>
                <div class="col">
                    <Button onClick={post_date} style={{ background: "#163e6c", float: "right" }}>Сохранить </Button>
                </div>
            </div>
            <hr/>
            <div div class="container text-center">
                <div class="row">
                    <div class="col">
                        <label for="floatingInput1">Зав. № машины </label>
                        <input class="form-control" id="floatingInput1" value={car_number} onChange={e => setCar_number(e.target.value)} />
                        <label for="floatingInput2">Зав. № двигателя</label>
                        <input class="form-control" id="floatingInput2" value={engine_number} onChange={e => setEngine_number(e.target.value)} />
                        <label for="floatingInput3">Зав. № трансмиссии</label>
                        <input class="form-control" id="floatingInput3" value={transmission_number} onChange={e => setTransmission_number(e.target.value)} />
                        <label for="floatingInput4">Зав. № ведущего моста</label>
                        <input class="form-control" id="floatingInput4" value={driving_bridge_number} onChange={e => setDriving_bridge_number(e.target.value)} />
                        <label for="floatingInput5">Зав. № управляемого моста</label>
                        <input class="form-control" id="floatingInput5" value={controlled_bridge_number} onChange={e => setControlled_bridge_number(e.target.value)} />
                        <label for="floatingInput6">Договор поставки №, дата</label>
                        <input class="form-control" id="floatingInput6" value={delivery_contract} onChange={e => setDelivery_contract(e.target.value)} />

                    </div>

                    <div class="col">
                        <label for="floatingInput7">Дата отгрузки с завода</label>
                        <input type="date" class="form-control" id="floatingInput7" value={date_shipment} onChange={e => setDate_shipment(e.target.value)} />
                        <label for="floatingInput8">Грузополучатель (конечный потребитель)</label>
                        <input class="form-control" id="floatingInput8" value={consignee} onChange={e => setConsignee(e.target.value)} />
                        <label for="floatingInput9">Адрес поставки (эксплуатации) </label>
                        <input class="form-control" id="floatingInput9" value={delivery_address} onChange={e => setDelivery_address(e.target.value)} />
                        <label for="floatingInput10">Комплектация</label>
                        <input class="form-control" id="floatingInput10" value={equipment} onChange={e => setEquipment(e.target.value)} />
                        <label for="floatingInput11">Клиент</label>
                        <select class="form-select" id="floatingInput11" aria-label="Default select example" onChange={e => setClient_id(e.target.value)} >
                            <option selected value={client1.id}>{client1.username}</option>
                            {
                                client.map(perem =>

                                    (perem.groups[0] === 'client') ?
                                        (client1.id !== perem.id) ?
                                            <option value={perem.id}>{perem.username}</option> : undefined
                                        : undefined


                                )
                            }
                        </select>
                        <label for="floatingInput12">Модель техники</label>
                        <select class="form-select" id="floatingInput12" aria-label="Default select example" onChange={e => setTechnic_id(e.target.value)}>
                            <option selected value={technic1.id}>{technic1.name}</option>
                            {
                                technic.map(perem =>
                                    (technic1.id !== perem.id) &&
                                    <option value={perem.id}>{perem.name}</option>

                                )
                            }
                        </select>
                    </div>

                    <div class="col">
                        <label for="floatingInput13">Модель двигателя</label>
                        <select class="form-select" id="floatingInput13" aria-label="Default select example" onChange={e => setEngine_id(e.target.value)}>
                            <option selected value={engine1.id}>{engine1.name}</option>
                            {
                                engine.map(perem =>
                                    (engine1.id !== perem.id) &&
                                    <option value={perem.id}>{perem.name}</option>

                                )
                            }
                        </select>
                        <label for="floatingInput14">Модель трансмиссии</label>
                        <select class="form-select" id="floatingInput14" aria-label="Default select example" onChange={e => setTransmission_id(e.target.value)}>
                            <option selected value={transmission1.id}>{transmission1.name}</option>
                            {
                                transmission.map(perem =>
                                    (transmission1.id !== perem.id) &&
                                    <option value={perem.id}>{perem.name}</option>

                                )
                            }
                        </select>
                        <label for="floatingInput15">Модель ведущего моста</label>
                        <select class="form-select" id="floatingInput15" aria-label="Default select example" onChange={e => setDriving_bridge_id(e.target.value)}>
                            <option selected value={driving_bridge1.id}>{driving_bridge1.name}</option>
                            {
                                driving_bridge.map(perem =>
                                    (driving_bridge1.id !== perem.id) &&
                                    <option value={perem.id}>{perem.name}</option>

                                )
                            }
                        </select>
                        <label for="floatingInput16">Модель управляемого моста</label>
                        <select class="form-select" id="floatingInput16" aria-label="Default select example" onChange={e => setControlled_bridge_id(e.target.value)}>
                            <option selected value={controlled_bridge1.id}>{controlled_bridge1.name}</option>
                            {
                                controlled_bridge.map(perem =>
                                    (controlled_bridge1.id !== perem.id) &&
                                    <option value={perem.id}>{perem.name}</option>

                                )
                            }
                        </select>
                        <label for="floatingInput17">Сервисная компания</label>
                        <select class="form-select" id="floatingInput17" aria-label="Default select example" onChange={e => setSer_company_id(e.target.value)}>
                            <option selected value={service_company1.id}>{service_company1.name}</option>
                            {
                                service_company.map(perem =>
                                    (service_company1.id !== perem.id) &&
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

export default Car_wr;
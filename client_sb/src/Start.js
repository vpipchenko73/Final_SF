import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import BootstrapTable from 'react-bootstrap-table-next';
import ClearSearchButton from 'react-bootstrap-table-next';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import  {Search} from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
/*import './fonts/PT Astra Sans/PT-Astra-Sans_Bold.ttf';
import './fonts/PT Astra Sans/PT-Astra-Sans_Bold-Italic.ttf';
import './fonts/PT Astra Sans/PT-Astra-Sans_Italic.ttf';
import './fonts/PT Astra Sans/PT-Astra-Sans_Regular.ttf'; */



import './Start.css';


function Start() {

    // Offcanvas
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // модальное окно 1
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    // модальное окно 2
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    let urls = ''
    let columns = []

    const dispatch = useDispatch()
    const key = useSelector(state => state.key)
    const id_u = useSelector(state => state.id_u)
    const name_u = useSelector(state => state.name_u)
    const username_u = useSelector(state => state.username_u)
    const role_u = useSelector(state => state.role_u)
    const refreshKey = useSelector(state => state.refreshKey)


    let [car, setCar] = useState([]);
    let [technic, setTechnik] = useState([])

    let [modal_data, setModal_data] = useState([]);
    let [modal_name, setModal_name] = useState('');

    const navigate = useNavigate();

    //const [refreshKey, setRefreshKey] = useState(0);  // переменная для обновления страницы после удаления модели используется в функции delete_model
    const getREFRESHKEY = (data) => {
        dispatch({ type: "REFRESHKEY", payload: data })
    }

    //----------формирование URL для запроса 
    switch (role_u) {
        case 'client':
            urls = `http://127.0.0.1:8000/car_sort_user/${username_u}/`
            break;
        case 'service':
            urls = `http://127.0.0.1:8000/car_sort_service/${name_u}/`
            break;
        case 'manager':
            urls = 'http://127.0.0.1:8000/car/'
            break;
        case 'anonim':
            urls = 'http://127.0.0.1:8000/car/'
            break;
        default:

            break;
    }
    //-------------------------------------------------------   

    useEffect(() => {

        axios({
            method: 'get',
            url: urls, //'http://127.0.0.1:8000/car',
            headers: {
                //    Authorization: "Token f6a3210cd49e5b96e16bd610fa1493d1d588369c"
            },
        })

            .then(res => {
                console.log(res.data);
                setCar(res.data);
            });
    }, [refreshKey]);



    const CaptionElement = () => <h5 style={{ borderRadius: '5px', textAlign: 'center', color: '#163e6c', border: '2px solid #163e6c', padding: '0.5em' }}>
        Информация о комплектации и технических характеристеках Вашей  техники</h5>;
    const { SearchBar, ClearSearchButton } = Search;
    console.log(Search)

    // изменение дефолтных настроек поля поиска
    // Search.SearchBar.defaultProps = {
    //     placeholder: "Search+",
    //     searchText: "ххххх",
    //     srText: "Search this table+"
    // }

    //https://github.com/react-bootstrap-table/react-bootstrap-table2/blob/master/packages/react-bootstrap-table2-toolkit/README.md





    // const столбцов для неавторизованных юзеров
    if (role_u === 'anonim') {

        columns = [{
            dataField: 'id',
            text: '№ ID',
            sort: true,
            align: 'center',
            headerAlign:"center",
            // style: {
            //     fontWeight: 'bold',
            //     fontSize: '18px'
                
            //   }
            headerStyle: {width: '40px'}

            
        }, {
            dataField: 'car_number',
            text: 'Зав. № машины',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'}
        }, {
            dataField: 'technic.name',
            text: 'Модель техники',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.technic)
                    setModal_name('Модель техники')

                },
            }
        }, {
            dataField: 'engine.name',
            text: 'Модель двигателя',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.engine)
                    setModal_name('Модель двигателя')

                },
            }
        }, {
            dataField: 'engine_number',
            text: 'Зав. № двигателя',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'transmission.name',
            text: 'Модель трансмиссии',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.transmission)
                    setModal_name('Модель трансмиссии')

                },
            }
        }, {
            dataField: 'transmission_number',
            text: 'Зав. № трансмиссии',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'driving_bridge.name',
            text: 'Модель ведущего моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.driving_bridge)
                    setModal_name('Модель ведущего моста')
                },
            }
        }, {
            dataField: 'driving_bridge_number',
            text: 'Зав. № ведущего моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'controlled_bridge.name',
            text: 'Модель управляемого моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.controlled_bridge)
                    setModal_name('Модель управляемого моста')
                    //console.log("***********", row);
                },
            }
        }, {
            dataField: 'controlled_bridge_number',
            text: 'Зав. № управляемого моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }];
    }

    // const столбцов для клиентов и сервиса 
    if (role_u === 'client' || role_u === 'service') {
        columns = [{
            dataField: 'id',
            text: '№ ID',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '40px'}
            
        }, {
            dataField: 'car_number',
            text: 'Зав. № машины',
            sort: true,
            lign: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'}
        }, {
            dataField: 'technic.name',
            text: 'Модель техники',
            sort: true,
            lign: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.technic)
                    setModal_name('Модель техники')

                },
            }
        }, {
            dataField: 'engine.name',
            text: 'Модель двигателя',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.engine)
                    setModal_name('Модель двигателя')

                },
            }
        }, {
            dataField: 'engine_number',
            text: 'Зав. № двигателя',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
        }, {
            dataField: 'transmission.name',
            text: 'Модель трансмиссии',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.transmission)
                    setModal_name('Модель трансмиссии')

                },
            }
        }, {
            dataField: 'transmission_number',
            text: 'Зав. № трансмиссии',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
        }, {
            dataField: 'driving_bridge.name',
            text: 'Модель ведущего моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.driving_bridge)
                    setModal_name('Модель ведущего моста')
                },
            }
        }, {
            dataField: 'driving_bridge_number',
            text: 'Зав. № ведущего моста',
            sort: true,align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'controlled_bridge.name',
            text: 'Модель управляемого моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.controlled_bridge)
                    setModal_name('Модель управляемого моста')
                    //console.log("***********", row);
                },
            }
        }, {
            dataField: 'controlled_bridge_number',
            text: 'Зав. № управляемого моста',
            sort: true,align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'delivery_contract',
            text: 'Договор поставки №, дата',
            sort: true,align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'date_shipment',
            text: 'Дата отгрузки с завода',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'consignee',
            text: 'Грузополучатель (конечный потребитель)',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '120px'}
        }, {
            dataField: 'delivery_address',
            text: 'Адрес поставки (эксплуатации)',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'equipment',
            text: 'Комплектация (доп. опции)',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'client.username',
            text: 'Клиент',
            sort: true,align: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'}
        }, {
            dataField: 'service_company.name',
            text: 'Сервисная компания',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.service_company)
                    setModal_name('Сервисная компания')

                },
            }
        },

        ];


    }
    // const столбцов для manager
    if (role_u === 'manager') {

        columns = [{
            dataField: 'id',
            text: '№ ID',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '40px'}

        }, {
            dataField: 'car_number',
            text: 'Зав. № машины',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'},
        }, {
            dataField: 'technic.name',
            text: 'Модель техники',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.technic)
                    setModal_name('Модель техники')

                },
            }
        }, {
            dataField: 'engine.name',
            text: 'Модель двигателя',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.engine)
                    setModal_name('Модель двигателя')

                },
            }
        }, {
            dataField: 'engine_number',
            text: 'Зав. № двигателя',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'transmission.name',
            text: 'Модель трансмиссии',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.transmission)
                    setModal_name('Модель трансмиссии')

                },
            }
        }, {
            dataField: 'transmission_number',
            text: 'Зав. № трансмиссии',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'driving_bridge.name',
            text: 'Модель ведущего моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.driving_bridge)
                    setModal_name('Модель ведущего моста')
                },
            }
        }, {
            dataField: 'driving_bridge_number',
            text: 'Зав. № ведущего моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'controlled_bridge.name',
            text: 'Модель управляемого моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.controlled_bridge)
                    setModal_name('Модель управляемого моста')
                    //console.log("***********", row);
                },
            }
        }, {
            dataField: 'controlled_bridge_number',
            text: 'Зав. № управляемого моста',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'delivery_contract',
            text: 'Договор поставки №, дата',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'date_shipment',
            text: 'Дата отгрузки с завода',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'consignee',
            text: 'Грузополучатель (конечный потребитель)',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'delivery_address',
            text: 'Адрес поставки (эксплуатации)',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '120px'},
        }, {
            dataField: 'equipment',
            text: 'Комплектация (доп. опции)',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'}
        }, {
            dataField: 'client.username',
            text: 'Клиент',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'}
        }, {
            dataField: 'service_company.name',
            text: 'Сервисная компания',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.service_company)
                    setModal_name('Сервисная компания')

                },
            }
        }, {
            dataField: 'id',
            text: 'Редактировать',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '100px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext2" > ✓ </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    navigate(`car_redaktion/${row.id}`)

                },
            }
        }, {
            dataField: 'id',
            text: 'Удалить',
            sort: true,
            align: 'center',
            headerAlign:"center",
            headerStyle: {width: '60px'},
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext3" onClick={handleShow2} > ☓ </button>


                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    //setModal_data(row.service_company)
                    setModal_data({ name: row.car_number, description: row.technic.name })
                    setModal_name(row.id)


                },
            }
        }

        ];

    }
    // ----------------------------------------------------------------------------------- 


    const options = {
        page: 1,
        sizePerPage: 5,
        nextPageText: '>',
        prePageText: '<',
        showTotal: false // надпись  установки количества строк в таблице на странице не смогперебить на русский
    };

    const expandRow = {  // функция расширения строки 
        renderer: (row, rowIndex) => (
            <div>
                <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
                <p>You can render anything here, also you can add additional data on every row object</p>
                <p>expandRow.renderer callback will pass the origin row object to you</p>
            </div>
        )
    };

    // let test_click = () => { // тестовая функция
    //     //ClearSearchButton.onClick()
    //     //console.log(columns)
    //     navigate("/car_wr")

    // }

    // const print_user = () => { // тестовая функция

    //     console.log('------------')
    //     console.log(key)
    //     console.log(id_u)
    //     console.log(username_u)
    //     console.log(name_u)
    //     console.log(role_u)
    //     console.log(refreshKey)
    //     console.log('------------')
    //     console.log(modal_data)
    //     //getREFRESHKEY(refreshKey+1)  
    // }

    const delete_model = () => {
        (async () => {
            await axios({
                method: 'delete',
                url: `http://127.0.0.1:8000/car_wr/${modal_name}/`,
                headers: {

                    Authorization: key
                },
            });
            //---------------------
            await handleClose2()

            //---------------------------------------------------
            await getREFRESHKEY(refreshKey + 1)
            ///--------------------------------------------------
        })();
    }

    let complaint_go = () => navigate("/complaint")
    let to_go = () => navigate("/to")
    let car_wr_go = () => navigate("/car_wr")



    return (
        <>

            <div>
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                        <h3 style={{ textAlign: "center", color: "#163e6c" }}>
                            Проверьте комплектацию и технические характеристики техники Силант</h3>
                    </div>
                    <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2" >
                        <Button onClick={handleShow} style={{ float: "right", background: "#163e6c" }}>О программе </Button>
                    </div>
                </div>


                {
                    ((role_u === "service") || (role_u === "client")) &&
                    <div class="row">
                        <div class="col text-center">
                            <Button class="btn btn-primary" style={{ background: "#163e6c" }}
                                onClick={to_go}>Техническое обслуживание</Button>
                        </div>

                        <div class="col text-center">
                            <Button class="btn btn-primary" style={{ background: "#163e6c" }}
                                onClick={complaint_go}>Рекламации</Button>
                        </div>
                    </div>

                }
                {
                    (role_u === "manager") &&
                    <div class="row">

                        <div class="col text-center">
                            <Button class="btn btn-primary" style={{ background: "#163e6c" }}
                                onClick={car_wr_go}>Создать новую машину</Button>
                        </div>
                        <div class="col text-center">
                            <Button class="btn btn-primary" style={{ background: "#163e6c" }}
                                onClick={to_go}>Техническое обслуживание</Button>
                        </div>

                        <div class="col text-center">
                            <Button class="btn btn-primary" style={{ background: "#163e6c" }}
                                onClick={complaint_go}>Рекламации</Button>
                        </div>
                    </div>
                }



                <ToolkitProvider
                    keyField="id"
                    data={car}
                    columns={columns}
                    /*search={ { defaultSearch: 'Lena'  } }  */
                    search={{
                        afterSearch: (newResult) => {
                            console.log('++-------------++')
                            //setModal_data(newResult)
                            //setModal_name('Модель управляемого моста') 
                            if (newResult.length === 0) {

                                setModal_data({ name: "поиска", description: "в данной таблице отсутствует искомый элемент" })
                                //setModal_data ({description: "XXXXXXXXXX"})
                                setModal_name('Ошибка')

                                handleShow1()

                            }
                            //console.log(newResult) //результаты поиска 

                            console.log('++-------------++')

                        }


                    }}
                    

                >
                    {
                        props => (
                            <div>
                                <hr />
                                <SearchBar {...props.searchProps}
                                    className="custome-search-field"
                                    style={{
                                        color: '#163e6c',
                                        width: "400px",
                                        //background: 'gray',
                                        //border: 'none',
                                        border: '2px',
                                        //style={{ width: "250px", float: "right" }}

                                    }}
                                    delay={1000}
                                    placeholder="Поле поиска -> Введите предмет поиска или его часть "
                                    srText=''
                                />
                                <ClearSearchButton  {...props.searchProps}
                                    text='Отчистить'
                                    //style={{ color: "red" }}


                                />
                                <hr />
                                <BootstrapTable headerWrapperClasses="foo"
                                    {...props.baseProps}
                                    caption={<CaptionElement />}
                                    //caption="Информация о комплектации и технических характеристеках Вашей  техники"
                                    striped
                                    hover
                                    condensed
                                    pagination={paginationFactory(options)}
                                    wrapperClasses="table-responsive" // добавление скроллов
                                    rowStyle={{ color: "#163e6c", border: "2px solid #163e6c" }}
                                    //expandRow={expandRow} // офигенная функция потом изучить расширяющаяся строка

                                />
                            </div>
                        )
                    }
                </ToolkitProvider>


                <span>
                    {
                    // <Button variant="primary" onClick={handleShow1}>
                    //     Launch demo modal
                    // </Button>
                    }
                    <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                            <Modal.Title>{modal_name} - {modal_data.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> Детальное описание : </p>
                            <p > {modal_data.description}</p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                                ОК понятно
                            </Button>
                            {
                                // <Button variant="primary" onClick={handleClose1}>
                                //    Save Changes
                                // </Button>
                            }
                        </Modal.Footer>
                    </Modal>
                </span>
                <span>

                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Удалить машину ID-{modal_name} Зав.№ {modal_data.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> Детальное описание : </p>
                            <p >Модель машины - {modal_data.description}</p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={delete_model}>
                                Да удалить
                            </Button>
                            {
                                <Button variant="secondary" onClick={handleClose2}>
                                    Нет не надо
                                </Button>
                            }
                        </Modal.Footer>
                    </Modal>
                </span>
                <span>
                    <Offcanvas placement='end' show={show} onHide={handleClose} >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Сервисная книга Мой Силант</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Дипломный проект — довольно объёмное задание, исходящее из реальных потребностей
                            рынка. Это значит, что подобные задачи встретятся вам на реальных собеседованиях,
                            только в меньшем объёме. Поэтому работа над дипломом поможет вам не только
                            закрепить полученные навыки, но и стать более подготовленными к собеседованиям.
                            Не забудьте добавить проект в своё портфолио
                            сортировка таблица производится нажатием на светлый треугольник
                            при нажатии на надпись подсвеченную красным в модальном окне выводится более детальная
                            информация
                        </Offcanvas.Body>
                    </Offcanvas>
                </span>

            </div>


        </>
    );
}

export default Start;
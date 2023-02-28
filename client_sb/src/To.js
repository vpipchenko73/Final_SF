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


import './To.css';


function To() {



    let columns = []
    let urls = ''

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

    //  Переменные Модального окна 1
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //  Переменные Модального окна 2
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    let [to, setTo] = useState([]);

    let [id, setId] = useState(0)

    let [modal_data, setModal_data] = useState([]);
    let [modal_name, setModal_name] = useState('');

    //----------формирование URL для запроса 
    switch (role_u) {
        case 'client':
            urls = `http://127.0.0.1:8000/to_sort_user/${username_u}/`
            break;
        case 'service':
            urls = `http://127.0.0.1:8000/to_sort_service/${name_u}/`
            break;
        case 'manager':
            urls = 'http://127.0.0.1:8000/to/'
            break;
        default:

            break;
    }
    //-------------------------------------------------------  

    useEffect(() => {

        axios({
            method: 'get',
            url: urls, //'http://127.0.0.1:8000/to/',
            headers: {
                Authorization: key
            },
        })

            .then(res => {
                console.log(res.data);
                setTo(res.data);
            });
    }, [refreshKey]);



    const CaptionElement = () => <h5 style={{ borderRadius: '5px', textAlign: 'center', color: '#163e6c', border: '2px solid #163e6c', padding: '0.5em' }}>
        Техническое обслуживание проведенное на технике</h5>;
    const { SearchBar, ClearSearchButton } = Search;
    console.log(Search)

    //https://github.com/react-bootstrap-table/react-bootstrap-table2/blob/master/packages/react-bootstrap-table2-toolkit/README.md



    // const столбцов для сервиса и менеджера
    if (role_u === 'service' || role_u === 'client' || role_u === 'manager') {

        columns = [{
            dataField: 'id',
            text: '№ ID',
            sort: true,
            align: 'center',
            headerAlign: "center",
            headerStyle: { width: '60px' }

        }, {
            dataField: 'date',
            text: 'Дата проведения ТО',
            sort: true,
            align: 'center',
            headerAlign:"center",
            
        }, {
            dataField: 'order_number',
            text: '№ заказ-наряда',
            sort: true,
            align: 'center',
            headerAlign:"center",
            
        }, {
            dataField: 'order_date',
            text: 'Дата заказ-наряда',
            sort: true,
            align: 'center',
            headerAlign:"center",
            
        }, {
            dataField: 'type.name',
            text: 'Вид ТО',
            sort: true,
            align: 'center',
            headerAlign:"center",
            
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.type)
                    setModal_name('Вид ТО')

                },
            }
        }, {
            dataField: 'car.car_number',
            text: 'Зав. № машины',
            sort: true,
            align: 'center',
            headerAlign:"center",
        }, {
            dataField: 'car.technic.name',
            text: 'Машина',
            sort: true,
            align: 'center',
            headerAlign:"center",
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext" onClick={handleShow1}> {cell} </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data(row.car.technic)
                    setModal_name('Машина')
                    //console.log("***********", row);
                },
            }
        }, {
            dataField: 'service_company.name',
            text: 'Сервисная компания',
            sort: true,
            align: 'center',
            headerAlign:"center",
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
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext2" > ✓ </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    navigate(`/to_redaktion/${row.id}`)

                },
            }
        }, {
            dataField: 'id',
            text: 'Удалить',
            sort: true,
            align: 'center',
            headerAlign:"center",
            formatter: (cell, row, rowIndex, cellIndex, extraData) => (  // именно в таком наборе
                <div>
                    <button class="astext3" onClick={handleShow2} > ☓ </button>
                </div>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex, cell) => {    // именно в таком наборе

                    setModal_data({ name: row.order_number, description: row.car.technic.name })
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
        showTotal: false
    };


    // let test_click = () => { // тестовая функция
    //     //ClearSearchButton.onClick()
    //     console.log(columns)
    //     console.log(id)

    // }

    // const print_user = () => { // тестовая функция

    //     // console.log('------------')
    //     // console.log(key)
    //     // console.log(id_u)
    //     // console.log(name_u)
    //     // console.log(role_u)
    //     // console.log('------------')
    //     console.log(modal_data)
    // }

    const delete_to = () => {
        (async () => {
            await console.log('delete')
            await console.log(`http://127.0.0.1:8000/to_wr/${modal_name}/`)
            await axios({
                method: 'delete',
                url: `http://127.0.0.1:8000/to_wr/${modal_name}/`,
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

    const return_go = () => {
        navigate("/")
    }

    const write_to_go = () => {
        navigate("/to_wr")
    }


    return (
        <>
            <div class="row">
                <div class="col">
                    <Button class="btn btn-primary" onClick={return_go} style={{ background: "#163e6c", float: "left" }}>На главную</Button>
                </div>
                <div class="col">
                    <Button class="btn btn-primary" onClick={write_to_go} style={{ background: "#163e6c", float: "right" }}>Создать запись ТО</Button>
                </div>
            </div>
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={to}
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
                                        //color: 'red',
                                        width: "400px",
                                        //background: 'gray',
                                        //border: 'none',
                                        //style={{ width: "250px", float: "right" }}

                                    }}
                                    delay={1000}
                                    placeholder="Введите предмет поиска или его часть "
                                    srText=''
                                />
                                <ClearSearchButton  {...props.searchProps}
                                    text='Отчистить'
                                //style ={{color:"#00005c", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}


                                />
                                <hr />
                                <BootstrapTable headerWrapperClasses="foo"
                                    {...props.baseProps}
                                    caption={<CaptionElement />}
                                    striped
                                    hover
                                    condensed
                                    pagination={paginationFactory(options)}
                                    wrapperClasses="table-responsive" // добавление скроллов
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>

                {
                    // <h2>Тестовая таблица</h2>
                    // <BootstrapTable headerWrapperClasses="foo" 
                    // keyField="id" data={ car } 
                    // columns={ columns } 
                    // //caption="Название таблицы" 
                    // caption={<CaptionElement />}
                    // striped
                    // hover
                    // condensed  
                    // pagination={ paginationFactory(options) } />
                }

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

                        </Modal.Footer>
                    </Modal>
                </span>
                <span>

                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Удалить ТО № ID-{modal_name} наряд номер {modal_data.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> Детальное описание : </p>
                            <p >Модель машины - {modal_data.description}</p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={delete_to}>
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
                {
                // <Button variant="primary" class="btn btn-primary btn-lg "
                //     onClick={() => test_click()}

                // > Тестовая кнопка  </Button>
                // <p>{name_u}</p>

                // <Link to="/login">Client</Link>
                // <Button onClick={print_user} >Print Data</Button>
                }
            </div>


        </>
    );
}

export default To;
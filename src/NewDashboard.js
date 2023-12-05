import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Navbar } from 'react-bootstrap';
import Draggable from 'react-draggable';
import tableData from './tableData.json';
import { faTicket,  faChartLine,faAward, faShoePrints, faFileExcel, faCalendarTimes, faCalendar, faDashboard, faFileImage, faImages, faRegistered, faBank, faPerson, faQuestion, faCarCrash, faFolder } from '@fortawesome/free-solid-svg-icons';
import Linechart from './Linechart';
import PieChart from './Piechart';
import Layout from './Layout';
import Header from './Header';

const NewDashboard = () => {
    const { table1, table2 } = tableData;
    return (
        <div className="container-fluid">
            <Header/>
            <div className="row">
                {/* Left Navbar */}
                <div className="col-md-2 bg-light ">
                    <Navbar expand="lg" className="flex-column ">
                        <Navbar.Toggle aria-controls="basic-navbar-nav m-2" />
                        <Navbar.Collapse id="basic-navbar-nav ">
                            <Nav className="flex-column  ">
                                <Nav.Link href="/excel"> <FontAwesomeIcon className="navicons" title="Excel Upload" icon={faFileExcel} />&nbsp;<b>Excel Upload</b></Nav.Link>
                                <Nav.Link href="/date"><FontAwesomeIcon className="navicons" title="Date Picker" icon={faCalendarTimes} />&nbsp;<b>Date Picker</b></Nav.Link>
                                <Nav.Link href="/adddate"><FontAwesomeIcon className="navicons" title="Add Date" icon={faCalendar} />&nbsp;<b>Add Date</b></Nav.Link>
                                <Nav.Link href="/dash"><FontAwesomeIcon className="navicons" title="Dashboard" icon={faDashboard} />&nbsp;<b> My Dashboard</b></Nav.Link>
                                <Nav.Link href="/image_upload"><FontAwesomeIcon className="navicons" title="Image upload" icon={faFileImage} />&nbsp;<b> Image upload</b></Nav.Link>
                                <Nav.Link href="/image_crop"><FontAwesomeIcon className="navicons" title="Image Cropping" icon={faImages} />&nbsp;<b> Image Cropping</b></Nav.Link>
                                <Nav.Link href="/Que_ans"><FontAwesomeIcon className="navicons" title="Dynamic Q/A" icon={faQuestion} />&nbsp;<b>Dynamic Q/A </b></Nav.Link>
                                <Nav.Link href="/employ_form"><FontAwesomeIcon className="navicons" title="Employee form" icon={faPerson} />&nbsp;<b> Employee form</b></Nav.Link>
                                <Nav.Link href="/bank_system"><FontAwesomeIcon className="navicons" title="bank System" icon={faBank} />&nbsp;<b> Bank System</b></Nav.Link>
                                <Nav.Link href="/register"> <FontAwesomeIcon className="navicons" title="Register" icon={faRegistered} />&nbsp;<b>Register </b></Nav.Link>
                                <Nav.Link href="/custom_accordion"> <FontAwesomeIcon className="navicons" title="Custom Accordion" icon={faCarCrash} />&nbsp;<b>Custom Accordion </b></Nav.Link>
                                <Nav.Link href="/folder"> <FontAwesomeIcon className="navicons" title="Folder Accordion" icon={faFolder} />&nbsp;<b>Folder Accordion </b></Nav.Link>
                                <Nav.Link href="/voter"> <FontAwesomeIcon className="navicons" title="Pan Card" icon={faFolder} />&nbsp;<b>Pan Card  </b></Nav.Link>
                                <Nav.Link href="/todo"> <FontAwesomeIcon className="navicons" title="TO-DO List " icon={faFolder} />&nbsp;<b>TO-DO List  </b></Nav.Link>
                                <Nav.Link href="/q_bank"> <FontAwesomeIcon className="navicons" title="QuestionBank " icon={faFolder} />&nbsp;<b> Question Bank   </b></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className="col-md-10 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body-t">
                                    <p>Tickets</p>
                                    <FontAwesomeIcon className="icons" icon={faTicket} />
                                    <span className='spans'>223</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body-s">
                                    <p>Steps</p>
                                    <FontAwesomeIcon className="icons" icon={faShoePrints} />
                                    <span className='spans'>123</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body-r">
                                    <p>Revenue</p>
                                    <FontAwesomeIcon className="icons" icon={faChartLine} />
                                    <span className='spans'>433</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body-p">
                                    <p>Total Profit</p>
                                    <FontAwesomeIcon className="icons" icon={faAward} />
                                    <span className='spans'>1,954</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid p-2">
                        <div className="row">
                            <div className="col-md-6 p-3">
                                <div className="card" >
                                    <div className="card-body">
                                    <h5>Table 1 :</h5>
                                        <Draggable>
                                        <div className='table-container '>
                                            
                                            <table className='table table-bordered'>
                                                <thead className="sticky-header" >
                                                    <tr>
                                                        <th>Company</th>
                                                        <th>Contact</th>
                                                        <th>Country</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table1.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.company}</td>
                                                            <td>{row.contact}</td>
                                                            <td>{row.country}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        </Draggable><br/>
                                        <h5>Table 2 :</h5>
                                        <Draggable>
                                            
                                        <div className='table-container'>
                                            <table className='table table-bordered'>
                                                <thead  className="sticky-header">
                                                    <tr>
                                                        <th>Company</th>
                                                        <th>Contact</th>
                                                        <th>Country</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table2.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.company}</td>
                                                            <td>{row.contact}</td>
                                                            <td>{row.country}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        </Draggable>
                                        
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-3 p-3">
                                <div className="card" >
                                    <div className="card-body">
                                    <h6>Leader Board</h6>
                                    <Linechart/>
                                    
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3 p-3">
                                <div className="card" >
                                    <div className="card-body">
                                    <h6>Customers</h6>
                             <PieChart/>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6 p-3">
                                <div className="card" >
                                    <div className="card-body">
                             <Layout/>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDashboard;

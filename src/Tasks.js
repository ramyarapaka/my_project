import { Link } from 'react-router-dom';
const Tasks = () => {
    return (
        <div className="container text-center card m-4">
            <h3>Tasks</h3>
            <Link to="/dash"> Dashboard of Form </Link><br />
            <Link to="/image_upload">File Information </Link><br />
            <Link to="/date">Date </Link><br />
            <Link to="/adddate">Date Information </Link><br />
            <Link to="/excel">Excel Display </Link><br />
            <Link to="/image_crop">Image Cropping </Link><br />
            <Link to="/Que_ans"> Dynamic Ques-Ans </Link><br />
            <Link to="/Currency"> Currency </Link><br />
            <Link to="/bank_system"> Bank System </Link><br />
            <Link to="/employ_form"> EmployeeForm </Link><br />
            <Link to="/register"> Register </Link><br />
            <Link to="/new_dashbord"> New Dashboard </Link><br />
            <Link to="/folder"> Folder Accordion </Link><br />
        </div>
    )
};

export default Tasks;
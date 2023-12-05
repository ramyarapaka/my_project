import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Excel from "./Excel";
import DatePicker from "./Date";
import AddDate from "./AddDate";
import Login from "./Login";
import Dashboard from "./Dashboard";
import FileUpload from "./FileUpload";
import ImageCrop from "./ImageCrop";
import DynamicQueAns from "./DynamicQueAns";
import Currency from "./Currency";
import BankSystem from "./BankSystem";
import Register from "./Register";
import EmployeeForm from "./EmployeeForm";
import Tasks from "./Tasks";
import NewDashboard from "./NewDashboard";
import CustomAccordion from "./CustomAccordion";
import FolderItem from "./FolderItem";
import PanCard from "./PanCard";
import TodoList from "./TodoList";
import QuestionBank from "./QuestionBank";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/excel" element={<Excel />} />
        <Route path="/date" element={<DatePicker />} />
        <Route path="/adddate" element={<AddDate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/image_upload" element={<FileUpload />} />
        <Route path="/image_crop" element={<ImageCrop />} />
        <Route path="/Que_ans" element={<DynamicQueAns />} />
        <Route path="/Currency" element={<Currency />} />
        <Route path="/bank_system" element={<BankSystem />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employ_form" element={<EmployeeForm />} />
        <Route path="/new_dashbord" element={<NewDashboard />} />
        <Route path="/custom_accordion" element={<CustomAccordion />} />
        <Route path="/folder" element={<FolderItem />} />
        <Route path="/voter" element={<PanCard />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/q_bank" element={<QuestionBank />} />
    
      </Routes>
    </Router>
  );

}

export default App;
import './App.css';
import HomePage from './components/HomePage';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PatientDetails from './components/PatientDetails';
import UpdateData from './components/UpdateData';
import Patients from './components/Patients';
import CreatePatient from './components/CreatePatient';
import SearchResultsPage from './components/SearchResults';
import LearnMore from './components/LearnMore';
import DemoLogin from './components/DemoLogin';


function App() {
  return (
    <>
      <Routes>
        
        <Route path="/patients" element={<Patients />} />



        <Route path="/search-results" element={ <><SearchResultsPage /> </>} />
        <Route path="/updatedata/:id" element={<UpdateData />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/create-patient" element={<>  <CreatePatient /> </>} />
        <Route path="/" element={<> <HomePage/></> } />
        <Route path="/signin" element={<> <Header /> <SignIn /> </>} />
        <Route path="/signup" element={<> <Header /> <SignUp /> </>} />
        <Route path="/learnmore" element={<> <LearnMore /> </>} />
        <Route path="/demologin" element={<> <Header /> <DemoLogin /> </>} />
      </Routes>
    </>
  );
}

export default App;

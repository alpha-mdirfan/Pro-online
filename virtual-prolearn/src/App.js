import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';
import { AuthProvider } from './context/Authcontext';

import Homepage from './layout/Homepage';
import Ourterms from './layout/Ourterms';
import Register from './auth/Register';
import Signin from './auth/Signin';
import Home from './dashboard/Home';
import Billing from './dashboard/Billing';
import Account from './dashboard/Account';
import Success from './dashboard/Success';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element = {< Homepage/>} />
          <Route path='/our-terms' element = {< Ourterms/>} />
          <Route path='/register' element = {< Register/>} />
          <Route path='/signin' element = {< Signin/>} />

          <Route path='/home' element = {<PrivateRoute><Home/></PrivateRoute>}></Route>
          <Route path='/billing' element = {<PrivateRoute><Billing/></PrivateRoute>}></Route>
          <Route path='/account' element = {<PrivateRoute><Account/></PrivateRoute>}></Route>
          <Route path='/success' element = {<PrivateRoute><Success/></PrivateRoute>}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

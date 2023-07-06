import React, { StrictMode, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from './Keycloak';
import About from './pages/about';
import Account from './pages/account';
import Credits from './pages/credits';
import ErrorCreate from './pages/errorCreate';
import Landing from './pages/landing';
import MyCharts from './pages/myCharts';
import NewChart from './pages/newChart';
import SuccessfulCreate from './pages/successfulCreate';
import NotFound from './pages/notFound.js';
import SideBarLayout from "./components/SideBar";
import Copyright from "./components/copyright";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  // user = 1 --> user exists in db
  // user = 0 --> does not exist in db
  // user = -1 --> unknown state
  // user = 2 --> you registered just now
  const storedUser = sessionStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? parseInt(storedUser) : -1);

  return (
     <ReactKeycloakProvider authClient={keycloak}>
      <StrictMode>
      <BrowserRouter basename='/'>
        <div>
          <Header />
        </div>
        <div>
          <SideBarLayout />
        </div>
        <div className="top-div">
          <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route exact path='/' element={<Landing user={user} setUser={setUser}/>} />
                <Route exact path='/landing' element={<Landing user={user} setUser={setUser}/>} />
                <Route path='/about' element={ <About/>}/>
                <Route path='/account' element={<PrivateRoute><Account user={user}/></PrivateRoute>}/>
                <Route path='/credits' element={<PrivateRoute><Credits user={user}/></PrivateRoute>} />
                <Route path='/errorCreate' element={<PrivateRoute><ErrorCreate/></PrivateRoute>} />
                <Route path='/myCharts' element={<PrivateRoute><MyCharts user={user}/></PrivateRoute>} />
                <Route path='/newChart' element={<PrivateRoute><NewChart user={user}/></PrivateRoute>} />
                <Route path='/successfulCreate' element={<PrivateRoute><SuccessfulCreate/></PrivateRoute>} />
            </Routes>
            </div>
          <footer className="copyright">
          <Copyright />
        </footer>
      </BrowserRouter>
      </StrictMode>
      </ReactKeycloakProvider>
  );
}

export default App;

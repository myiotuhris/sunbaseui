
import './App.css';
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Home from "./Home";
const PrivateRoutes=()=>{
  const token=localStorage.getItem('token')
  // console.log(token)
  return(
      token ? <Outlet/> : <Navigate to="/login"/>
  )
}
function App(){
  return <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route element={<PrivateRoutes/>}>
        <Route exact path={"/"} element={<Home/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
}
export default App;


import './App.css';
import Header from './Component/Header';
import Blogs from './Component/Blogs';
import Home from './Component/Home';
import Login from './Component/Login';
import Addblog from './Component/Addblog';
import View from './Component/View';
import { Route, Routes } from 'react-router-dom';
import Signup from './Component/Signup';
import Usercontextprovider from './context/Usercontextprovider';
import Reply from './Component/Reply';

function App() {
  return (
    <div className="App">
      <Usercontextprovider>
        
      <Header/>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/addblog' element={<Addblog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/view/:id' element={<View/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/reply' element={<Reply/>}/>
        
      </Routes>
      
      </Usercontextprovider>
    </div>
  );
}

export default App;

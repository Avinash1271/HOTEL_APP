import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './Home';
import Booking from './Booking';
import ViewDetails from './ViewDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/book/:roomid' element={<Booking/>}></Route>
          <Route path='/view' element={<ViewDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
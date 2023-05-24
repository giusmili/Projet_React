import './App.css';
//React Router Dom Routing
import { Routes, Route } from 'react-router-dom';
//Pages/Components
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import Saved from './pages/Saved';
import Event from './pages/Event';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/search' Component={Search}></Route>
          <Route path='/saved' Component={Saved}></Route>
          <Route path='/event/:id' Component={Event}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ListPage from './views/ListPage';
import { Routes, Route } from "react-router-dom";
import Update from './views/Update';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

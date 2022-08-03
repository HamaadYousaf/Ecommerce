import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer className="toast" />
    </>
  );
}

export default App;
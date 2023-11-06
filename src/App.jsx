import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages";
import Historial from "./Pages/Historial";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

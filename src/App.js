import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ItemComp} from "./components/ItemComp";
import {Response} from "./components/Response";
import {Order} from "./components/Order";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/order" element={<Order />} />
          <Route path="/response" element={<Response />} />
          <Route path="/:id" element={<ItemComp />} />
      </Routes>
    </BrowserRouter>
  );
}

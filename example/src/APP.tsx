import React from "react";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import Demo from './components/demo';
import Context from './components/Context';
import Flow from './components/Flow';
import Command from './components/Command';
import Detail from './components/Detail';
import Panel from './components/Panel';
import Menu from './components/Menu';
import Popover from './components/Popover';
import Register from './components/Register';

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/demo" element={<Demo />} />
        <Route path="/context" element={<Context />} />
        <Route path="/flow" element={<Flow />} />
        <Route path="/command" element={<Command />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/popover" element={<Popover />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
import { useState } from "react";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { Link, Route, Routes } from "react-router-dom";
import Converter from "markdown-it";
import { ModeSwitcher } from "./ModeSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MdViewList } from "react-icons/md";
import { Editor } from "./Editor";
import { Texts } from "./Texts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Editor />} />
      <Route path="texts" element={<Texts />} />
    </Routes>
  );
}

export default App;

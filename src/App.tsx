import { useState } from "react";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { Link } from "react-router-dom";
import Converter from "markdown-it";
import { ModeSwitcher } from "./ModeSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MdViewList } from "react-icons/md";
import { Editor } from "./Editor";

function App() {
  return <Editor />;
}

export default App;

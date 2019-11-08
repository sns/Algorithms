import * as dotenv from "dotenv";
import * as React from "react";
import * as ReactDom from "react-dom";

import App from "./App";

dotenv.config();

ReactDom.render(<App />, document.getElementById("root") as HTMLElement);

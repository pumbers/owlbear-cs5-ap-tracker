import "./app.scss";
import Popover from "./components/Popover.svelte";

import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./lib/context-menu";

const app = new Popover({
  target: document.getElementById("app"),
});

OBR.onReady(() => {
  setupContextMenu();
});

export default app;

<script>
  // @ts-nocheck
  import { Router, Route } from "svelte-routing";
  import Popover from "./routes/Popover.svelte";
  import ArmourModal from "./routes/ArmourModal.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/popover"><Popover /></Route>
    <Route path="/set-armor"><ArmourModal /></Route>
  </div>
</Router>

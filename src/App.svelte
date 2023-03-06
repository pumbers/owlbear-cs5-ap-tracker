<script>
  import { Router, Route } from "svelte-routing";
  import Popover from "./routes/Popover.svelte";
  import Modal from "./routes/Modal.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/popover"><Popover /></Route>
    <Route path="/set-armor/:id" let:params><Modal id={params.id} /></Route>
  </div>
</Router>

<script>
  // @ts-nocheck
  import OBR from "@owlbear-rodeo/sdk";
  import { setupContextMenu } from "../lib/context-menu";
  import ActionPointTracker from "../components/ActionPointTracker.svelte";

  OBR.onReady(() => {
    setupContextMenu();
  });
</script>

<main class="m-4">
  <ActionPointTracker />
</main>

<style lang="postcss">
</style>

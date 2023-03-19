<script>
  // @ts-nocheck
  import OBR from "@owlbear-rodeo/sdk";
  import { ID } from "../config";

  const selectArmour = async (type) => {
    OBR.scene.items.updateItems(await OBR.player.getSelection(), (updates) => {
      for (let update of updates) {
        update.metadata[`${ID}/metadata`].armour = type;
      }
    });
  };
</script>

<div class="flex flex-row justify-between px-2">
  <button class="w-6" title="None" on:click={() => selectArmour("none")}
    ><img src="/icons/pierced-body.svg" alt="" /></button
  >
  <button class="w-6" title="Light" on:click={() => selectArmour("light")}
    ><img src="/icons/leather-armor.svg" alt="" /></button
  >
  <button class="w-6" title="Heavy" on:click={() => selectArmour("heavy")}
    ><img src="/icons/lamellar.svg" alt="" /></button
  >
  <button class="w-6" title="Battle" on:click={() => selectArmour("battle")}
    ><img src="/icons/breastplate.svg" alt="" /></button
  >
</div>

<style lang="postcss">
</style>

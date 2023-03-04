<script>
  // @ts-nocheck

  import OBR from "@owlbear-rodeo/sdk";

  const ID = "com.codetheoretic.cs5.ap-tracker";

  let playerRole;
  let initiativeItems = [];

  // Build an initiative list from a set of items
  const buildInitiativeList = (items) => {
    return items
      .filter((item) => item.layer === "CHARACTER" && item.metadata[`${ID}/metadata`])
      .map((item) => {
        const metadata = item.metadata[`${ID}/metadata`];
        console.log("adding", item);
        return {
          id: item.id,
          name: item.text.plainText || item.name,
          bap: metadata.bap,
          ap: metadata.ap,
          held: metadata.held,
        };
      })
      .sort((a, b) => parseFloat(b.ap) - parseFloat(a.ap));
  };

  // When OBR is ready...
  OBR.onReady(async () => {
    console.log("onReady()", await OBR.scene.items.getItems());

    // Find the player role
    playerRole = OBR.player.getRole();

    // Build an initial initiative list when the popover loads
    initiativeItems = buildInitiativeList(await OBR.scene.items.getItems());

    // Rebuild the list if any items change
    OBR.scene.items.onChange((items) => {
      initiativeItems = buildInitiativeList(items);
    });
  });

  // Roll AP for one character
  const rollOne = (item) => {
    OBR.scene.items.updateItems([item.id], (updates) => {
      for (let update of updates) {
        update.metadata[`${ID}/metadata`].ap =
          parseInt(item.bap) + parseInt(item.held) + Math.floor(Math.random() * 10);
      }
    });
  };

  // Roll AP for all characters
  const rollAll = () => {
    OBR.scene.items.updateItems(
      initiativeItems.map((item) => item.id),
      (updates) => {
        for (let i = 0; i < updates.length; i++) {
          const update = updates[i];
          const original = initiativeItems[i];
          update.metadata[`${ID}/metadata`].ap =
            parseInt(original.bap) + parseInt(original.held) + Math.floor(Math.random() * 10);
        }
      }
    );
  };
</script>

<div class="popover tracker">
  <h1>Combat Tracker</h1>
  <table class="w-full mt-4 table-auto">
    <thead>
      <tr>
        <th>
          {#await playerRole then role}
            {#if role === "GM"}
              <button class="w-4 m-1" title="Roll All" on:click={rollAll}><img src="/d10.svg" alt="" /></button>
            {/if}
          {/await}
        </th>
        <th>AP</th>
        <th>Name</th>
        <th>BAP</th>
        <th>Held</th>
      </tr>
    </thead>
    <tbody>
      {#each initiativeItems as item}
        <tr>
          <td
            ><button class="w-4 m-1" title="Roll AP" on:click={rollOne(item)}>
              <img src="/d10.svg" alt="" /></button
            ></td
          >
          <td>{item.ap}</td>
          <td>{item.name}</td>
          <td>{item.bap}</td>
          <td>{item.held}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

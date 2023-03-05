<script>
  // @ts-nocheck

  import OBR from "@owlbear-rodeo/sdk";

  const ID = "com.codetheoretic.cs5.ap-tracker";

  let playerRole;
  let initiativeItems = [];

  // Build an initiative list from a set of items
  const buildInitiativeList = async (items) => {
    const attachments = (await OBR.scene.items.getItemAttachments(items.map((item) => item.id))).filter(
      (attachment) => attachment.layer === "ATTACHMENT"
    );
    return items
      .filter((item) => item.layer === "CHARACTER" && item.metadata[`${ID}/metadata`])
      .map((item) => {
        const metadata = item.metadata[`${ID}/metadata`];
        const fatigued = attachments.some(
          (attachment) => attachment.attachedTo === item.id && attachment.name === "Exhaustion"
        );
        const dead = attachments.some((attachment) => attachment.attachedTo === item.id && attachment.name === "Dead");
        const incapacitated = attachments.some(
          (attachment) => attachment.attachedTo === item.id && attachment.name === "Incapacitated"
        );
        return {
          id: item.id,
          name: item.text.plainText || item.name,
          bap: metadata.bap,
          ap: incapacitated || dead ? 0 : fatigued ? Math.max(0, metadata.ap - 10) : metadata.ap,
          held: metadata.held,
          fatigued,
          incapacitated,
          dead,
        };
      })
      .sort((a, b) => parseFloat(b.ap) - parseFloat(a.ap) || parseFloat(b.bap) - parseFloat(a.bap));
  };

  // When OBR is ready...
  OBR.onReady(async () => {
    // Find the player role
    playerRole = OBR.player.getRole();

    // Build an initial initiative list when the popover loads
    initiativeItems = await buildInitiativeList(await OBR.scene.items.getItems());

    // Rebuild the list if any items change
    OBR.scene.items.onChange(async (items) => {
      initiativeItems = await buildInitiativeList(items);
    });
  });

  // Roll AP for one character
  const rollOne = (item) => {
    OBR.scene.items.updateItems([item.id], (updates) => {
      for (let update of updates) {
        if (incapacitated.incapacitated || incapacitated.dead) {
          update.metadata[`${ID}/metadata`].ap = 0;
        } else {
          update.metadata[`${ID}/metadata`].ap = Math.max(
            0,
            parseInt(item.bap) + parseInt(item.held) + Math.ceil(Math.random() * 10) - (item.fatigued ? 10 : 0)
          );
        }
        update.metadata[`${ID}/metadata`].held = 0;
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
          if (original.incapacitated || original.dead) {
            update.metadata[`${ID}/metadata`].ap = 0;
          } else {
            update.metadata[`${ID}/metadata`].ap = Math.max(
              0,
              parseInt(original.bap) +
                parseInt(original.held) +
                Math.ceil(Math.random() * 10) -
                (original.fatigued ? 10 : 0)
            );
          }
          update.metadata[`${ID}/metadata`].held = 0;
        }
      }
    );
  };

  // Spend AP
  const spendAP = (item, spend) => {
    OBR.scene.items.updateItems([item.id], (updates) => {
      for (let update of updates) {
        update.metadata[`${ID}/metadata`].ap = parseInt(item.ap) - spend;
      }
    });
  };

  // Hold AP to next round
  const holdAP = (item, ap, bap) => {
    OBR.scene.items.updateItems([item.id], (updates) => {
      for (let update of updates) {
        update.metadata[`${ID}/metadata`].held = Math.min(ap, bap);
        update.metadata[`${ID}/metadata`].ap = 0;
      }
    });
  };
</script>

<div class="popover tracker">
  <div class="flex justify-between">
    <h1>Action Points</h1>
    <img
      src="/info.svg"
      class="w-4"
      alt="Information"
      title="Use the dice icon to roll AP for a round, GM's can roll for everyone. Cursor over a character's AP and select to spend AP, click fist icon to hold up to their BAP in AP until next round. Drag the 'Incapacitated', 'Exhausted' or 'Dead' attachments onto a character to trigger those AP modifiers."
    />
  </div>
  {#if initiativeItems.length === 0}
    <p class="text-xs text-gray-400">Add characters from their context menu to start tracking AP & initiative.</p>
  {/if}
  <table class="w-full mt-4 table-auto">
    <colgroup>
      <col class="w-0" />
      <col class="w-0" />
      <col class="w-full" />
      <col class="w-0" />
      <col class="w-0" />
    </colgroup>
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
          <td class="text-center"
            ><div class="relative inline-block group w-full">
              <button>{item.ap}</button>
              <div class="hidden absolute w-15 z-10 group-hover:block bg-violet-500/100">
                {#each Array.from({ length: Math.min(item.ap, 10) }, (_, i) => i + 1) as spend}
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <a
                    class="block no-underline p-1 hover:bg-violet-700/100 cursor-pointer"
                    on:click={spendAP(item, spend)}>Spend&nbsp;{spend}</a
                  >
                {/each}
              </div>
            </div></td
          >
          <td
            ><div class="flex justify-between">
              <span>{item.name}</span>
              {#if item.dead}
                <img class="w-4" src="/death-skull.svg" alt="" title="Dead" />
              {:else if item.incapacitated}
                <img class="w-4" src="/backstab.svg" alt="" title="Fatigued" />
              {:else if item.fatigued}
                <img class="w-4" src="/despair.svg" alt="" title="Fatigued" />
              {:else}
                <img class="w-4" src="/swordman.svg" alt="" title="Fighting" />
              {/if}
            </div></td
          >
          <td class="text-center">{item.bap}</td>
          <td class="text-center">
            {#if item.held}
              {item.held}
            {:else}
              <button
                class="w-4 m-1"
                title="Hold remaining AP (Max {item.bap}) until next round"
                on:click={holdAP(item, item.ap, item.bap)}><img src="/fist.svg" alt="" /></button
              >
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  h1 {
    @apply w-full font-bold mb-2;
  }
  table {
    @apply text-sm;
  }
  th {
    @apply text-left font-bold py-1 px-2;
    background-color: rgba(140, 140, 140, 0.9);
  }
  td {
    @apply py-1 px-2;
  }
</style>

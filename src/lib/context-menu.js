import OBR from "@owlbear-rodeo/sdk";

const ID = "com.codetheoretic.cs5.ap-tracker";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${ID}/add-to-ap-tracker`,
    icons: [
      {
        icon: "/icons/add.svg",
        label: "Add to AP Tracker",
        filter: {
          every: [
            { key: "layer", value: "CHARACTER" },
            { key: ["metadata", `${ID}/metadata`], value: undefined },
          ],
        },
      },
      {
        icon: "/icons/remove.svg",
        label: "Remove from AP Tracker",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick(context) {
      const addToTracker = context.items.every((item) => item.metadata[`${ID}/metadata`] === undefined);
      if (addToTracker) {
        const bap = window.prompt("Enter the character's BAP");
        if (bap) {
          OBR.scene.items.updateItems(context.items, (items) => {
            for (let item of items) {
              item.metadata[`${ID}/metadata`] = {
                bap,
                ap: 0,
                held: 0,
              };
            }
          });
        }
      } else {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            delete item.metadata[`${ID}/metadata`];
          }
        });
      }
    },
  });
  OBR.contextMenu.create({
    id: `${ID}/armour-menu`,
    icons: [
      {
        icon: "/icons/lamellar.svg",
        label: "Select armour type for AP Tracker",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick(context, elementId) {
      OBR.popover.open({
        id: `${ID}/set-armour`,
        url: `/set-armor/${context.items[0].id}`,
        height: 25,
        width: 150,
        anchorElementId: elementId,
      });
    },
  });
}

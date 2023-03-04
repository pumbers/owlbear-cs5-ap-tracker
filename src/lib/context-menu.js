import OBR from "@owlbear-rodeo/sdk";

const ID = "com.codetheoretic.cs5.ap-tracker";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
      {
        icon: "/add.svg",
        label: "Add to Initiative",
        filter: {
          every: [
            { key: "layer", value: "CHARACTER" },
            { key: ["metadata", `${ID}/metadata`], value: undefined },
          ],
        },
      },
      {
        icon: "/remove.svg",
        label: "Remove from Initiative",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick(context) {
      const addToBAP = context.items.every((item) => item.metadata[`${ID}/metadata`] === undefined);
      if (addToBAP) {
        const bap = window.prompt("Enter the character's BAP");
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            item.metadata[`${ID}/metadata`] = {
              bap,
              roll: 0,
              ap: 0,
              held: 0,
            };
          }
        });
      } else {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            delete item.metadata[`${ID}/metadata`];
          }
        });
      }
    },
  });
}

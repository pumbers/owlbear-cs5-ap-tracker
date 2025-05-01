<script>
	// @ts-nocheck
	import OBR from '@owlbear-rodeo/sdk';
	import { ID } from '../../config';

	const selectArmour = async (type) => {
		OBR.scene.items.updateItems(await OBR.player.getSelection(), (updates) => {
			for (let update of updates) {
				update.metadata[`${ID}/metadata`].armour = type;
			}
		});
	};
</script>

<div class="flex w-full flex-row justify-between gap-1 p-4">
	<button title="None" on:click={() => selectArmour('none')}
		><img src="/icons/pierced-body.svg" alt="" /></button
	>
	<button title="Light" on:click={() => selectArmour('light')}
		><img src="/icons/leather-armor.svg" alt="" /></button
	>
	<button title="Heavy" on:click={() => selectArmour('heavy')}
		><img src="/icons/lamellar.svg" alt="" /></button
	>
	<button title="Battle" on:click={() => selectArmour('battle')}
		><img src="/icons/breastplate.svg" alt="" /></button
	>
</div>

<style lang="postcss">
	@import 'tailwindcss';

	button {
		@apply w-6 cursor-pointer;
	}
</style>

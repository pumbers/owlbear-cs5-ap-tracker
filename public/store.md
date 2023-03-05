---
title: Chivalry & Sorcery 5th Edition Action Points Tracker
description: A simple Action Point & initiative tracker for Chivalry & Sorcery 5e.
author: Code Theoretic Inc
image: https://raw.githubusercontent.com/pumbers/owlbear-cs5-ap-tracker/main/public/screenshot_popover.webp
icon: https://owlbear-cs5-ap-tracker.pages.dev/icon.svg
tags:
  - c&s5e
  - initiative
manifest: https://owlbear-cs5-ap-tracker.pages.dev/manifest.json
learn-more: https://github.com/pumbers/owlbear-cs5-ap-tracker
---

# Chivalry & Sorcery 5th Edition Action Points Tracker

Running C&S combat and keeping track of the number of Action Points each character has, and their resulting initiative order, can be tricky. This simple AP tracker for Owlbear Rodeo 2 automates much of that process and allows GM's & Players to easily manage their character's AP.

The extension can be added by following the instructions in the [Owlbear Rodeo Guide](https://extensions.owlbear.rodeo/guide).

## Using the Tracker

<img src="screenshot_contextmenu.webp"/>

Characters can be added to the tracker using the context menu for their map icon. Click the <img src="swordman.svg" width="12"/> icon and enter the characters Base Action Points (BAP).

The popover is opened using the same <img src="swordman.svg" width="12"/> icon on the Owlbear Rodeo menu at top left.

<img src="screenshot_popover.webp"/>

The AP table shows a character's current Action Points, their name & Base Action Points, and whether they have held any AP over to the next round.

Players can roll 1D10 for their AP at the start of a round using the <img src="d10.svg" width="12"/> icon next to their character, as can the GM for NPC's. The GM also has an icon in the table header which can be used to roll for all characters at once.

The list will automatically sort on the highest available AP from top to bottom. Characters with AP held to the next round will show 0 available AP and a number in the Held column.

For instructions during play, hover your cursor over the <img src="info.svg" width="12"/> icon.

<img src="screenshot_spending.webp"/>

Players and the GM can spend AP by hovering the cursor over their character's current AP value and selecting the number of AP they want to spend in an action phase - up to their available AP or BAP. AP totals and table order will be adjusted automatically.

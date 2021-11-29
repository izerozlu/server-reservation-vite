<template>
  <component
    :is="isDaySelected ? 'div' : 'button'"
    class="timezone p-1 w-full text-left border border-transparent rounded"
    :class="{
      flex: isDaySelected,
      'items-center': isDaySelected,
      'hover:border-red-300': isDaySelected,
      'cursor-pointer': !isDaySelected,
    }"
    type="button"
  >
    <template v-if="!isDaySelected">{{ timezone.zone }}</template>
    <template v-else>
      <span class="timezone__time w-8">{{ timezone.zone }}</span>
      <div class="timezone__blocks blocks flex items-center w-full h-full px-2">
        <Block
          v-for="block in blocks"
          :key="block.id"
          :block="block"
          class="timezone__block"
        />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";

import TimezoneTemplate from "../interfaces/timezone-template";
import useBlockSelectionStore from "../store/block-selection";

import useUserActionsStore from "../store/user-actions";

import Block from "./block.vue";

const blockSelectionStore = useBlockSelectionStore();
const userActionsStore = useUserActionsStore();

// Props

const { timezone, blockCount } = withDefaults(
  defineProps<{
    timezone: TimezoneTemplate;
    blockCount?: number;
  }>(),
  {
    blockCount: 5,
  }
);

// Static Data

const blocks = new Array(blockCount).fill(0).map((_, index: number) => {
  return {
    id: `${timezone.day.id}_${timezone.id}_${index + 1}`,
    day: timezone.day,
    timezone: timezone,
    column: index + 1,
    isTaken: false,
  };
});

// Computed

const isStartingTimezone = computed(
  () => blockSelectionStore.startingBlock?.timezone === timezone
);
const isEndingTimezone = computed(
  () => blockSelectionStore.endingBlock?.timezone === timezone
);
const startingBlockColumn = computed(
  () => blockSelectionStore.startingBlock?.column
);
const endingBlockColumn = computed(
  () => blockSelectionStore.endingBlock?.column
);

// Computed (Store)

const isDaySelected = computed(
  () => userActionsStore.selectedDay === timezone.day.weekday
);
</script>

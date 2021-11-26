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
    <template v-if="!isSelectedTimezone">{{ timezone.zone }}</template>
    <template v-else>
      <span class="timezone__time w-8">{{ timezone.zone }}</span>
      <div class="timezone__blocks blocks flex items-center w-full h-full px-2">
        <Block
          v-for="block in blocks"
          :key="block.id"
          :block="block"
          class="timezone__block"
          :class="{
            'timezone__block--starting':
              isStartingTimezone && startingBlockColumn === block.column,
            'timezone__block--ending':
              isStartingTimezone && endingBlockColumn === block.column,
          }"
        />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import TimezoneTemplate from "../interfaces/timezone-template";

import { useStore } from "../store";

import Block from "./block.vue";

const store = useStore();

// Props

const {
  timezone,
  isDaySelected,
  blockCount,
  isStartingTimezone,
  startingBlockColumn,
  endingBlockColumn,
  isEndingTimezone,
} = defineProps<{
  timezone: TimezoneTemplate;
  isDaySelected: boolean;
  isStartingTimezone: boolean;
  isEndingTimezone: boolean;
  startingBlockColumn?: number;
  endingBlockColumn?: number;
  blockCount?: number;
}>();

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

const isSelectedTimezone = computed(() => isDaySelected);
</script>

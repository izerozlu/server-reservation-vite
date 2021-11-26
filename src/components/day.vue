<template>
  <div
    class="
      day
      border border-gray-600
      rounded-lg
      grid grid-flow-row
      auto-rows-auto
      p-2
      text-xs
    "
    :class="[
      modifier ? `day--${modifier}` : null,
      {
        'col-span-2': isDaySelected,
        'day--selected': isDaySelected,
        'cursor-pointer': !isDaySelected,
      },
    ]"
    @click="setSelectedDay(day.weekday)"
  >
    <div class="day__header flex justify-between">
      <h2 class="day__title capitalize text-2xl">{{ day.name }}</h2>
      <h3 v-if="modifier" class="day__sub-title">
        {{ modifier }}
      </h3>
    </div>
    <template v-if="isDaySelected">
      <h4
        class="
          day__server-header
          text-base
          flex
          items-center
          justify-center
          pl-9
        "
      >
        Integration
      </h4>
      <div
        class="
          day__server-columns
          server-columns
          flex
          justify-start
          pl-9
          divide-x divide-gray-300
          h-6
          self-center
        "
      >
        <h5
          v-for="column in columns"
          :key="column"
          class="
            server-columns__column
            column
            flex
            items-center
            justify-center
            flex-1
            text-center
          "
          :class="{
            'column--hovered': hoveredColumn === column,
            'bg-gray-200': hoveredColumn === column,
            'column--active-selection': activeSelectionColumn === column,
          }"
        >
          {{ column }}
        </h5>
      </div>
    </template>
    <Timezone
      v-for="timezone in timezones"
      :key="timezone.id"
      class="day__timezone"
      :timezone="timezone"
      :is-day-selected="isDaySelected"
      :is-starting-timezone="
        isBlockSelectionActive &&
        blockSelectionStartingBlock?.timezone === timezone
      "
      :is-ending-timezone="
        isBlockSelectionActive && hoveredBlock?.timezone === timezone
      "
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import DayTemplate from "../interfaces/day-template";
import TimezoneTemplate from "../interfaces/timezone-template";

import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import Nullable from "../types/nullable";

import Timezone from "./timezone.vue";

const store = useStore();

// Props

const { day, modifier } = defineProps<{
  day: DayTemplate;
  modifier: Nullable<string>;
}>();

// Static Data

const TIMEZONE_COUNT = 19;
const timezones: TimezoneTemplate[] = new Array(TIMEZONE_COUNT)
  .fill(0)
  .map((_, index) => ({
    zone: `${Math.floor((index + 18) / 2)}${index % 2 === 0 ? ":00" : ":30"}`,
    row: index,
    id: index,
    day,
  }));

const columns = new Array(5).fill(0).map((_, index) => index + 1);

// Computed

const isDaySelected = computed(() =>
  !selectedDay ? modifier === "today" : selectedDay.value === day.weekday
);
const hoveredColumn = computed(() => hoveredBlock.value?.column);
const activeSelectionColumn = computed(
  () => blockSelectionStartingBlock.value?.column
);

// Computed (Store)

const selectedDay = computed(() => store.state.selectedDay);
const hoveredBlock = computed(() => store.state.hoveredBlock);
const isBlockSelectionActive = computed(
  () => store.getters.isBlockSelectionActive
);
const blockSelectionStartingBlock = computed(
  () => store.getters.blockSelectionStartingBlock
);

// Methods (Store)

const setSelectedDay = (weekday: number) =>
  store.dispatch(ActionTypes.SET_SELECTED_DAY, weekday);
</script>

<style lang="scss" scoped>
.day--selected {
  outline: 4px solid var(--primary-color);
  border-color: transparent;
}

.day:not(.day--selected):hover {
  outline: 4px dashed var(--primary-color);
  border-color: transparent;
}

.day__timezone {
  &--active-selection-start {
    background: red;
  }

  &--active-selection-end {
    background: purple;
  }
}
</style>

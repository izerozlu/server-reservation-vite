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
    @click="userActionsStore.setSelectedDay(day.weekday)"
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
          mb-2
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
            'column--hovered': userActionsStore.hoveredBlock?.column === column,
            'bg-gray-200': userActionsStore.hoveredBlock?.column === column,
            'column--active-selection':
              blockSelectionStore.startingBlock?.column === column,
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
      :is-starting-timezone="
        blockSelectionStore.active &&
        blockSelectionStore.startingBlock?.timezone === timezone
      "
      :is-ending-timezone="
        blockSelectionStore.active &&
        blockSelectionStore.endingBlock?.timezone === timezone
      "
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import DayType from "~/types/day-type";

import useBlockSelectionStore from "~/store/block-selection";
import useUserActionsStore from "~/store/user-actions";

import Nullable from "~/types/utility/nullable";
import TimezoneType from "~/types/timezone-type";

import Timezone from "~/components/timezone.vue";

const blockSelectionStore = useBlockSelectionStore();
const userActionsStore = useUserActionsStore();

// Props

const { day, modifier } = defineProps<{
  day: DayType;
  modifier: Nullable<"yesterday" | "today" | "tomorrow">;
}>();

// Static Data

const TIMEZONE_COUNT = 19;
const timezones: TimezoneType[] = new Array(TIMEZONE_COUNT)
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
  !userActionsStore.selectedDay
    ? modifier === "today"
    : userActionsStore.selectedDay === day.weekday
);
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

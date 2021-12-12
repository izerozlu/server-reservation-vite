<template>
  <div class="week h-full grid grid-flow-col grid-cols-6 gap-x-3 px-2 py-4">
    <Day
      v-for="day in days"
      :key="day.name"
      :day="day"
      :modifier="getDayModifier(day.weekday)"
    />
    <!-- <teleport to="body">
      <Dialog
        :show="!!blockSelectionStore.endingBlock"
        @close-dialog="blockSelectionStore.cancelBlockSelection"
        @submit-dialog="() => console.log('submit-dialog')"
      >
        <template #title>
          <span class="p-2 text-2xl">Finalize Reservation</span>
        </template>
        <template #content>
          <div class="dialog__content flex flex-col flex-grow p-2">
            <div class="flex justify-between">
              <div
                class="flex-1 rounded-lg p-1 text-center mr-1 last:mr-0"
                :class="
                  userActionsStore.selectedDay === index + 1
                    ? ['bg-yellow-600', 'text-white']
                    : ['bg-gray-200', 'text-gray-400']
                "
                v-for="(day, index) in humanReadableDays"
                :key="day"
              >
                {{ day }}
              </div>
            </div>
            <span>
              {{ userActionsStore.humanReadableSelectedDay }},
              {{ blockSelectionStore.startingBlock?.timezone.zone }} -
              {{ blockSelectionStore.endingBlock?.timezone.zone }}
            </span>
            <span class="flex justify-between">
              Which service would you like to reserve for?
              <select class="p-1 border rounded-sm">
                <option
                  v-for="service in services"
                  :key="service"
                  :value="service"
                >
                  {{ service }}
                </option>
              </select>
            </span>
          </div>
        </template>
        <template #actions> </template>
      </Dialog>
    </teleport> -->
  </div>
</template>

<script setup lang="ts">
import useBlockSelectionStore from "~/store/block-selection";
import useUserActionsStore from "~/store/user-actions";

import DayType from "~/types/day-type";

import Dialog from "~/components/utility/dialog.vue";
import Tooltip from "~/components/utility/service-selector.vue";
import Day from "~/components/day.vue";

const blockSelectionStore = useBlockSelectionStore();
const userActionsStore = useUserActionsStore();

// Static Data

const today = new Date();
const startOfTheWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - today.getDay() + 1
);

const days: DayType[] = [
  { name: "Monday", weekday: 1, id: "1", date: startOfTheWeek },
  {
    name: "Tuesday",
    weekday: 2,
    id: "2",
    date: new Date(
      `${startOfTheWeek.getFullYear()}-${startOfTheWeek.getMonth() + 1}-${
        startOfTheWeek.getDate() + 1
      }`
    ),
  },
  {
    name: "Wednesday",
    weekday: 3,
    id: "3",
    date: new Date(
      `${startOfTheWeek.getFullYear()}-${startOfTheWeek.getMonth() + 1}-${
        startOfTheWeek.getDate() + 2
      }`
    ),
  },
  {
    name: "Thursday",
    weekday: 4,
    id: "4",
    date: new Date(
      `${startOfTheWeek.getFullYear()}-${startOfTheWeek.getMonth() + 1}-${
        startOfTheWeek.getDate() + 3
      }`
    ),
  },
  {
    name: "Friday",
    weekday: 5,
    id: "5",
    date: new Date(
      `${startOfTheWeek.getFullYear()}-${startOfTheWeek.getMonth() + 1}-${
        startOfTheWeek.getDate() + 4
      }`
    ),
  },
];

const humanReadableDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const services = ["Rendering", "Customer", "Checkout", "Routing"];

// Methods

const getDayModifier = (
  weekday: number
): "yesterday" | "today" | "tomorrow" | null => {
  const today = new Date().getDay();
  switch (weekday) {
    case today - 1:
      return "yesterday";
    case today:
      return "today";
    case today + 1:
      return "tomorrow";
    default:
      return null;
  }
};

// Computed
</script>

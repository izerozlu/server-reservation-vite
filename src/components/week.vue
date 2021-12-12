<template>
  <div class="week h-full grid grid-flow-col grid-cols-6 gap-x-3 px-2 py-4">
    <Day
      v-for="day in days"
      :key="day.name"
      :day="day"
      :modifier="getDayModifier(day.weekday)"
    />
  </div>
</template>

<script setup lang="ts">
import DayType from "~/types/day-type";

import Day from "~/components/day.vue";

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
</script>

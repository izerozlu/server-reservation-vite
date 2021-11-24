<template>
  <div class="week h-full grid grid-flow-col grid-cols-5 gap-x-3 px-2 py-4">
    <Day
      v-for="day in days"
      :key="day.name"
      :day="day"
      :modifier="getDayModifier(day.weekday)"
    />
    <!-- <portal to="dialog">
      <Dialog
        :show="isBlockSelectionActive"
        @close-dialog="cancelBlockSelection"
        @submit-dialog="takeReservedBlocks"
      >
        <template #title> Dialog Title </template>
        <template #content>
          <div class="dialog__content flex flex-col flex-grow">
            <Timezone
              v-for="timezone in selectableTimezones"
              :key="timezone.id"
              :timezone="timezone"
              :is-day-selected="true"
              :block-count="1"
            />
          </div>
        </template>
        <template #actions> </template>
      </Dialog>
    </portal> -->
  </div>
</template>

<script lang="ts">
import DayTemplate from "../interfaces/day-template";
import DayModifier from "../types/day-modifier";
</script>

<script setup lang="ts">
import Day from "./day.vue";

const days: DayTemplate[] = [
  { name: "Monday", weekday: 1, id: "1" },
  { name: "Tuesday", weekday: 2, id: "2" },
  { name: "Wednesday", weekday: 3, id: "3" },
  { name: "Thursday", weekday: 4, id: "4" },
  { name: "Friday", weekday: 5, id: "5" },
];

const getDayModifier = (weekday: number): DayModifier | null => {
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

// export default Vue.extend({
//   components: { Day },
//   data(): ComponentData {
//     return {
//       days: [
//         { name: "Monday", weekday: 1, id: "1" },
//         { name: "Tuesday", weekday: 2, id: "2" },
//         { name: "Wednesday", weekday: 3, id: "3" },
//         { name: "Thursday", weekday: 4, id: "4" },
//         { name: "Friday", weekday: 5, id: "5" },
//       ],
//     };
//   },
//   computed: {
//     ...mapState("store", ["selectedDay"]),
//   },
//   methods: {
//     ...mapActions("store", ["cancelBlockSelection"]),
//     getDayModifier: (weekday: number): DayModifier | null => {
//       const today = new Date().getDay();
//       switch (weekday) {
//         case today - 1:
//           return "yesterday";
//         case today:
//           return "today";
//         case today + 1:
//           return "tomorrow";
//         default:
//           return null;
//       }
//     },
//   },
// });
</script>

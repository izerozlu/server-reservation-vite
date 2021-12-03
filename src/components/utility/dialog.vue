<template>
  <div
    v-if="show"
    class="
      dialog
      h-screen
      w-screen
      absolute
      top-0
      left-0
      flex
      justify-center
      items-center
      bg-black bg-opacity-40
    "
  >
    <div
      class="
        dialog__window
        relative
        flex flex-col
        h-1/3
        w-1/3
        p-2
        bg-white
        rounded-md
        shadow-lg
      "
    >
      <h1 class="dialog__title text-xl mb-2">
        <slot name="title" />
      </h1>
      <button
        class="dialog__close absolute top-2 right-2 transform active:scale-75"
        type="button"
        @click="closeDialog"
      >
        <Close class="h-5 w-5" />
      </button>
      <slot name="content" />
      <footer class="dialog__actions flex justify-end">
        <slot name="actions" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Close from "~/assets/svg/close.svg?component";

// Props

const { show } = defineProps<{ show: boolean }>();

// Emits

const emit = defineEmits(["close-dialog"]);

// Methods

const closeDialog = () => {
  emit("close-dialog");
};
</script>

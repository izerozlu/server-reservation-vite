<template>
  <button
    :key="block.id"
    class="block h-full rounded flex-1"
    :class="{
      'bg-red-400': block.isTaken,
      'hover:bg-gray-200': !block.isTaken,
      'bg-yellow-400': isStartingBlock || isEndingBlock,
      'bg-yellow-200': isInBetweenBlock,
    }"
    type="button"
    :disabled="block.isTaken"
    @click="
      () =>
        isBlockSelectionActive
          ? finishBlockSelection(block)
          : startBlockSelection(block)
    "
    @mouseenter="() => hoverBlock({ block, isEnter: true })"
    @mouseleave="() => hoverBlock({ block, isEnter: false })"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import BlockTemplate from "../interfaces/block-template";

import { useStore } from "../store";
import { ActionTypes } from "../store/actions";

const store = useStore();

// Props

const { block } = defineProps<{ block: BlockTemplate }>();

// Computed

const isStartingBlock = computed(
  () => block.id === blockSelectionStartingBlock.value?.id
);
const isEndingBlock = computed(
  () => block.id === blockSelectionEndingBlock.value?.id
);
const isInBetweenBlock = computed(
  () =>
    blockSelectionStartingBlock.value &&
    hoveredBlock.value &&
    blockSelectionStartingBlock.value.column === block.column &&
    blockSelectionStartingBlock.value.timezone.row < block.timezone.row &&
    hoveredBlock.value.column === block.column &&
    hoveredBlock.value.timezone.row > block.timezone.row
);

// Computed (Store)

const hoveredBlock = computed(() => store.state.hoveredBlock);
const isBlockSelectionActive = computed(
  () => store.getters.isBlockSelectionActive
);
const blockSelectionStartingBlock = computed(
  () => store.getters.blockSelectionStartingBlock
);
const blockSelectionEndingBlock = computed(
  () => store.getters.blockSelectionEndingBlock
);

// Methods

const finishBlockSelection = (block: BlockTemplate) => {
  if (blockSelectionStartingBlock.value?.column === block.column) {
    if (blockSelectionStartingBlock.value.timezone.row > block.timezone.row) {
      cancelBlockSelection();
      startBlockSelection(block);
    } else {
      endBlockSelection(block);
    }
  } else {
    cancelBlockSelection();
  }
};

// Methods (Store)

const hoverBlock = (block: { block: BlockTemplate; isEnter: boolean }) => {
  if (isBlockSelectionActive.value) {
    store.dispatch(ActionTypes.HOVER_BLOCK, block);
  }
};
const startBlockSelection = (block: BlockTemplate) => {
  store.dispatch(ActionTypes.START_BLOCK_SELECTION, block);
};
const endBlockSelection = (block: BlockTemplate) => {
  store.dispatch(ActionTypes.END_BLOCK_SELECTION, block);
};
const cancelBlockSelection = () => {
  store.dispatch(ActionTypes.CANCEL_BLOCK_SELECTION);
};
</script>

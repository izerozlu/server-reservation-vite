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
import { BlockSelection } from "../store/block-selection/namespace";

const store = useStore();

// Props

const { block } = defineProps<{ block: BlockTemplate }>();

// Computed

const isStartingBlock = computed(() => block.id === startingBlock.value?.id);
const isEndingBlock = computed(() => block.id === endingBlock.value?.id);
const isInBetweenBlock = computed(
  () =>
    startingBlock.value && // is there a staringBlock
    hoveredBlock.value && // is there a hoveredBlock
    startingBlock.value.day.id === block.day.id && // if the startingBlock is on the same day
    startingBlock.value.column === block.column && // if the startingBlock is on the same column
    startingBlock.value.timezone.row < block.timezone.row && // if the startingBlock's row is lesser
    hoveredBlock.value.column === block.column && // if the hoveredBlock is on the same column
    hoveredBlock.value.timezone.row > block.timezone.row // if the hoveredBlock's row is greater
);

// Computed (Store)

const hoveredBlock = computed(() => store.state.hoveredBlock);
const isBlockSelectionActive = computed(
  () => store.state.blockSelection.active 
);
const startingBlock = computed(() => store.state.blockSelection.startingBlock);
const endingBlock = computed(() => store.state.blockSelection.endingBlock);

// Methods

const finishBlockSelection = (block: BlockTemplate) => {
  if (startingBlock.value?.column === block.column) {
    if (startingBlock.value.timezone.row > block.timezone.row) {
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
  store.dispatch(BlockSelection.ActionTypes.START_BLOCK_SELECTION, block);
};
const endBlockSelection = (block: BlockTemplate) => {
  store.dispatch(BlockSelection.ActionTypes.END_BLOCK_SELECTION, block);
};
const cancelBlockSelection = () => {
  store.dispatch(BlockSelection.ActionTypes.CANCEL_BLOCK_SELECTION);
};
</script>

<template>
  <button
    :key="block.id"
    class="block h-full rounded flex-1"
    :class="{
      'bg-red-400': block.isTaken,
      'bg-yellow-400': isStartingBlock || isEndingBlock,
      'bg-yellow-200': isInBetweenBlock,
      'hover:bg-gray-200':
        !(isStartingBlock || isEndingBlock) &&
        !isInBetweenBlock &&
        !block.isTaken,
    }"
    type="button"
    :disabled="block.isTaken"
    @click="
      () =>
        blockSelectionStore.active
          ? finishBlockSelection(block)
          : blockSelectionStore.startBlockSelection(block)
    "
    @mouseenter="() => userActionsStore.hoverBlock({ block })"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import BlockType from "~/types/block-type";

import useBlockSelectionStore from "~/store/block-selection";
import useUserActionsStore from "~/store/user-actions";

const blockSelectionStore = useBlockSelectionStore();
const userActionsStore = useUserActionsStore();

// Props

const { block } = defineProps<{ block: BlockType }>();

// Computed

const isStartingBlock = computed(
  () => block.id === blockSelectionStore.startingBlock?.id
);
const isEndingBlock = computed(
  () => block.id === blockSelectionStore.endingBlock?.id
);
const isInBetweenBlock = computed(() => {
  const {
    startingBlock,
    endingBlock,
    active: isBlockSelectionActive,
  } = blockSelectionStore;
  const { hoveredBlock } = userActionsStore;

  return isBlockSelectionActive
    ? startingBlock &&
        hoveredBlock &&
        startingBlock.day.id === block.day.id &&
        startingBlock.column === block.column &&
        startingBlock.timezone.row < block.timezone.row &&
        hoveredBlock.column === block.column &&
        hoveredBlock.timezone.row > block.timezone.row
    : startingBlock &&
        endingBlock &&
        startingBlock.day.id === block.day.id &&
        startingBlock.column === block.column &&
        startingBlock.timezone.row < block.timezone.row &&
        endingBlock.column === block.column &&
        endingBlock.timezone.row > block.timezone.row;
});

// Methods

const finishBlockSelection = (block: BlockType) => {
  const { startingBlock } = blockSelectionStore;

  if (startingBlock?.column === block.column) {
    // Same column with startingBlock
    if (startingBlock.timezone.row > block.timezone.row) {
      // startingBlock is above selected block
      blockSelectionStore.cancelBlockSelection();
      blockSelectionStore.startBlockSelection(block);
    } else {
      // startingBlock is below selected block
      blockSelectionStore.endBlockSelection(block);
    }
  } else {
    // Different column than startingBlock
    blockSelectionStore.cancelBlockSelection();
    blockSelectionStore.startBlockSelection(block);
  }
};
</script>

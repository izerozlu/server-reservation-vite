<template>
  <button
    :key="block.id"
    class="block h-full rounded flex-1"
    :class="{
      'bg-red-400': block.isTaken,
      'hover:bg-gray-200': !block.isTaken,
      'bg-yellow-400': isStartingBlock,
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

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions, mapState } from 'vuex';

import BlockTemplate from '~/interfaces/block-template';

export default Vue.extend({
  props: {
    block: {
      type: Object as () => BlockTemplate,
      default: () => {},
    },
  },
  computed: {
    ...mapState('store', ['hoveredBlock']),
    ...mapGetters('store', [
      'isBlockSelectionActive',
      'blockSelectionStartingBlock',
    ]),
    isStartingBlock() {
      return (
        (this.block as BlockTemplate).id ===
        this.blockSelectionStartingBlock?.id
      );
    },
    isInBetweenBlock() {
      return (
        this.blockSelectionStartingBlock?.column ===
          (this.block as BlockTemplate).column &&
        this.blockSelectionStartingBlock.timezone.row <
          (this.block as BlockTemplate).timezone.row &&
        this.hoveredBlock?.column === (this.block as BlockTemplate).column &&
        this.hoveredBlock.timezone.row >
          (this.block as BlockTemplate).timezone.row
      );
    },
  },
  methods: {
    ...mapActions('store', [
      'takeBlock',
      'hoverBlock',
      'startBlockSelection',
      'endBlockSelection',
      'cancelBlockSelection',
    ]),
    finishBlockSelection(block: BlockTemplate) {
      if (
        (this.blockSelectionStartingBlock as BlockTemplate).column ===
        block.column
      ) {
        this.endBlockSelection(block);
      } else {
        this.cancelBlockSelection();
      }
    },
  },
});
</script>

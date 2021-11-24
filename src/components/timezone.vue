<template>
  <component
    :is="isDaySelected ? 'div' : 'button'"
    class="timezone p-1 w-full text-left border border-transparent rounded"
    :class="{
      flex: isDaySelected,
      'items-center': isDaySelected,
      'hover:border-red-300': isDaySelected,
      'cursor-pointer': !isDaySelected,
    }"
    type="button"
  >
    <template v-if="!isSelectedTimezone">{{ timezone.zone }}</template>
    <template v-else>
      <span class="timezone__time w-8">{{ timezone.zone }}</span>
      <div class="timezone__blocks blocks flex items-center w-full h-full px-2">
        <Block
          v-for="block in blocks"
          :key="block.id"
          :block="block"
          class="timezone__block"
          :class="{
            'timezone__block--starting':
              isStartingTimezone && startingBlockColumn === block.column,
            'timezone__block--ending':
              isStartingTimezone && endingBlockColumn === block.column,
          }"
        />
      </div>
    </template>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import Block from '~/components/block.vue';

import TimezoneTemplate from '~/interfaces/timezone-template';
import BlockTemplate from '~/interfaces/block-template';

interface ComponentData {
  blocks: BlockTemplate[];
}

export default Vue.extend({
  components: { Block },
  props: {
    timezone: {
      type: Object as () => TimezoneTemplate,
      default: null,
    },
    isDaySelected: {
      type: Boolean,
      default: false,
    },
    blockCount: {
      type: Number,
      default: 5,
    },
    isStartingTimezone: {
      type: Boolean,
      default: false,
    },
    startingBlockColumn: {
      type: Number,
      default: null,
    },
    isEndingTimezone: {
      type: Boolean,
      default: false,
    },
    endingBlockColumn: {
      type: Number,
      default: null,
    },
  },
  data(): ComponentData {
    return {
      blocks: new Array(this.blockCount).fill(0).map((_, index: number) => {
        return {
          id: `${this.timezone.day.id}_${this.timezone.id}_${index + 1}`,
          day: this.timezone.day,
          timezone: this.timezone,
          column: index + 1,
          isTaken: false,
        };
      }),
    };
  },
  computed: {
    ...mapState('store', ['selectedTimezone', 'takenBlocks']),
    isSelectedTimezone(): boolean {
      return this.isDaySelected;
    },
  },
  methods: {
    ...mapActions('store', ['takeBlock', 'hoverBlock']),
  },
});
</script>

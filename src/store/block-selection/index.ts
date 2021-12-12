import { defineStore } from "pinia";
import BlockType from "~/types/block-type";
import ServiceType from "~/types/service.type";
import Nullable from "~/types/utility/nullable";

const useBlockSelectionStore = defineStore("block-selection", {
  state: () => ({
    active: false,
    startingBlock: null as Nullable<BlockType>,
    endingBlock: null as Nullable<BlockType>,
    selectedService: null as Nullable<ServiceType>,
  }),
  getters: {
    selectedReservation: (state) => {
      return {
        startTime: state.startingBlock?.timezone.zone,
        endTime: state.endingBlock?.timezone.zone,
        service: state.selectedService,
        day: state.startingBlock?.day.weekday,
      };
    },
  },
  actions: {
    startBlockSelection(block: BlockType) {
      this.active = true;
      this.startingBlock = block;
      this.endingBlock = null;
    },
    endBlockSelection(block: BlockType) {
      this.endingBlock = block;
    },
    cancelBlockSelection() {
      this.active = false;
      this.startingBlock = null;
      this.endingBlock = null;
      this.selectedService = null;
    },
    setSelectedService(service: ServiceType) {
      this.selectedService = service;
    },
    finalizeBlockSelection() {
      if (this.startingBlock && this.endingBlock) {
        const column = this.startingBlock.column;
        const timezones = this.startingBlock.timezone.day.timezones;

        if (timezones) {
          const blocks = timezones.map((timezone) =>
            timezone.blocks?.find((block) => block.column === column)
          );
          const inBetweenBlocks = blocks.filter((block) => {
            const startingRow = this.startingBlock?.timezone.row;
            const endingRow = this.endingBlock?.timezone.row;
            const row = block?.timezone.row;

            if (!!row && !!startingRow && !!endingRow) {
              return startingRow < row && endingRow > row;
            } else {
              return false;
            }
          });

          this.active = false;
          this.startingBlock.isTaken = true;
          this.startingBlock.service = this.selectedService as ServiceType;
          this.endingBlock.isTaken = true;
          this.endingBlock.service = this.selectedService as ServiceType;
          inBetweenBlocks.forEach((block) => {
            if (block) {
              block.isTaken = true;
              block.service = this.selectedService as ServiceType;
            }
          });

          this.cancelBlockSelection();
        }
      }
    },
  },
});

export default useBlockSelectionStore;

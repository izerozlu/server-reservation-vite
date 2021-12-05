<template>
  <div
    class="
      tooltip
      absolute
      top-0
      left-0
      h-full
      w-full
      rounded-md
      bg-black bg-opacity-50
      flex flex-col
    "
    :class="{
      'items-end': tooltipPosition === 'right',
      'items-start': tooltipPosition === 'left',
    }"
  >
    <div
      class="
        tooltip__content
        content
        flex flex-col
        bg-white
        border border-gray-600
        rounded-md
        w-2/5
        overflow-hidden
        py-1
      "
    >
      <input
        class="outline-none py-1 px-2"
        type="text"
        v-model="serviceSearchText"
        placeholder="Search services"
      />
      <button
        class="py-1 px-2 text-left hover:bg-yellow-500 hover:text-white"
        v-for="service in filteredServices"
        :key="service"
        @click="finalizeSelection(service)"
      >
        {{ service }}
      </button>
      <div
        v-if="!filteredServices.length"
        class="content__empty-list-message text-gray-600 px-2"
      >
        Could not find any services matching your search.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import useBlockSelectionStore from "~/store/block-selection";
import ServiceType from "~/types/service.type";
import Nullable from "~/types/utility/nullable";

const blockSelectionStore = useBlockSelectionStore();

// Data

const serviceSearchText = ref<string>("");

// Static Data

const services: ServiceType[] = [
  "Calculation",
  "Car",
  "Content",
  "Core",
  "Customer",
  "Email",
  "Erp-Connector",
  "Frontend",
  "JPayment",
  "Order",
  "Payment",
  "Platform",
  "Price",
  "Product",
  "Routing",
  "Search",
  "Stock",
  "Styleguide",
  "Teclogic",
  "Rendering",
];

// Computed

const tooltipPosition = computed(() => {
  const { startingBlock } = blockSelectionStore;
  const column = startingBlock?.column ?? 0;

  return column > 3 ? "left" : "right";
});

const filteredServices = computed(() => {
  return services.filter((service) =>
    service.toLowerCase().includes(serviceSearchText.value.toLowerCase())
  );
});

// Methods

const finalizeSelection = (service: ServiceType) => {
  blockSelectionStore.setSelectedService(service);
  blockSelectionStore.finalizeBlockSelection();
};
</script>

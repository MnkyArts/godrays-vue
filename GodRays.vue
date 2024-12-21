<template>
  <div
    ref="containerRef"
    :style="{
      borderRadius: props.radius,
      overflow: 'hidden',
      backgroundColor: props.backgroundColor,
      ...props.style,
    }"
  >
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useThreeSetup } from "./useThreeSetup";
import type { GodRaysProps } from "./types";

const props = defineProps<GodRaysProps>();
const { containerRef, canvasRef } = useThreeSetup(props);
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

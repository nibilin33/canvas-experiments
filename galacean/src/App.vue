<script setup lang="ts">
import { onMounted } from "vue";
import { createRuntime, createLottie, createGLft } from "./runtime";

onMounted(() => {
  createRuntime();
  // createGLft();
})
</script>

<template>
	<canvas style="width: 100vw; height: 100vh" id="canvas" />
</template>


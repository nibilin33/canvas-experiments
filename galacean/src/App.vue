<script setup lang="ts">
import { onMounted } from "vue";
import { createRuntime, createLottie } from "./runtime";

onMounted(() => {
  // createRuntime();
  console.log('fuckkkkk')
  createLottie()
})
</script>

<template>
	<canvas style="width: 100vw; height: 100vh" id="canvas" />
</template>


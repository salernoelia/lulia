<template>
    <div class="game-canvas">
      <div :style="{ transform: `translate(${translateX}px, ${translateY}px)` }" class="character"></div>
    </div>
  </template>
  
  <script setup>
  const translateX = ref(400)
  const translateY = ref(300)
  
  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    translateY.value -= 10
  })
  
  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    translateY.value += 10
  })
  
  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    translateX.value -= 10
  })
  
  onKeyStroke(['d', 'D', 'ArrowRight'], () => {
    translateX.value += 10
  })
  </script>
  
  <style lang="scss" scoped>
  .game-canvas {
    top: 200px;
    left: 200px;
    background-color: gray;
    width: 800px;
    height: 600px;
  }
  
  .character {
    background-color: black;
    width: 50px;
    height: 80px;
  }
  </style>
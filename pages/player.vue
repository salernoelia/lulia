<template>
    <div class="game-canvas">
      <div :style="{ transform: `translate(${translateX}px, ${translateY}px)` }" class="character">
        <img :src="stand ? characterSprite.stand : characterSprite.run"  alt="">
      </div>
    </div>
  </template>
  
  <script setup>
const translateX = ref(350);
const translateY = ref(350);
const stand = ref(true)

let currentIndex =  0;
const characterSprite = { 
      stand: '/sprites/stand.png',
      run: '/sprites/run.png'
  }

  onKeyStroke(['w', 'W', 'ArrowUp'], () => {
    translateY.value -= 50
    stand.value = !stand.value
  })
  
  onKeyStroke(['s', 'S', 'ArrowDown'], () => {
    translateY.value += 50
    stand.value = true
  })
  
  onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
    translateX.value -= 50
  })
  
  onKeyStroke(['d', 'D', 'ArrowRight'], () => {
    translateX.value += 50
  })
  </script>
  
  <style lang="scss" scoped>
  .game-canvas {
    top: 200px;
    left: 200px;
    background-color: rgb(210, 210, 210);
    width: 800px;
    height: 800px;
  }
  
  .character {
    width: 50px;
    height: 50px;
  }
  </style>
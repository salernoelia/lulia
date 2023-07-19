<template>
    <div>
        <Console :values="{ range }" />
        <input fixed left-50vw top-50vw type="range" v-model="range" />
        <button @click="sbb.play()">play</button>
    </div>
</template>

<script setup>
const sbb = useSound("/sounds/sbb.mp3")
const range = ref(0)
</script>

<style scoped>
input[type=range] {
    transform: rotate(270deg); /* Rotate the slider vertically */
}
</style>
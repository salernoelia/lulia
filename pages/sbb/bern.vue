<template>
    <div flex flex-row w-screen h-screen overflow-hidden>
        <div flex flex-col w-100vw>
            <template v-for="n in 12">
                <input w-200% ml--50% class="zug" :class="'zug-' + n" type="range" step="0.01" :value="n === 15 ? 100 : 0" />
                <div class="perron" bg-gray h-50px>gleis {{ n }}</div>
            </template>
        </div>
    </div>
</template>

<script setup>
const abfahrt = useSound("/sounds/abfahrt.mp3")
const einfahrt = useSound("/sounds/einfahrt.m4a")

const abfahren = () => {
    abfahrt.seek(3)
    abfahrt.play()
    useAnime({ targets: '.zug-3', value: 100, duration: 20000, delay: 5000, easing: 'easeInQuad' })
}

const einfahren = () => {
    einfahrt.play()
    console.log('einfahren')
    useAnime({ targets: '.zug-15', value: 0, duration: 20000, easing: 'easeOutQuad' })
}

onKeyStroke(['a', 'A'], (e) => {
  e.preventDefault()
  abfahren()   
})

onKeyStroke(['e', 'E'], (e) => {
  e.preventDefault()
  einfahren()   
})

</script>
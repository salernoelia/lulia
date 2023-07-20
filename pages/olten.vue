<template>
    <div flex flex-row w-screen h-screen overflow-hidden>
        <div flex flex-col w-100vw>
            <template v-for="n in 8">
                <input w-200% ml--50% class="zug" :class="'zug-' + n" type="range" step="0.01" :value="n % 2 === 0 || n === 7 ? 0 : 50" />
                <div class="perron" bg-gray h-50px>gleis {{ n }}</div>
            </template>
        </div>
    </div>
</template>

<script setup>
const abfahrt = useSound("/sounds/abfahrt.mp3")
const einfahrt = useSound("/sounds/einfahrt.m4a")
const durchfahrt = useSound("/sounds/durchfahrt.m4a")


const abfahren = () => {
    abfahrt.seek(3)
    abfahrt.play()
    useAnime({ targets: '.zug-1', value: 100, duration: 20000, delay: 5000, easing: 'easeInQuad' })
}

const einfahren = () => {
    einfahrt.play()
    console.log('einfahren')
    useAnime({ targets: '.zug-8', value: 50, duration: 20000, easing: 'easeOutQuad' })
}

const durchfahren = () => {
    durchfahrt.play()
    console.log('durchfahren')
    useAnime({ targets: '.zug-8', value: 100, duration: 20000, easing: 'linear' })
}

onKeyStroke(['a', 'A'], (e) => {
  e.preventDefault()
  abfahren()   
})

onKeyStroke(['e', 'E'], (e) => {
  e.preventDefault()
  einfahren()   
})

onKeyStroke(['d', 'D'], (e) => {
  e.preventDefault()
  durchfahren()   
})

</script>
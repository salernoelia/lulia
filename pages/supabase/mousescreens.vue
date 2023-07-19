<template>
	<div w-screen h-screen overflow-hidden relative>
		<Console :values="{ sonyMouseState, iPhoneMouseState, x, y }">{{ dragStyles(sonyDrag) }}</Console>
		<div ref="sonyRef" :style="dragStyles(sonyDrag)" fixed w-50px h-100px bg-blue>sony screen</div>
		<div ref="appleRef" :style="dragStyles(appleDrag)" fixed w-300px h-200px bg-red>computer screen</div>
		<div ref="iPhoneRef" :style="dragStyles(iPhoneDrag)" fixed w-50px h-80px bg-orange>iphone screen</div>
		<div ref="iPadRef" :style="dragStyles(iPadDrag)" fixed w-150px h-200px bg-pink>iPad screen</div>
	</div>
</template>

<script setup>
const sonyRef = ref(null)
const appleRef = ref(null)
const iPhoneRef = ref(null)
const iPadRef = ref(null)
const sonyDrag = useDraggable(sonyRef, { initialValue: { x: 100, y: 100 } })
const iPhoneDrag = useDraggable(iPhoneRef, { initialValue: { x: 450, y: 100 } })
const appleDrag = useDraggable(appleRef, { initialValue: { x: 150, y: 100 } })
const iPadDrag = useDraggable(iPadRef, { initialValue: { x: 150, y: 100 } })
const { x, y, sendScreen } = useScreenParty()

const sonyMouseState = useMouseInElement(sonyRef)
const iPhoneMouseState = useMouseInElement(iPhoneRef)
const iPadMouseState = useMouseInElement(iPadRef)

watchEffect(() => {
	if (!sonyMouseState.isOutside.value) {
		sendScreen.value({
			screenName: "sony",
			x: sonyMouseState.elementX.value,
			y: sonyMouseState.elementY.value,
			width: sonyMouseState.elementWidth.value,
			height: sonyMouseState.elementHeight.value,
		})
	}

	if (!iPhoneMouseState.isOutside.value) {
		sendScreen.value({
			screenName: "iPhone",
			x: iPhoneMouseState.elementX.value,
			y: iPhoneMouseState.elementY.value,
			width: iPhoneMouseState.elementWidth.value,
			height: iPhoneMouseState.elementHeight.value,
		})
	}

	if (!iPadMouseState.isOutside.value) {
		sendScreen.value({
			screenName: "iPad",
			x: iPadMouseState.elementX.value,
			y: iPadMouseState.elementY.value,
			width: iPadMouseState.elementWidth.value,
			height: iPadMouseState.elementHeight.value,
		})
	}
})

const dragStyles = (dragger) => {
	return { transform: `translate(${dragger.x.value}px, ${dragger.y.value}px)`, zIndex: dragger.isDragging.value ? 1 : 0 }
}
</script>

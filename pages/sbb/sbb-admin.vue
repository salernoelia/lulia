<template>
	<div>
		<div>sbb admin</div>
		<button @click="sendSBB({ at: 'Olten', from: 'Zürich Hauptbahnhof', to: 'Bern', gleis: 3 })">send payload</button>
		<div>
			<pre>newest info: {{ info }}</pre>
		</div>
	</div>
</template>

<script setup>
const { sendSBB, info } = useSBB()
</script>

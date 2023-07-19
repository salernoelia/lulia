<template>
    <div>
        {{  bahnhof }}
    </div>
</template>

<script setup>
const client = useSupabaseClient()
let { data: bahnhof, error } = await client
  .from('bahnhof')
  .select('*')
</script>
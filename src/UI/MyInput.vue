<template>
  <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" class="input" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    title: String,
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 1px solid darkblue !important;
}
</style>
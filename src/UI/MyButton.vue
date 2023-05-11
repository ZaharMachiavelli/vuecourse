<template>
    <button class="btn"><slot /></button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
  border: none;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  align-self: flex-end;
  padding: 10px;
}

.btn.danger {
 background-color: red; 
}
</style>
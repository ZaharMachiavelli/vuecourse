<template>
  <div class="dialog" v-if="show" @click="$emit('hideDialog')">
    <div @click.stop class="dialog__content">
      <h3>Создать запись</h3>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog__content {
  min-width: 300px;
  min-height: 50;
  padding: 30px 15px;
  border-radius: 10px;
  background: white;
}
</style>
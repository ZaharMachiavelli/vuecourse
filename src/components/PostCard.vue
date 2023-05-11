<template>
  <div class="post" ref="postCard" @click="isActive=!isActive" :class="{'active': isActive}">
    <div>
      <router-link :to="`/post/${item.id}`">{{ item.title }}</router-link>
      <p><strong>Описание</strong> {{ item.body }}</p>
    </div>
    <my-button @click="deletePost" :ref="postCard">Удалить</my-button>
  </div>
</template>

<script lang="ts">
import { IPost } from '@/interfaces/post';
import { DefineComponent, PropType, defineComponent, onMounted,ref } from 'vue';
export default defineComponent({
  props: {
    item: {required: true, type: Object as PropType<IPost>},
  },
  setup(props, context) {
    function deletePost() {
      context.emit('deletePost', props.item.id);
    }

    function changeBorder() {
      if (postCard.value !=null)
      if (postCard.value.classList.contains('active')) {
        postCard.value.classList.remove('active');
      } else {
        postCard.value.classList.add('active');
      }
    }
    const isActive = ref(false);
    const postCard = ref<null|DefineComponent>(null);

    onMounted(() => {changeBorder();})

    return {isActive, postCard, deletePost, changeBorder}
  }
  // data() {
  //   return {
  //     isActive: false,
  //   }
  // },
  // methods: {
  //   deletePost() {
  //       this.$emit('deletePost', this.item.id);
  //   },
  //   changeBorder() {
  //     if (this.$refs.post_card.classList.contains('active')) {
  //       this.$refs.post_card.classList.remove('active');
  //     } else this.$refs.post_card.classList.add('active');
      
  //   }
  // }
});
</script>

<style scoped>
.post {
  margin: 10px 0;
  padding: 10px 5px;
  border: 2px solid darkblue;
  display: flex;
  justify-content: space-between;
}

.post.active {
  border-color: red;
}
</style>
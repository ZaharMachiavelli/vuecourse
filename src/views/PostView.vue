<template>
    <div class="about" v-if="post">
      <h1>Страница поста</h1>
      <p>{{ post.title }}</p>
      <p>{{ post.body }}</p>
    </div>
    <h2 v-else>Идет загрузка...</h2>
  </template>
  
<script>
import axios from "axios";

export default {
    data() {
        return {
            post: null,
        }
    },
    async mounted() {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`);
            if (response.status == 200) {
                this.post = response.data;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
</script>
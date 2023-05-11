<template>
  <DialogModal :show="show" @hideDialog="show = false">
    <form class="form" @submit.prevent>
      <my-input v-model:title="title" v-english="10" />
      <my-input v-model:title="body" v-english />
      <my-button @click="addPost">Добавить</my-button>
    </form>
  </DialogModal>
  <my-input v-model:title="searching" placeholder="Поиск"/>
  <button @click="itemRefs[0].deletePost">Удалить пост</button>

  <div class="post__btns">
    <my-button @click="show = true">Создать запись</my-button>
    <select-post v-model="selectedSort" :options="options"/>
  </div>

  <div v-if="sortedAndFilteredPosts.length">
    <PostCard
      v-for="post in [...sortedAndFilteredPosts, $store.state.post].slice((activePage - 1) * limit, (activePage-1) * limit + limit)"
      :key="post.id"
      :item="post"
      :ref="setItemRef"
      @deletePost="deletePost"
    />
  </div>
  <h2 v-else>Постов нет</h2>

  <div class="pagination" v-if="pagesCount > 1">
    <button class="pagination__btn" :class="{active: activePage == page}" v-for="page in pagesCount" :key="page" @click="activePage = page">{{ page }}</button>
  </div>
</template>

<script lang="ts">
import PostCard from "@/components/PostCard.vue";
import DialogModal from "@/components/DialogModal.vue";
import MyButton from "../UI/MyButton.vue";
import axios from "axios";
import SelectPost from '@/components/SelectPost.vue';
import MyInput from '..//UI/MyInput.vue';
import {mapState} from 'vuex';
import { IPost } from "@/interfaces/post";
import { DefineComponent } from "vue";
import { State } from "@/store";

type Component = DefineComponent & {changeBorder: () => void}

export default {
  components: {
    PostCard,
    DialogModal,
    MyButton,
    SelectPost,
    MyInput
  },
  data() {
    return {
      title: "",
      body: "",
      show: false,
      selectedSort: '' as Exclude<keyof IPost, 'id'>,
      searching: '',
      limit: 10,
      activePage: 1,
      itemRefs: [] as Component[],
      options: [
        {name: 'По названию', value: 'title'},
        {name: 'По содержимому', value: 'body'},
      ],
      posts: [
        { id: 1, title: "HTML", body: "Язык разметки" },
        { id: 2, title: "CSS", body: "Язык стилей" },
        { id: 3, title: "JS", body: "Язык скриптов" },
        { id: 4, title: "Vue", body: "Frontend-фреймворк" },
      ],
    };
  },
  methods: {
    addPost() {
      const newPost = {
        id: new Date().getMilliseconds(),
        title: this.title,
        body: this.body,
      };
      this.posts.push(newPost);
      this.title = "";
      this.body = "";
      this.show = false;
    },
    deletePost(id: number) {
      this.posts = this.posts.filter((el) => el.id != id);
    },
    async getPosts() {
      try {
        const response = await axios.get<IPost[]>(
          "https://jsonplaceholder.typicode.com/posts",
        );
        if (response.status == 200) {
          this.itemRefs = [];
          this.posts = response.data;
        }
      } catch (e) {
        console.error(e);
      }
    },
    setItemRef(el: Component) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    changeBorder() {
      this.itemRefs[0].isActive = true;
    }
  },
  async mounted() {
      await this.getPosts();
      console.log(this.itemRefs);
      this.$store.dispatch('auto/setCar', 'Volkswagen');
    },
    watch: {
      searching() {
        this.activePage = 1;
      }
    },
    computed: {
      sortedPosts() {
        if(!this.selectedSort) return this.posts;
        return [...this.posts].sort((post1,post2) => {
          return post1[this.selectedSort].localeCompare(post2[this.selectedSort]);
        })
      },
      sortedAndFilteredPosts() {
       return  this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searching.trim().toLowerCase()))
      },
      pagesCount() {
        return Math.ceil([...this.sortedAndFilteredPosts, this.$store.state.post].length / this.limit);
      },
    }
  
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input {
  outline: none;
}

body {
  padding: 0 10px;
}

.form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.input {
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 1px solid darkblue !important;
}

.post__btns {
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;
  column-gap: 10px;
}

.pagination__btn {
  border: 1px solid blue;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  background-color: white;
  cursor: pointer;
}

.pagination__btn.active {
  background-color: blue;
  color: white;
}
</style>
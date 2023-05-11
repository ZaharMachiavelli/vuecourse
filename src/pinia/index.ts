import { State } from "@/store";
import {defineStore} from 'pinia';
import { IPost } from "@/interfaces/post";



export const usePostStore = defineStore('postStore', {
    state: (): State => {
        return {
            post: {
                id: 103,
                title: 'Pinia Post',
                body: 'Pinia Description'
            }
        }
    },
    getters: {
        getPost(): IPost {
            return {...this.post, title: 'Pinia Global Post'}
        }
    },
    actions: {
        changePost(newId: number) {
            this.post.id = newId;
        }
    }
})
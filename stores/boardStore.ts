import { defineStore } from 'pinia';
import { ref } from 'vue';

const boardData = {};

export const useBoardStore = defineStore('boardStore', () => {
    const board = ref(boardData);

    return {
        board,
    };
});

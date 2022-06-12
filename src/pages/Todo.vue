<template>
<div class="container">
    <h2 class="h2 search">Список задач</h2>
    <div class="container">
        <div class="card search">
            <input class="input search__input mb-20" name="display_name" placeholder="Введите данные для поиска" type="text" v-model="title">
            <input class="input search__input mb-20" name="display_name" placeholder="Введите данные для поиска" type="text" v-model="body">
            <button class="btn" @click="addTask()">
                Добавить задачу
            </button>
        </div>
        <BasePost :cards="tasks" @update:cards="tasks = $event"/>
    </div>
</div>
</template>

<script>
import BasePost from '@/components/BasePost';

export default {
name: 'myTodo',
components: { BasePost },
data() {
    return {
    tasks: [],
    historyTask: [],  
    title: '',
    body: '',
    }
},
methods: {
    addTask: function() {
        this.tasks.push({title: this.title, body: this.body})
        this.title = ''
        this.body = ''
    }
},
}
</script>

<style lang="scss">
.content__title{
    text-align: center;
    margin: 300px 0px 0px 0px;
}
.mb-20{
    margin-bottom: 20px;
}
</style>

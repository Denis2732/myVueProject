<template>
<div class="container">
    <h2 class="h2 search">Реализация поиска, пагинации, API, передача в store кол-ва постов</h2>
    <h3>Кол-во постов: <span class="red num-posts">{{ $store.state.count }}</span></h3>
      <div class="container title">
        <div class="card search">
        <input class="input search__input" name="display_name" placeholder="Введите данные для поиска" type="text" v-model="search">
    </div>
  </div>
    <BasePost :cards="cards"/>
    <Paginate :page="page" @paginate="page = $event" :count="countCards" :per-page="cardPerPage"/>
</div>
</template>

<script>
import Paginate from '@/components/Paginate';
import BasePost from '@/components/BasePost';

export default {
name: 'searchInput',
components: { Paginate, BasePost },
data() {
    return {
        search: '',
        todos: [],
        page: 1,
        cardPerPage: 10,
    };
},
computed: {
    todosByTitle() {
        return this.todos.filter(item => item.title.lastIndexOf(this.search) > -1)
    },
    cards(){
        const offset = (this.page - 1) * this.cardPerPage
        return this.todosByTitle.slice(offset, offset + this.cardPerPage)
    },
    countCards() {
        this.countStateCard(this.todosByTitle.length)
        return this.todosByTitle.length
    },
},
methods: {
    countStateCard(data){
        this.$store.commit(
            "addToCardNumber",
            data
        )
    },
},
beforeMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
        this.todos = json;
        })
},
}
</script>

<style lang="scss">
.name{
    margin-top: 30px;
    text-align: center;
    margin-bottom: 0!important;
}
.num-posts{
    font-size: 24px;
    font-weight: 700;
}
.title-abuse{
    text-align: center;
    margin-top: 100px;
}
.card{
    width: 300px!important;
    display: flex;
    flex-direction: column;
    margin: 40px auto;
    padding: 32px;
    width: 100%;
    color: #333333;
    background: #FFFFFF;
    border-radius: 24px;
    box-shadow: 0px 4px 15px rgba(51, 51, 51, 0.1);
    border: 1px solid rgba(51, 51, 51, 0.15);
}
.search{
    margin-left: 0px!important;
    margin-top: 20px!important;
    width: 600px!important;
    margin-bottom: 30px!important;
    &.top{
        width: 100%!important;
        margin-top: 10px!important;
        margin-bottom: 0px!important;
    }
}
.h2{
    &.search{
        width: 100%!important;
        margin-top: 100px!important;
    }
}
.incorrect-name{
    margin-bottom: 30px;
}
.input{
    height: 40px;
    padding-left: 15px;
    border: 1px solid #62B759!important;
}
.search__input{
    text-transform: initial;
}
</style>

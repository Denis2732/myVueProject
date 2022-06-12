<template>
    <div class="card search top" v-for="(item, key) in cards" :key="key">
        <h3 class="title-search">{{item.title}}</h3>
        <p class="text-search">{{item.body}}</p> 
        <div :class="['header__navigation', {'todo-close' : ($route.name == 'todo')}]" v-if="$route.name == 'todo'" @click="closeTask(key)">
          <div class="header__navigation-line_close left"></div>
          <div class="header__navigation-line_close right"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BasePost',
  props: ['cards'],
  methods: {
    closeTask: function(key){
      const newCard = this.cards.filter((item, index) => index != key)
      this.$emit("update:cards", newCard)
    }
  },
}
</script>

<style lang="scss">
.title{
  margin-top: 70px;
}
.search{
  position: relative!important;
}
.todo-close{
  position: absolute;
  top: 24px;
  right: 24px;
}
</style>


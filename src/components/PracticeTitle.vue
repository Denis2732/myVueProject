<template>
  <div class="container title">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'PracticeTitle',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">
.title{
  margin-top: 70px;
}
</style>


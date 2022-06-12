<template>
<div class="container container-paginate">
    <div class="paginate">
        <button class="paginate__btn paginate__btn-arrow-prev"
        @click.prevent="paginatePrev(page)"></button>
        <button :class="['paginate__btn paginate__btn-number', {'active' : pageNum == page}]"
        v-for="(pageNum, key) in pages"
        :key="key"
        @click="paginate(pageNum)">
        {{pageNum}}
        </button>
        <button class="paginate__btn paginate__btn-arrow-next"
        @click.prevent="paginateNext(page)"></button>
    </div>
</div>
</template>

<script>
export default {
name: 'myPaginate',
model: {
    prop: 'page',
    event: 'paginate',
},
props: ['page', 'count', 'perPage'],
computed: {
    pages() {
        return Math.ceil(this.count / this.perPage);
    },  
},
methods: {
    paginate(page) {
        this.$emit('paginate', page);
    },
    paginatePrev(page) {
        if (page > 1) {
        this.$emit('paginate', page - 1);
        }
    },
    paginateNext(page) {
        if (page < this.pages) {
        this.$emit('paginate', page + 1);
        }
    },
},
}
</script>

<style lang="scss">
.container-paginate{
    display: flex;
    justify-content: center;
}   
.paginate{
    margin: 0 auto;
    margin-bottom: 40px;
    display: flex;
    &__btn{
        width: 40px;
        height: 40px;
        border: 1px solid #00923A;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 5px;
        margin-top: 20px;
        :last-child{
            margin-right: 0;
        }
        &:hover{
            border: 1px solid rgba(233,38,45, 1);
        }
    }
    &__btn-arrow-prev{
        background-image: url(../assets/img/prev_o.png);


    }
    &__btn-arrow-next{
        background-image: url(../assets/img/next_o.png);
    }
    &__btn-number{
        color: #00923A;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.active{
            font-weight: 700;
        }
    }
}

</style>

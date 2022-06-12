<template>
<div class="wrapper">
  <div class="container">
    <header class="header">
      <div class="header__navigation" v-if="!menuOpen" @click="openMenu()">
        <div class="header__navigation-line"></div>
        <div class="header__navigation-line"></div>
        <div class="header__navigation-line"></div>
      </div>
      <div class="header__navigation" v-if="menuOpen" @click="closeMenu()">
        <div class="header__navigation-line_close left"></div>
        <div class="header__navigation-line_close right"></div>
      </div>
      <div class="header__description">
        Пилю на Vue
      </div>
    </header>
    <div class="menu" v-if="menuOpen">
      <ul class="menu__items">
        <li :class="['menu__item', {'active' : ($route.name == item.name)}]" v-for="(item, key) in menu" :key="key">
          <router-link @click="menuOpen = false" href="#" :to="{name: item.name}">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</div>

</template>

<script>
import menu from '@/data/menu';


export default {
name: 'myMenu',
data: function () {
    return {
        menu,
        menuOpen: false,
    }
},
methods: {
  openMenu: function(){
    this.menuOpen = true
  },
  closeMenu: function(){
    this.menuOpen = false
  },
},

}
</script>

<style lang="scss">
.hide{
  display: none;
}
.menu{
  margin: 20px 0px 10px 0px;
  &__item{
    margin-bottom: 10px;
    padding-bottom: 10px;
    font-size: 18px;
    border-bottom: 1px solid rgba(115, 190, 67, 1);
    cursor: pointer;
    color: #777676;
    &.active{
      color: #000000;
      position: relative;
      &::after{
        position: absolute;
        content: "";
        background: url(../assets/img/active.svg);
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        top: 0;
        bottom: 10px;
        right: 24px;
        margin: auto;
      }
    }
    &:hover{
      color: rgba(115, 190, 67, 1);
    }
    &:last-child{
      margin-bottom: 10px;
      border-bottom: none;
    }
  }
}
.wrapper{
    margin: auto;
    background: #FFFFFFFF;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #73be43;
    margin-bottom: 10px;
    z-index: 10;
}
.header{
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 0;
  height: 60px;
  
  &__description{
    font-size: 18px;
    line-height: 24px;
  }
  &__navigation{
    display: flex;
    width: 30px;
    height: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    border: 1px solid rgba(115, 190, 67, 1);
    position: relative;
    &-line{
      background: rgba(115, 190, 67, 1);
      width: 20px;
      height: 3px;
      margin-bottom: 4px;
      &_close{
        background: rgba(115, 190, 67, 1);
        width: 20px;
        height: 3px;
        &.left{
          transform: rotate(45deg);
          position: absolute;
          top: 13px;
        }
        &.right{
          transform: rotate(-45deg);
          top: 13px;
          position: absolute;
        }
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
    &:hover{
      border: 1px solid rgba(233,38,45, 1);
    }

  }
}
</style>

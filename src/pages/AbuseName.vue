<template>
<div class="container">
    <h2 class="title-abuse">Проверочные ругательные слова: 'Хуйня', 'Еблан', 'Мудак', 'Урод', 'Сука', "Мразь".</h2>
    <div class="card">
        <div class="incorrect-name" v-if="errorName" >Введите корректное имя</div>
        <input class="input" :disabled="disableInput" name="display_name" placeholder="Введите свое имя" required="" type="text" v-model="name"/>
        <button class="btn" v-if="!FixedName" @click="verificationName()">
            Зафиксировать имя
        </button>
        <button class="btn" v-if="FixedName" @click="resetName()">
            Сбросить имя
        </button>
        <h3 class="name" v-if="FixedName">Привет {{name}}!</h3>
    </div>
</div>
</template>

<script>
import abusive from '@/data/abuser';

export default {
name: 'abuserName',
data: function () {
    return {
        abusive,
        name: '',
        errorName: false,
        FixedName: false,
        disableInput: false,
    }
},    
methods: {
    verificationName: function(){
        // приводим первую букву имени к верхнему регистру
        this.name = this.name.charAt(0).toUpperCase() + this.name.substring(1).toLowerCase();
        var name = this.name;
        function verName(element) {
            return element == name;
        }
        var abuseArray = this.abusive[0].abusiveName;

        if(abuseArray.some(verName)) {
            this.errorName = true;
        } else {
            this.FixedName = true;
            this.disableInput = true;
            this.errorName = false;
        }
    },
    resetName: function(){
        this.FixedName = false;
        this.disableInput = false;
        this.errorName = false;
        this.name = '';
    }
},
}
</script>

<style lang="scss">
.name{
    margin-top: 30px;
    text-align: center;
    margin-bottom: 0!important;
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
.incorrect-name{
    margin-bottom: 30px;
}
.input{
    height: 40px;
    padding-left: 15px;
    border: 1px solid #62B759!important;
    text-transform: capitalize;  
}
</style>

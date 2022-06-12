<template>
<div class="container">
    <Title msg="Тестирование - ответь на все вопросы верно."/>
    <h3 class="h3">Внимательней, вопросы и ответы каждый раз перемешиваются!</h3>
    <div v-for="(item, index) in testArray" :key="index">
    
        <div v-if="item.type == 'checkbox' && counterItems === index">
            <h1 class="h1">{{item.text}}</h1>
            <div 
            :class="['checkbox', {'correct' : (answer.selected && answer.correct && btnNext)}, {'incorrect' : (answer.selected && !answer.correct && btnNext)}, {'correct-incorect' : (!answer.selected && answer.correct && btnNext)}]"
            v-for="(answer, key) in item.answers" :key="key+''+item.text">
                <input
                @change="isTarget($event, key, item.type)"
                :id="item.type+''+key"
                :disabled="disableCheck"
                :type="item.type" >
                <label :for="item.type+''+key">
                {{answer.text}}
                </label>
            </div>
        </div>

        <div v-if="item.type == 'radio' && counterItems === index">
            <h1 class="h1">{{item.text}}</h1>
            <div
            v-for="(answer, key) in item.answers" :key="key+''+item.text"
            :class="['radio', {'correct' : (answer.selected && answer.correct && btnNext)}, {'incorrect' : (answer.selected && !answer.correct && btnNext)}, {'correct-incorect' : (!answer.selected && answer.correct && btnNext)}]"
            >
                <input
                @change="isTarget($event, key, item.type)"
                :name="item.text"
                :disabled="disableCheck"
                :id="item.type+''+key"
                :type="item.type">
                <label :for="item.type+''+key">
                {{answer.text}}
                </label>
            </div>
        </div>



    </div>
</div>
<div class="container">
    <button class="btn absolute test__btn" v-if="btnAccept" @click="acceptAnswer()">Принять</button>
    <button class="btn absolute test__btn" v-if="btnNext" @click="nextAnswer()">Следующий вопрос</button>
    <div v-if="counterItems == testArray.length && counterItems == counterCorrect">
        <h1 class="h1 green">Привет я хорошая ОС!</h1>
        <button class="btn absolute test__btn" @click="resetTest()">Заново</button>
    </div>
    <div v-if="counterItems == testArray.length && counterItems !== counterCorrect">
        <h1 class="h1 red">Привет я плохая ОС!</h1>
        <button class="btn absolute test__btn" @click="resetTest()">Заново</button>
    </div>
</div>

</template>

<script>
import items from '@/data/data';
import Title from '@/components/PracticeTitle'

export default {
name: 'myPractice',
components: { Title },
data: function () {
    return {
        items,
        counterItems: 0,
        btnAccept: false,
        btnNext: false,
        counterCorrect: 0,
        disableCheck: false,
    }
},
computed: {
    /*Перемешиваем массив*/
    testArray: function () {
        return this.shuffling(this.items);
    }
},
methods: {
    shuffling: function (data) {
            data.sort(function () {
                return Math.random() - 0.5;
            });

            data.forEach(function (item) {
                item.answers.forEach(function (answer) {
                    answer.selected = false;
                });

                item.answers.sort(function () {
                    return Math.random() - 0.5;
                })
            })

        return data;
    },
    isTarget: function ($event, key, type) {
        
        var arrayItems = this.testArray[[this.counterItems]];
        var checkItem = arrayItems.answers[key];

        if(type == 'radio'){
            arrayItems.answers.forEach(function(item){
                item.selected = false
            })
            checkItem.selected = true
        } else if (type === 'checkbox') {
            if ($event.target.checked) {
                checkItem.selected = true;
                arrayItems.answers[key].selected = true;
            } else {
                checkItem.selected = false;
                arrayItems.answers[key].selected = false;
            }
        }
        
        if(!this.btnNext){
            this.btnAccept = true;
        }
    },
    acceptAnswer: function(){
        this.btnAccept = false;
        this.btnNext = true;

        var arrayItems = this.testArray[[this.counterItems]];
        var checkItems = arrayItems.answers;
        var currCorrect = 0;
        

        if(arrayItems.type == 'radio'){
            
            checkItems.forEach(function(item){ 
                
                if(item.correct && item.selected){
                    currCorrect = 1
                }
            })
        }
        if(arrayItems.type == 'checkbox'){
            let currNoCorrect = false;

            checkItems.forEach(function(item){ 
                if(item.correct && item.selected){
                    currCorrect = 1
                } else if (item.correct && !item.selected){
                    currNoCorrect = true; 
                } else if(!item.correct && item.selected) {
                    currNoCorrect = true;
                }
                if(currNoCorrect){
                    currCorrect = 0;
                }
            })
        }

        this.counterCorrect = this.counterCorrect + currCorrect;
        this.disableCheck = true;
    },
    nextAnswer: function(){
        this.counterItems++;
        this.disableCheck = false;
        this.btnNext = false; 
    },
    resetTest: function () {
        this.counterItems = 0;
        this.btnAccept = false,
        this.btnNext = false,
        this.counterCorrect = 0,
        this.disableCheck = false,
        this.shuffling(this.testArray);
    
    },
}
}
</script>

<style lang="scss">
.red{
    color: red;
}
.green{
    color: green;
}
.btn {
    margin-top: 30px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    outline: 0;
    border: none;
    background: #00923A;
    border: 1px solid #00923A;
    border-radius: 28px;
    vertical-align: middle;
    color: #FFF;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    padding: 14px 40px; 
    text-transform: none;
    text-shadow: none;
    text-align: center;
    text-decoration: none;
    user-select: none;
    &:hover{
        background-color: #FFFFFF;
        border: 1px solid #62B759!important;
        color: #62B759!important; 
    }
}
.radio {
    margin: 0px 0;
    border-bottom: 1px solid #62B759;
    color: #000;
    padding-bottom: 20px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    &.correct-incorect{
        background: rgba(0, 146, 58, 0.15);
        color: #000000;
        border-bottom: none;
        input[type="radio"] {
            display: none;
    
            &:checked {
                +label:before {
                    border: 6px solid #FFFFFF;
                    animation: ripple 0.2s linear forwards;
                }
    
                +label:after {
                    transform: scale(1);
                }
            }
        }
        
        label {
            display: inline-block;
            min-height: 20px;
            position: relative;
            padding: 0 0 0 45px;
            margin-bottom: 0;
            cursor: pointer;
            vertical-align: bottom;
    
            &:before,
            &:after {
                content: '';
                position: absolute;
                border-radius: 50%;
                transition: all .3s ease;
                transition-property: transform, border-color;
            }
    
            &:before {
                left: 0;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 20px;
                height: 20px;
                border: 6px solid #FFFFFF;
            }
    
            &:after {
                top: 4px;
                left: 5px;
                width: 8px;
                height: 8px;
                transform: scale(0);
                background: transparent;
            }
        }
    }
    &.correct{
        background: #00923A;
        color: #FFFFFF;
        border-bottom: none;
        input[type="radio"] {
            display: none;
    
            &:checked {
                +label:before {
                    border: 6px solid #FFFFFF;
                    animation: ripple 0.2s linear forwards;
                }
    
                +label:after {
                    transform: scale(1);
                }
            }
        }
    
        label {
            display: inline-block;
            min-height: 20px;
            position: relative;
            padding: 0 0 0 45px;
            margin-bottom: 0;
            cursor: pointer;
            vertical-align: bottom;
    
            &:before,
            &:after {
                content: '';
                position: absolute;
                border-radius: 50%;
                transition: all .3s ease;
                transition-property: transform, border-color;
            }
    
            &:before {
                left: 0;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 20px;
                height: 20px;
                border: 6px solid #FFFFFF;
            }
    
            &:after {
                top: 4px;
                left: 5px;
                width: 8px;
                height: 8px;
                transform: scale(0);
                background: transparent;
            }
        }
    }

    &.incorrect{
        background: #FA5453;
        color: #FFFFFF;
        border-bottom: none;
        input[type="radio"] {
            display: none;
    
            &:checked {
                +label:before {
                    border: 6px solid #FFFFFF;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 20px;
                    height: 20px;
                    animation: ripple 0.2s linear forwards;
                }
    
                +label:after {
                    transform: scale(1);
                }
            }
        }
    
        label {
            display: inline-block;
            min-height: 20px;
            position: relative;
            padding: 0 0 0 45px;
            margin-bottom: 0;
            cursor: pointer;
            vertical-align: bottom;
    
            &:before,
            &:after {
                content: '';
                position: absolute;
                border-radius: 50%;
                transition: all .3s ease;
                transition-property: transform, border-color;
            }
    
            &:before {
                left: 0;
                top: 50%;
                bottom: 50%;
                margin-top: -10px;
                width: 20px;
                height: 20px;
                border: 1px solid#FA5453;
            }
    
            &:after {
                top: 4px;
                left: 5px;
                width: 8px;
                height: 8px;
                transform: scale(0);
                background: transparent;
            }
        }
    }
    &.test-white{
        border-bottom: 1px solid #E1E1E1;
        color: #333333;
    }

    &.radio-inline {
        display: inline-block;
    }

    input[type="radio"] {
        display: none;

        &:checked {
            +label:before {
                border: 6px solid #62B759;
                left: 0;
                animation: ripple 0.2s linear forwards;
            }

            +label:after {
                transform: scale(1);
            }
        }
    }

    label {
        display: inline-block;
        min-height: 20px;
        position: relative;
        padding: 0 0 0 45px;
        margin-bottom: 0;
        cursor: pointer;
        vertical-align: bottom;

        &:before,
        &:after {
            content: '';
            position: absolute;
            border-radius: 50%;
            transition: all .3s ease;
            transition-property: transform, border-color;
        }

        &:before {
            left: 5px;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 20px;
            height: 20px;
            border: 1px solid #62B759;
        }

        &:after {
            top: 4px;
            left: 5px;
            width: 8px;
            height: 8px;
            transform: scale(0);
            background: transparent;
        }
    }
}
.checkbox {
    position: relative;
    margin: 0px 0;
    text-align: left;
    border-bottom: 1px solid #62B759;
    color: #000;
    padding-bottom: 20px;
    padding-top: 20px;
    display: flex;
    align-items: center;
        &.correct-incorect{
        background: rgba(0, 146, 58, 0.15);
        color: #000000;
        border-bottom: none;
        input[type="checkbox"] {
            outline: 0;
            visibility: hidden;
            width: 20px;
            margin: 0;
            display: block;
            float: left;
            font-size: inherit;
            animation: ripple 0.2s linear forwards;
            &:checked {
                +label:before {
                    background: transparent;
                    border: 1px solid #FFFFFF;
                    animation: ripple 0.2s linear forwards;
                }
    
                +label:after {
                    transform: translate(4px, 4px) rotate(-45deg);
                    width: 12px;
                    height: 8px;
                    border: 2px solid #00923A;
                    border-top-style: none;
                    border-right-style: none;
                }
            }
    
            &:disabled {
                +label:before {
                    border-color: #FFFFFF;
                }
    
                &:checked {
                    +label:before {
                        background: #FFFFFF;
                    }
                }
            }
        }
    }
    &.correct{
        background: #00923A;
        color: #FFFFFF;
        border-bottom: none;
        input[type="checkbox"] {
            outline: 0;
            visibility: hidden;
            width: 20px;
            margin: 0;
            display: block;
            float: left;
            font-size: inherit;
            animation: ripple 0.2s linear forwards;
            &:checked {
                +label:before {
                    background: transparent;
                    border: 1px solid #FFFFFF;
                    animation: ripple 0.2s linear forwards;
                }
    
                +label:after {
                    transform: translate(4px, 4px) rotate(-45deg);
                    width: 12px;
                    height: 8px;
                    border: 2px solid #00923A;
                    border-top-style: none;
                    border-right-style: none;
                }
            }
    
            &:disabled {
                +label:before {
                    border-color: #FFFFFF;
                }
    
                &:checked {
                    +label:before {
                        background: #FFFFFF;
                    }
                }
            }
        }
    }
    &.incorrect{
        background: #FA5453;
        color: #FFFFFF;
        border-bottom: none;
        input[type="checkbox"] {
            outline: 0;
            visibility: hidden;
            width: 20px;
            margin: 0;
            display: block;
            float: left;
            font-size: inherit;
            animation: ripple 0.2s linear forwards;
            &:checked {
                +label:before {
                    background: transparent;
                    border: 1px solid #FFFFFF;
                    animation: ripple 0.2s linear forwards;
                }
    
                +label:after {
                    transform: translate(4px, 4px) rotate(-45deg);
                    width: 12px;
                    height: 8px;
                    border: 2px solid#FA5453;
                    border-top-style: none;
                    border-right-style: none;
                }
            }
        }
    }            
    &.test-white{
        border-bottom: 1px solid #E1E1E1;
        color: #333333;
    }

    &.checkbox-inline {
        display: inline-block;
    }

    label {
        cursor: pointer;
        display: block;
        padding-left: 1px;
        min-height: 20px;

        &:not(:empty) {
            padding-left: 25px;
        }

        &:before,
        &:after {
            content: "";
            position: absolute;
            left: 5px;
            
        }

        &:before {
            width: 20px;
            height: 20px;
            background: transparent;
            border: 1px solid #62B759;
            border-radius: 5px;
            cursor: pointer;
            transition: background .3s;
        }

    }

    input[type="checkbox"] {
        outline: 0;
        visibility: hidden;
        width: 20px;
        margin: 0;
        display: block;
        float: left;
        font-size: inherit;
        animation: ripple 0.2s linear forwards;
        &:checked {
            +label:before {
                background: #EDEDED;
                border: none;
                animation: ripple 0.2s linear forwards;
            }

            +label:after {
                transform: translate(4px, 4px) rotate(-45deg);
                width: 12px;
                height: 8px;
                border: 2px solid  #00923A;
                border-top-style: none;
                border-right-style: none;
            }
        }

        &:disabled {
            +label:before {
                border-color: rgba(#000, 0.25);
            }

            &:checked {
                +label:before {
                    background: rgba(#000, 0.25);
                }
            }
        }
    }
    &:last-child{
        border-bottom: none;
    }
}
</style>
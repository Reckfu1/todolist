<template>
    <div id="index">
        <div class="header-name">
            todos
        </div>
        <div class="wrapper">
            <div class="head">
                <span class="all" v-show="getSumItem" @click="changeStatus(getAllItem)"></span>
                <input type="text" placeholder="What needs to be done?" class="new-things" @keyup.enter="addItemToList" v-model="message">
                <div class="list" v-for="item in filterItems" v-show="getAllItem" @mouseenter="ShowDelBtn(item)" @mouseleave="HideDelBtn(item)">
                    <input type="text" class="item" :value="item.text" :class="[item.clicked?'itemOk':'']">
                    <span :class="[item.selected ? 'deleteBtn':'']" @click="delItem(getAllItem,item)"></span>
                    <span class="circleBtn" :class="[item.clicked?'greenBtn':'']"></span>
                    <span class="completedBtn" :class="[item.clicked?'':'hide']" @click="chooseItem(item)"></span>
                </div>
                <div class="footer" v-show="getSumItem">
                    <span>{{getCompletedItemsCount}} items left</span>
                    <span class="line" @click="clearItem(getAllItem)">Clear completed</span>
                    <div class="toggle-list">
                        <div @click="showAllItems">All</div>
                        <div @click="showActiveItems">Active</div>
                        <div @click="showCompletedItems">Completed</div>
                    </div>
                </div>
                <div class="mask" v-show="getSumItem"></div>
                <div class="mask-2" v-show="getSumItem"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {

    name: 'index',

    data() {
        return {
            message:'',
            filterItems:[]
        };
    },

    methods:{
        addItemToList(){
            if(this.message) this.$store.dispatch('addItem',this.message)
            this.message=''
            this.filterItems=this.getAllItem
        },
        ShowDelBtn(item){
            item.selected=true
        },
        HideDelBtn(item){
            item.selected=false
        },
        chooseItem(item){
            item.clicked=!item.clicked
            item.completed=!item.completed
        },
        delItem(items,curitem){
            this.$store.dispatch('toggleActiveItem',curitem)
            this.$store.dispatch('deleteItem',items)
        },
        clearItem(items){
            let arr=[],t=0
            for(let i=0;i<items.length;i++){
                if(items[i].clicked){
                    arr[t++]=items[i]
                }
            }
            
            for(let i=0;i<arr.length;i++){
                this.$store.dispatch('toggleActiveItem',arr[i])
                this.$store.dispatch('deleteItem',items)               
            }
            
        },
        changeStatus(items){
            for(let i=0;i<items.length;i++){
                items[i].clicked=!items[i].clicked
            }
        },
        showCompletedItems(){
            this.filterItems=this.completedItems
        },
        showActiveItems(){
            this.filterItems=this.activeItems
        },
        showAllItems(){
            this.filterItems=this.getAllItem
        }
    },

    computed:{
        ...mapGetters([
            'getAllItem',
            'getSumItem',
            'getCurrentItem',
            'activeItems',
            'completedItems',
            'getCompletedItemsCount'
        ])
    }
};
</script>
<style lang="css" scoped>
li {
    list-style: none;
}

#index {
    height: 100%;
    width: 100%;
}

.header-name {
    height: 125px;
    width: 300px;
    color: rgba(175, 47, 47, .15);
    font-size: 100px;
    font-weight: 300;
    margin: 0 auto;
    text-align: center;
}

.head {
    width: 600px;
    margin: 10px auto;
    text-align: center;
    box-shadow: 1px 1px 10px rgba(0,0,0,.1);
    position: relative;
}
.all{
    display: inline-block;
    height: 16px;
    width:16px;
    background:url('../assets/down16.png') no-repeat;
    position: absolute;
    top:24px;
    left:15px;
}
/*.head:after{
    content:'';
    display: inline-block;
    height: 40px;
    width:590px;
    background-color: white;
    position: absolute;
    bottom:-5px;
    left:5px;
    z-index: -1;
    box-shadow: 5px 5px 10px rgba(7, 17, 27, .15);
}*/
.mask{
    height: 40px;
    width:590px;
    background-color: #fff;
    position: absolute;
    bottom:-5px;
    left: 5px;
    z-index: -1;
    /*z-index:200;*/
    box-shadow: 3px 3px 3px rgba(7, 17, 27, .15)
}
.mask-2{
    height: 40px;
    width:580px;
    background-color: #fff;
    position: absolute;
    bottom:-10px;
    left: 10px;
    z-index: -2;
    /*z-index:100;*/
    box-shadow: 3px 3px 3px rgba(7, 17, 27, .15)
}

.new-things {
    height: 60px;
    width: 600px;
    /*box-shadow: 5px 5px 10px rgba(7, 17, 27, .15);*/
    border: none;
    text-indent: 2em;
    font-size: 20px;
    font-weight: 300;
    outline: none;
    border-bottom:2px solid rgba(7,17,27,.1);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

.new-things::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    opacity: .3;
    font-size: 22px;
}

.list{
    background-color: #fff;
    position: relative;
}

.deleteBtn{
    display: inline-block;
    height: 32px;
    width:32px;
    background:url('../assets/delete.png') no-repeat;
    opacity: .4;
    position: absolute;
    top:0;
    right:20px;
    bottom:0;
    margin:auto;
}
.deleteBtn:hover{
    opacity: .7;
}

.circleBtn{
    display: inline-block;
    height: 32px;
    width:32px;
    background:url('../assets/circle.png') no-repeat;
    position: absolute;
    opacity: .3;
    top:0;
    left:5px;
    bottom:0;
    margin:auto;
}
.greenBtn{
    display: inline-block;
    height: 32px;
    width:32px;
    background:url('../assets/green.png') no-repeat;
    position: absolute;
    opacity: .3;
    top:0;
    left:5px;
    bottom:0;
    margin:auto;
}
.completedBtn{
    display: inline-block;
    height: 16px;
    width:16px;
    background:url('../assets/yes16.png') no-repeat;
    position: absolute;
    top:0;
    left:13px;
    bottom:0;
    margin:auto;
}
.hide{
    opacity: 0;
}
.item{
    height: 60px;
    width: 600px;
    border: none;
    text-indent: 2em;
    font-size: 22px;
    font-weight: 300;
    outline: none;
    border-bottom:1px solid rgba(7,17,27,.15);
    opacity: .6;
}
.itemOk{
    text-decoration: line-through;
    opacity: .35;
}
.footer{
    height: 45px;
    width:601px;
    background-color:white;
    position: relative;
    display:inline-flex;
    align-items: center;
    justify-content: space-between;
}
.footer span{
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    font-weight: 300;
    opacity: .5;
}
.footer .line:hover,.toggle-list div:hover{
    text-decoration: underline;
    cursor: pointer;
}
.toggle-list{
    height: 45px;
    width:180px;
    position: absolute;
    top:0;
    bottom:0;
    left: 0;
    right:0;
    margin:auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 300;
    opacity: .5;
}
</style>

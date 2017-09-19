<template>
    <div id="index">
        <div class="header-name">
            todos
        </div>
        <div class="wrapper">
            <div class="head">
                <span class="all" v-show="getSumItem" @click="changeStatus(getAllItem)"></span>
                <input type="text" placeholder="What needs to be done?" class="new-things" @keyup.enter="addItemToList" v-model="message">
                <div class="list" v-for="item in filterItems" v-show="getSumItem" @mouseenter="ShowDelBtn(item)" @mouseleave="HideDelBtn(item)">
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
            // filterItems:[],
            flag:false,
            // click:false,
            choice:0
        };
    },

    methods:{
        addItemToList(){
            if(this.message) this.$store.dispatch('addItem',this.message)
            this.message=''
            // this.filterItems=this.getAllItem
        },
        ShowDelBtn(item){
            this.$store.dispatch('toggleActiveItem',item)
            this.$store.dispatch('selectItem')
        },
        HideDelBtn(item){
            this.$store.dispatch('toggleActiveItem',item)
            this.$store.dispatch('deselectItem')
        },
        chooseItem(item){
            this.$store.dispatch('toggleActiveItem',item)
            this.$store.dispatch('toggleChooseItem')
            this.$store.dispatch('toggleItemStatus')
        },
        delItem(items,curitem){
            this.$store.dispatch('toggleActiveItem',curitem)
            this.$store.dispatch('deleteItem',items)
            // 这里有个bug，勾选item，按下completed，再按下delete按钮，还是会出现item，一开始想的是明明都已经delete了，检查了一下state中的todolist数组里的item也是delete了，然而还是会显示item
            // 原因是因为我这里过滤用的是filterItems，这个filterItems并不在state中，是在本组件的data里面的，虽然state中的todolist是真的delete掉了数据，但是组件的data里面的filterItems依然保存着数据，所以仍然会显示已经删除的数据
            // 解决方法是重新更新一下filterItems就好了，下面的clearItem也同理
            // if(this.click) this.filterItems=this.completedItems
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
            
            // this.filterItems=this.getAllItem
        },
        changeStatus(){
            this.flag=!this.flag
            this.$store.dispatch('toggleAllStatus',this.flag)
            // for(let i=0;i<items.length;i++){
            //     if(this.flag){
            //         items[i].clicked=true
            //         items[i].completed=true
            //     }
            //     else{
            //         items[i].clicked=false
            //         items[i].completed=false
            //     }
            // }
        },
        showCompletedItems(){
            // this.filterItems=this.completedItems
            // this.click=true
            this.choice=2
        },
        showActiveItems(){
            // this.filterItems=this.activeItems
            // this.click=false
            this.choice=1
        },
        showAllItems(){
            // this.filterItems=this.getAllItem
            // this.click=false
            this.choice=0
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
        ]),
        filterItems(){
            let sourceData=[this.getAllItem,this.activeItems,this.completedItems]
            return sourceData[this.choice]
        }
    },

    created(){
        this.$store.dispatch('initData')
    }
}
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

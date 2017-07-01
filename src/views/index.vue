<template>
    <div id="index">
        <div class="header-name">
            todos
        </div>
        <div class="wrapper">
            <div class="head">
                <input type="text" placeholder="What needs to be done?" class="new-things" @keyup.enter="addItemToList" v-model="message">
                <div class="list" v-for="item in getAllItem" v-show="getAllItem" @mouseenter="toggleShowBtn" @mouseleave="toggleShowBtn">
                    <input type="text" class="item" :value="item.text">
                    <span :class="{deleteBtn:deleteBtn}" @click="delItem(getAllItem,item)"></span>
                </div>
                <div class="footer" v-show="getSumItem">
                    <span>{{getSumItem}} items left</span>
                    <span class="line">Clear completed</span>
                    <div class="toggle-list">
                        <div>All</div>
                        <div>Active</div>
                        <div>Completed</div>
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
            deleteBtn:false
        };
    },

    methods:{
        addItemToList(){
            this.$store.dispatch('addItem',this.message)
            this.message=''
        },
        toggleShowBtn(e){
            this.deleteBtn=!this.deleteBtn
        },
        delItem(allitems,curitem){
            this.$store.dispatch('toggleActiveItem',curitem)
            this.$store.dispatch('deleteItem',allitems)
        }
    },

    computed:{
        ...mapGetters([
            'getAllItem',
            'getSumItem'
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
.footer{
    height: 45px;
    width:602px;
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

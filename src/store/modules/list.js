import * as types from '../mutation-types'

const state={
    todolist:[],
    activeitem:{}
}

const mutations={
    [types.ADD_ITEM](state,content){
        let data={
            text:content,
            completed:false,
            active:true,
            id:+new Date()
        }
        state.todolist.push(data)
    },
    [types.DELETE_ITEM](state,allitems){
        for(let i=0;i<allitems.length;i++){
            if(allitems[i].id==state.activeitem.id){
                state.todolist.splice(i,1)
                break
            }
        }
    },
    [types.ACTIVE_ITEM](state,item){
        state.activeitem=item
    }
}

const actions={
    addItem({commit},content){
        commit(types.ADD_ITEM,content)
    },
    deleteItem({commit},allitems){
        commit(types.DELETE_ITEM,allitems)
    },
    toggleActiveItem({commit},item){
        commit(types.ACTIVE_ITEM,item)
    }
}

const getters={
    getAllItem:state => state.todolist,
    getSumItem:state => state.todolist.length,
    getCurrentItem:state => state.activeitem
}

export default{
    state,
    mutations,
    actions,
    getters
}
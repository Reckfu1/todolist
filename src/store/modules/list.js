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
            id:+new Date(),
            selected:false,
            clicked:false
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
    // [types.TOGGLE_SELETED_STATUS](state,item){
    //     for(let i=0;i<state.todolist.length;i++){
    //         if(item.id==state.todolist[i].id){
    //             state.todolist[i].selected=!state.todolist[i].selected
    //             break
    //         }
    //     }
    // }
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
    // toggleSeletedStatus({commit},item){
    //     commit(types.TOGGLE_SELETED_STATUS,item)
    // }
}

const getters={
    getAllItem:state => state.todolist,
    getSumItem:state => state.todolist.length,
    getCurrentItem:state => state.activeitem,
    activeItems(state){
        return state.todolist.filter((todo) => {
            return !todo.completed
        })
    },
    completedItems(state){
        return state.todolist.filter((todo) => {
            return todo.completed
        })
    },
    getCompletedItemsCount(state){
        let arr=state.todolist.filter((todo) => {
            return !todo.completed
        })
        return arr.length
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}
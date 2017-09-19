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
        window.localStorage.setItem('todolist',JSON.stringify(state.todolist))
    },
    [types.DELETE_ITEM](state,allitems){
        for(let i=0;i<allitems.length;i++){
            if(allitems[i].id==state.activeitem.id){
                state.todolist.splice(i,1)
                break
            }
        }
        window.localStorage.setItem('todolist',JSON.stringify(state.todolist))
    },
    [types.ACTIVE_ITEM](state,item){
        state.activeitem=item
    },
    [types.INIT_DATA](state){
        if(window.localStorage.getItem('todolist')){
            state.todolist=JSON.parse(window.localStorage.getItem('todolist'))
        }
        else state.todolist=[]
    },
    [types.SELECT_ITEM](state){
        for(let i=0;i<state.todolist.length;i++){
            if(state.todolist[i].id==state.activeitem.id){
                state.todolist[i].selected=true
                break
            }
        }
        window.localStorage.setItem('todolist',JSON.stringify(state.todolist))
    },
    [types.DESELECT_ITEM](state){
        for(let i=0;i<state.todolist.length;i++){
            if(state.todolist[i].id==state.activeitem.id){
                state.todolist[i].selected=false
                break
            }
        }
        window.localStorage.setItem('todolist',JSON.stringify(state.todolist))
    },
    [types.TOGGLE_CHOOSE_ITEM](state){
        for(let i=0;i<state.todolist.length;i++){
            if(state.todolist[i].id==state.activeitem.id){
                state.todolist[i].clicked=!state.todolist[i].clicked
                break
            }
        }
        window.localStorage.setItem('todolist',JSON.stringify(state.todolist))
    },
    [types.TOGGLE_ITEM_STATUS](state){
        for(let i=0;i<state.todolist.length;i++){
            if(state.todolist[i].id==state.activeitem.id){
                state.todolist[i].completed=!state.todolist[i].completed
                break
            }
        }
        window.localStorage.setItem('todolist',JSON.stringify(state.todolist))
    },
    [types.TOGGLE_ALL_STATUS](state,flag){
        for(let i=0;i<state.todolist.length;i++){
            if(flag){
                state.todolist[i].clicked=true
                state.todolist[i].completed=true
            }
            else{
                state.todolist[i].clicked=false
                state.todolist[i].completed=false   
            }
        }
        window.localStorage.setItem('todolist',JSON.stringify(state.todolist))
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
    },
    initData({commit}){
        commit(types.INIT_DATA)
    },
    selectItem({commit}){
        commit(types.SELECT_ITEM)
    },
    deselectItem({commit}){
        commit(types.DESELECT_ITEM)
    },
    toggleChooseItem({commit}){
        commit(types.TOGGLE_CHOOSE_ITEM)
    },
    toggleItemStatus({commit}){
        commit(types.TOGGLE_ITEM_STATUS)
    },
    toggleAllStatus({commit},flag){
        commit(types.TOGGLE_ALL_STATUS,flag)
    }
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
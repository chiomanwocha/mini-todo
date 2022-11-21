<template> 
    <div class="todo-app">
        <div class="greetings">
            <p >hi, {{userName}} !</p>
            <button @click="logOut">logout</button>
        </div>
        <!-- todoList: {{todoList}} <br>
        doingList: {{doingList}}<br>
        doneList: {{doneList}}<br> -->
        <h1>todos</h1>
        <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" v-model="todoItem" @keyup.enter="addTodo" required>
        <button @click="addTodo" class="add-todo">add</button>
        <div class="todo-list">
            <div class="todo">
                <h2>todo</h2>
                <ul v-for="todoItem, index in todoList" :key="index">
                    <li v-if="!todoList[index].isEditing && !todoList[index].isDoing" class="not-editing">
                        <input type="checkbox" name="done" id="done" v-model="todoItem.isDoing" @change="updateTodoList(index)">
                        <!-- <span :class="{done: todoItem.isDone}">{{todoItem.item}}</span> -->
                        {{todoItem.item}}
                        <button @click="editTask(index)" >Edit</button>
                        <button @click="deleteTodo(index)" >Delete</button>
                    </li>
                    <li v-if="todoList[index].isEditing" class="editing">
                        <input type="text" name="editItem" id="editItem" v-model="todoList[index].item" @keyup.enter="saveItem(index)">
                        <button @click="saveItem(index)">Save</button>
                    </li>
                </ul>
            </div>
            <div class="doing">
                <h2>doing</h2>
                <ul v-for="doingItem, index in doingList" :key="index">
                    <li v-if="doingList[index].isDoing && !doingList[index].isDone">
                        <input type="checkbox" name="done" id="done" v-model="doingItem.isDone" @change="updateDoingList(index)">
                        <!-- <span :class="{done: doingItem.isDone}">{{doingItem.item}}</span> -->
                        {{doingItem.item}}
                    </li>
                </ul>
            </div>
            <div class="todo-done">
                <h2>done</h2>
                <ul v-for="doneItem, index in doneList" :key="index">
                    <li v-if="doneList[index].isDone">
                        <input type="checkbox" name="done" id="done" v-model="doneItem.isDone" @change="updateDoneList(index)">
                        {{doneItem.item}}
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>

<script>
import "@/assets/css/todo-app.css"
import router from '@/router'

export default {
  name: 'TodoApp',
  data() {
    return{
        todoItem: '',
        todoList: [],
        doingList: [],
        doneList: [],
        userName: ''
    }
  },
  mounted() {
    this.getItem()
    this.welcomeMessage()
  },
  methods: {
    welcomeMessage(){
        const localDetails = localStorage.getItem('userDetails')
        const convertedDetails= JSON.parse(localDetails)
        this.userName = convertedDetails.firstName
    },
    logOut(){
        // localStorage.removeItem('userDetails')
        // localStorage.removeItem('todoList')
        router.push('./')
    },
    addTodo(){
        if(this.todoItem.trim() !== ''){
            this.todoList.push({
                item: this.todoItem,
                isDoing: false,
                isDone: false,
                isEditing: false
            })
            this.todoItem = '';
            localStorage.setItem('todoList', JSON.stringify(this.todoList))
        } 
        else {
            alert('Your todo item can not be empty')
        }
    },
    deleteTodo(index) {
        this.todoList.splice(index,1)

        localStorage.removeItem('todoList')
        localStorage.setItem('todoList', JSON.stringify(this.todoList))
    },
    updateTodoList(index) {
        this.doingList.push(this.todoList[index])
        // this.doingList.push({
        //     item: this.todoList[index].item,
        //     isDoing: this.todoList[index].isDoing,
        //     isDone: this.todoList[index].isDone,
        //     isEditing: this.todoList[index].isEditing
        // })
        this.todoList.splice(index, 1)
        localStorage.removeItem('todoList')
        localStorage.setItem('todoList', JSON.stringify(this.todoList))
        localStorage.setItem('doingList', JSON.stringify(this.doingList))
    },
    updateDoingList(index) {
        this.doneList.push(this.doingList[index])
        this.doingList.splice(index, 1)
        localStorage.removeItem('doingList')
        localStorage.setItem('doingList', JSON.stringify(this.doingList))
        localStorage.setItem('doneList', JSON.stringify(this.doneList))
        // localStorage.setItem('doneList', JSON.stringify(this.doneList))
    },
    updateDoneList(index){
        this.doingList.push(this.doneList[index])
        this.doneList.splice(index, 1)
        localStorage.removeItem('doneList')
        localStorage.setItem('doneList', JSON.stringify(this.doneList))
        localStorage.removeItem('doingList')
        localStorage.setItem('doingList', JSON.stringify(this.doingList))
    },
    editTask(index){
        this.todoList[index].isEditing = !this.todoList[index].isEditing
    },
    saveItem(index) {
        this.todoList[index].isEditing = !this.todoList[index].isEditing
    },
    getItem(){
        const storedTodo = localStorage.getItem('todoList')
        const storedDoing = localStorage.getItem('doingList')
        const storedDone = localStorage.getItem('doneList')
        if (storedTodo) {
            this.todoList = JSON.parse(storedTodo)
        }
        if (storedDoing) {
            this.doingList = JSON.parse(storedDoing)
        }
        if (storedDone) {
            this.doneList = JSON.parse(storedDone)
        }
    }
  }
}
</script>
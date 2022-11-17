<template> 
    <div class="todo-app">
        <h1>todos</h1>
        <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" v-model="todoItem" @keyup.enter="addTodo" required>
        <button @click="addTodo">Add</button>
        <div class="todo-list">
            <ul v-for="todoItem, index in todoList" :key="index">
                <li v-if="!todoList[index].isEditing" class="not-editing">
                    <input type="checkbox" name="done" id="done" v-model="todoItem.isDone">
                    <span :class="{done: todoItem.isDone}">{{todoItem.item}}</span>
                    <button @click="editTask(index)" >Edit</button>
                    <button @click="deleteTodo(index)" >Delete</button>
                </li>
                <li v-if="todoList[index].isEditing" class="editing">
                    <input type="text" name="editItem" id="editItem" v-model="todoList[index].item" @keyup.enter="saveItem(index)">
                    <button @click="saveItem(index)">Save</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TodoApp',
  data() {
    return{
        todoItem: '',
        todoList: [],
    }
  },
  mounted() {
    this.getItem()
  },
  methods: {
    addTodo(){
        if(this.todoItem.trim() !== ''){
            this.todoList.push({
                item: this.todoItem,
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
    },
    taskDone(){
        this.todoList.isDone= !this.todoList.isDone
    },
    editTask(index){
        this.todoList[index].isEditing = !this.todoList[index].isEditing
    },
    saveItem(index) {
        this.todoList[index].isEditing = !this.todoList[index].isEditing
    },
    getItem(){
        const storedList = localStorage.getItem('todoList')
        if (storedList) {
            this.todoList = JSON.parse(storedList)
        }
    }
  }
}
</script>

<style>
.todo-app{
    width: 70vw;
    margin: 0 auto;
}
#todo-item{
    width: 30vw;
    margin-right: 5px;
    padding: 5px;
}
input[type="text"]{
    padding: 5px 2px;
    margin-right: 5px;
}
button{
    padding: 5px 15px;
    margin-right: 5px;
}
ul {
    list-style: none;
}
.done{
    text-decoration: line-through;
}
.not-editing{
    display: grid;
    grid-template-columns: 4vw 21vw 5vw 5vw;
    align-items: center;
    width: 40vw;
    margin: 0 auto;
    text-align: left;
}
.editing{
    width: 36vw;
    display: grid;
    grid-template-columns: 26vw 5vw;
    margin: 0 auto;
}
</style>
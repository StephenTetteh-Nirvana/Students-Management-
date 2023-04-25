<template>
    <form class="edit-table">
        <h1 class="header">Delete Student</h1>
        <div class="input-group">
        <input type="text" placeholder="Enter Name" v-model="name"/><br/>
        <input type="text" placeholder="Enter Class" v-model="student_class"/><br/>
        <input type="text" placeholder="Date of Admission" v-model="date"/><br/>

       </div>
        <button>Delete </button>
    </form>

</template>


<script>
import{ref} from 'vue'
    export default {
        setup(){
        const name = ref('')
        const student_class = ref('')
        const date = ref('')

        

         return{
            name,
            student_class,
            date
         }
        }
    }
</script>

<style scoped>
.header{
    font-family:Arial, Helvetica, sans-serif;
    margin-left:40px;
    margin-top:50px;
}
.edit-table{
    border:1px solid white;
    /* background-color:rgb(221, 218, 218); */
    width:40%;
    height:400px;
    display:grid;
    grid-template-rows:repeat(3,1fr);
    position:relative;
    left:30%;
    top:10%;
}
input[type=text]{
    width:80%;
    padding:10px 10px;
    margin-top:30px;
    font-size:15px;
    border-radius:5px;
    margin-left:40px;

}
button{
    background:red; 
    color:white;
    text-align:center;
    width:20%;
    height:35px;
    /* padding:10px 30px; */
    border-radius:3px;
    border:none;
    margin-top:20px;
   margin-left:40px;
    font-size:15px;
    cursor:pointer;
 }
</style>
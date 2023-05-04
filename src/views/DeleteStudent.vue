<template>
    <form class="edit-table">
        <h1 class="header">Delete Student</h1>
        <div class="input-group">
        <input type="text" placeholder="Enter Name" v-model="name"/><br/>
        <input type="text" placeholder="Enter Class" v-model="student_class"/><br/>
        <input type="text" placeholder="Date of Admission" v-model="date"/><br/>

       </div>
        <button>Delete</button>
        <div class="buttons">
            <div>
                <button class="btn1"><router-link class="route" to="/database">Back To DataBase</router-link></button>
            </div>
            <div>
               <button class="btn"><router-link class="route" to="/add">Add Student</router-link></button>
            </div>
        </div>
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
 .buttons{
    /* border:1px solid white; */
    height:100px;
    margin-top:10px;
    display:grid;
    grid-template-columns:1fr 1fr;

 } 
 .btn1{
    background:transparent; 
    color:white;
    text-align:center;
    width:45%;
    padding:8px;
    border-radius:10px;
    border:1px solid yellow;
    margin-top:50px;
    font-size:15px;
    cursor:pointer;
 }
 .btn{
    background:rgb(3, 201, 3); 
    color:white;
    text-align:center;
    width:45%;
    height:35px;
    /* padding:10px 30px; */
    border-radius:3px;
    border:none;
    margin-top:50px;
   margin-left:50%;
    font-size:15px;
    cursor:pointer;
 }
 .route{
    text-decoration:none;
    color:white;
 }
</style>
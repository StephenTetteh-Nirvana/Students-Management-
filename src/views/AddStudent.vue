<template>
    <form class="edit-table">
        <h1 class="header">Add Student</h1>
        <div class="input-group">
            <input type="text" placeholder="Enter Name" v-model="name"/><br/>
            <input type="text" placeholder="Enter Class" v-model="student_class"/><br/>
            <input type="text" placeholder="Date of Admission" v-model="date"/><br/>
       </div>
        <button @click="create">Add Student</button>
    </form>

</template>


<script>
import {ref} from 'vue'
import ColRef from "../main.js"
import{addDoc} from 'firebase/firestore'
import {useRouter} from 'vue-router'
    export default {
        setup(){
        const name = ref('')
        const student_class = ref('')
        const date=ref('')
        const router=useRouter()
        

       function create(){
           addDoc(ColRef,{
                name:name.value,
                student_class:student_class.value,
                date:date.value
            })
        .then(()=>{
        console.log('Success')
        alert('Document Added')
        router.push('/database')
        })
        .catch((err)=>{
            console.log(err.message)
        });

        }
        
         return{
            name,
            student_class,
            date,
            create
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
    background:rgb(3, 201, 3); 
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
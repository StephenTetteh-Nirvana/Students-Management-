<template>
    <form class="edit-table" @submit.prevent="create">
        <h1 class="header">Add Student</h1>
        <div class="input-group">
            <input type="text" placeholder="Enter Name..." v-model="name"/><br/>
            <input type="text" placeholder="Enter Level..." v-model="level"/><br/>
            <input type="text" placeholder="Enter Date of Admission...." v-model="admission"/><br/>
       </div>
        <button>Add Student</button>
        <div class="buttons">
            <div class="child1">
                <button class="btn1"><router-link class="route" to="/database">Back To DataBase</router-link></button>
            </div>
        </div>
    </form>
</template>


<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {addDoc,collection} from 'firebase/firestore'
import {db} from '@/main.js'

// const colRef=collection(db,"students-data")

    export default {
        setup(){
        const name=ref("")
         const level=ref("")
         const admission=ref("")
        const router=useRouter()

       function create() {
            console.log("Name:", name.value)
            console.log("Level:", level.value)
            console.log("Admission date:", admission.value)

        addDoc(collection(db, "students"), {
            name: name.value,
            level:level.value,
            admission:admission.value
                })
                .then(()=>{
                    console.log("Succesfully added")
                    router.push('/database')
                })
                .catch((error)=>{
                    console.log(error)
                })
            }

            
        // async function create(){
        //                  await  addDoc(collection(db, "students-data"), {
        //                             name: name.value,
        //                             date: date.value,
        //                             admission:admission.value
        //                             })
        //      .then(()=>{
        //         console.log('success')
        //         router.push('/database')
        //      })
        //      .catch((error)=>{
        //         console.log(error.message)
        //      })
                               
        //     }
            

                return{
                    name,
                    level,
                    admission,
                    router,
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
    /* height:35px; */
    padding:10px;
    border-radius:3px;
    border:none;
    margin-top:20px;
   margin-left:40px;
    font-size:15px;
    cursor:pointer;
 }
 .buttons{
 
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
 /* .btn{
    background:rgb(53, 64, 216); 
    color:white;
    text-align:center;
    width:40%;
    padding:10px;
    border-radius:3px;
    border:none;
    margin-top:50px;
   margin-left:50%;
    font-size:15px;
    cursor:pointer;
 } */
 .route{
    text-decoration:none;
    color:white;
 }
</style>
<template>
    <form class="edit-table" @submit.prevent="edit ">
        <h1 class="header">Edit Student</h1>
        <div class="input-group">
        <input type="text" placeholder="Enter Name" v-model="name"/><br/>
        <input type="text" placeholder="Enter Date" v-model="date"/><br/>
        <input type="text" placeholder="Enter Admission" v-model="admission"/><br/>

       </div>
        <button>Done</button>
        <button class="btn"><router-link class="route" to="/delete">Delete Student</router-link></button>
    </form>

</template>


<script>
import{ref} from 'vue'
import {useRouter} from 'vue-router'
import{doc,updateDoc,serverTimestamp} from 'firebase/firestore'
import {db} from '@/main.js'
    export default {
        setup(){
          
            const name = ref('')
            const date = ref('')
            const admission = ref('')        

            const router = useRouter()

            const colRef = doc(db, "students-data", "DC");


        function edit(){
                updateDoc(colRef, {
                    Name: name.value,
                    Date:date.value,
                    Admission:admission.value,

                    updatedAt:serverTimestamp()
                    })

                    .then(()=>{
                        console.log('Document Updated')
                        alert('Update SuccessFul')
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
            }
          


            return{
                name,
                date,
                edit,
                admission,
                router
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
    background:rgb(53, 64, 216); 
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
 .btn{
    background:red; 
    color:white;
    text-align:center;
    width:18%;
    height:35px;
    /* padding:10px 30px; */
    border-radius:3px;
    border:none;
    margin-top:50px;
   margin-left:85%;
    font-size:15px;
    cursor:pointer;
 }
 .route{
    text-decoration:none;
    color:white;
 }
</style>
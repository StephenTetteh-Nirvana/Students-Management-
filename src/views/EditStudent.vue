<template>
    <form class="edit-table" @submit.prevent="edit">
        <h1 class="header">Edit Student</h1>
        <div class="input-group">
        <input type="text" placeholder="Enter New Student Name...." v-model="name"/><br/>
        <input type="text" placeholder="Enter New Student Level...." v-model="level"/><br/>
        <input type="text" placeholder="Enter New Date of Admission....." v-model="admission"/><br/>

       </div>
        <button>Save</button>
            <div>
             <button class="btn1"><router-link class="route" to="/database">Back To DataBase</router-link></button>
            </div>
    </form>

</template>


<script>
import{ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import{updateDoc,collection,doc} from 'firebase/firestore'
import {db} from '@/main.js'
    export default {
        setup(){
            const name = ref('')
            const level = ref('')
            const admission = ref('') 
            // const student = ref({})  

            const router = useRouter()
            const route = useRoute()
            const studentId = route.params.studentId

            const studentsCollection = collection(db, "students")
            

                        async function edit() {
                                try {
                                    console.log("Name:", name.value)
                                    console.log("Level:", level.value)
                                    console.log("Admission date:",admission.value)
                                    console.log("Updating document with ID:",studentId)

                                    const userDocRef = doc(studentsCollection,studentId)
                                    await updateDoc(userDocRef, {
                                    name: name.value,
                                    level: level.value,
                                    admission:admission.value,
                                    })
                                    console.log("Document updated successfully!")
                                    router.push('/database')
                                } catch (error) {
                                    console.log("Error updating document:", error)
                                }
}

            return{
                name,
                level,
                admission,
                // student,
                studentsCollection,
                studentId,
                edit,
                router,
                route
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
 
 .route{
    text-decoration:none;
    color:white;
 }


 /* Media Queries */

 @media (max-width:768px){
    .edit-table{
    border:1px solid white;
    /* background-color:rgb(221, 218, 218); */
    width:70%;
    height:330px;
    display:grid;
    grid-template-rows:repeat(3,1fr);
    position:relative;
    left:10%;
    top:10%;
}
.header{
    font-family:Arial, Helvetica, sans-serif;
    margin-left:40px;
    margin-top:20px;
}

input[type=text]{
    width:70%;
    padding:5px 10px;
    margin-top:30px;
    font-size:15px;
    border-radius:5px;
    margin-left:40px;
}
button{
    background:rgb(53, 64, 216);
    color:white;
    text-align:center;
    width:40%;
    /* height:35px; */
    padding:5px;
    border-radius:3px;
    border:none;
    margin-top:20px;
   margin-left:40px;
    font-size:15px;
    cursor:pointer;
 }
 .btn1{
    background:transparent; 
    color:white;
    text-align:center;
    width:50%;
    padding:5px 10px;
    border-radius:10px;
    border:1px solid yellow;
    margin-top:50px;
    font-size:15px;
    cursor:pointer;
 }
 }
</style>
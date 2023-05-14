<template>
       <div class="data">
        <div class="table-head">
            <div class="head-1">
                <h2>Name</h2>
        
            </div>
            <div class="head-2">
                <h2>Level</h2>
            </div>
           
            <div class="head-3">
                <h2>Date Of Admission</h2>
            </div>
        <table class="tab">
            <tr class="tr-head" v-for="{id,name,level,admission} in students" :key="id">
                <td class="name">{{ name }} </td>
                <td class="level">{{level}}</td>
                <td class="admission">{{admission}}</td>

                <td class="edit-td">
                    <router-link to="`/edit/${id}`">
                        <button class="edit-btn" >Edit</button>
                    </router-link>
                </td>
                <td class="del-td">
                    <button class="del-btn" @click="deleteStudent">Delete</button>
                </td>
            </tr>
            <button class="btn-logout" @click="LogOut">Log Out</button>
        </table>
          
        </div>
            <div class="info">
                <button class="btn1"><router-link class="route-1" to="/add">Add New Student</router-link></button>
           </div>
   </div>
     
      
      
</template>

<script>
import{onMounted,ref} from 'vue'
import{getAuth,onAuthStateChanged,signOut} from 'firebase/auth'
import {useRouter,useRoute} from 'vue-router'
import{onSnapshot,collection,deleteDoc,doc} from 'firebase/firestore'
import{db} from '@/main.js'
    export default {
        setup(){
            const loggedIn = ref(true)
            const router = useRouter()
            const route= useRoute()
            const auth = getAuth()

            const students = ref([]);

            const docId = ref(route.params.id)

                    function deleteStudent() {
                        console.log("Deleting document with ID:", docId.value)
                    const docRef = doc(db, 'students', docId.value)
                    deleteDoc(docRef)
                        .then(() => {
                        console.log('Document deleted successfully.')
                        router.push('/database')
                        })
                        .catch((error) => {
                        console.error('Error deleting document: ', error)
                        })
                    }
                    function LogOut(){
                            signOut(auth)
                            .then(()=>{
                                console.log('User Logged Out')
                                router.replace('/login')
                            })
                            .catch((err)=>{
                                alert(err)
                            })
                        }
                    

        onMounted(async()=>{
            onAuthStateChanged(auth,(user)=>{
                   if(user){
                    loggedIn.value=true;
                   } 
                   else{
                    loggedIn.value=false;
                   }
                })



                onSnapshot(collection(db,"students"),(querySnapshot) => {
                 const s_data = []
                    querySnapshot.forEach((doc) => {
                       const studies = {
                        id:doc.id,
                        name:doc.data().name,
                        level:doc.data().level,
                        admission:doc.data().admission
                       }
                       s_data.push(studies)
                       console.log(studies);
                    })
                    students.value = s_data
                      
                    });
        })       

            return { 
                students,
                LogOut,
                deleteStudent,
                route,
                router
             }

           

           
        }
}
</script>

<style scoped>
/* .header{
    font-family:'Times New Roman', Times, serif;
    font-weight: bold;
    /* text-align:center; */
    /* position:absolute;
    top:20%;
    left:40%; */
    /* margin-top:30px;
    margin-left:80px; */
    /* border:1px solid black; */

.info{
    /* display: grid;
    grid-template-rows: repeat(3, 1fr); */
    width:80%;
    height:40px;
    position:relative;
     left:25%;
    top:30%;
    /* line-height:1rem; */
    /* border:1px solid black; */
}
.tab{
    /* border:1px solid white; */
    margin-top:20px;
    width:295%;
    /* height:100vh; */
    /* font-weight:bolder; */
   
}
.tr-head{
    /* border:1px solid white; */
    margin-top:10px;
}
.name{
    /* border:1px solid white; */
    width:20%;
    font-size:20px;
    padding-left:10px;
}
.level{
    /* border:1px solid white; */
    /* padding-right:100px; */
    width:10%;
    font-size:20px;
}
.admission{
    /* border:1px solid white; */
    width:10%;
    text-align:center;
    font-size:20px;
    padding-left:40px;
}
.edit-td{
    /* border:1px solid white; */
    width:3%;
}
.edit-btn{
    text-align:center;
    background:rgb(86, 97, 245); 
    color:white;
    border-radius:5px;
    border:none;
    margin-bottom:10px;
     margin-top:10px;
    /* margin-left:20px;  */
    /* padding-left:10px; */
    cursor:pointer;
    padding:10px 20px;
}
.edit-btn:hover{
  background-color:rgb(53, 64, 216);
}
.del-btn{
    text-align:center;
    background-color:rgb(255, 57, 57);
    color:white;
    border-radius:5px;
    margin-left:20px;
    margin-bottom:10px;
    border:none;
    margin-top:10px;
    cursor:pointer;
    padding:10px 10px;
}
.del-btn:hover{
    background-color:red;
}
.del-td{
    /* border:1px solid white; */
    width:2%;
}
.head-1{
    margin-top:10px;
    margin-left:60px;
}
.head-2{
   margin-top:10px;
   margin-left:100px;
   /* border:1px solid white; */
}
.head-3{
    margin-left:20px;
    margin-top:10px;
    text-align:center;
}
.data{
    display:grid;
    grid-template-columns:5fr 1fr;
    color:white;
    /* border:1px solid white; */
    margin-top:50px;
    margin-left:40px;
    height:100px;
}
.table-head{
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    height:40px;
    /* border:1px solid white; */
    margin-left:60px;
    margin-top:30px;
    border-bottom:3px solid white;
    /* font-size:20px; */
}
.route-1{
    text-decoration:none;
    color:white;
}

.btn-logout{
    position:relative;
    left:35%;
    top:50%;
    padding:5px 20px;
}
.btn1{
    text-align:center;
    background:rgb(3, 201, 3); 
    color:white;
    border-radius:5px;
    border:none;
    cursor:pointer;
    padding:10px 10px;
    margin-right:10px;
}
</style>
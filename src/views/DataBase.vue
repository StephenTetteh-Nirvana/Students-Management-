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
            <tr class="tr-head" v-for="student in students" :key="student.id">
                <td class="name">{{ student.name }} </td>
                <td class="level">{{student.level}}</td>
                <td class="admission">{{student.admission}}</td>

                <td class="edit-td">
                        <button @click="navigateToEditPage(student)" class="edit-btn">Edit</button>
                </td>
                <td class="del-td">
                    <button class="del-btn" @click="deleteStudent(student.id)">Delete</button>
                </td>
            </tr>
        </table>
          
        </div>
            <div class="info">
                <button class="btn-logout" @click="LogOut">Log Out</button>
                <button class="btn1"><router-link class="route-1" to="/add">Add New Student</router-link></button>
           </div>
   </div>
     
      
      
</template>

<script>
import{onMounted,ref} from 'vue'
import{getAuth,onAuthStateChanged,signOut} from 'firebase/auth'
import {useRouter,useRoute} from 'vue-router'
import{onSnapshot,collection,getDoc,deleteDoc,doc,orderBy,query} from 'firebase/firestore'
import{db} from '@/main.js'
    export default {
        setup(){
            const loggedIn = ref(true)
            const router = useRouter()
            const route= useRoute()
            const auth = getAuth()
            let s_data = []
            const students = ref([]);

            const studentsCollection=collection(db,"students")
            const studentId = route.params.studentId
            
            // FUNCTION THAT LOGS OUT THE USER
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
                        const navigateToEditPage = (student) => {
                                // Access the unique ID and navigate to the EditStudent route
                                router.push({ name: 'EditStudent', params: { studentId: student.id } })
                                }

              // FUNCTION THAT DELETES A SINGLE DOCUMENT
                        async function deleteStudent(student) {
                                try{
                                    const userDocRef= doc(studentsCollection,student)

                                    const userDoc = await getDoc(userDocRef)

                                    if(userDoc.exists()){
                                        await deleteDoc(userDocRef)
                                        console.log(`Deleted student:`, student)
                                    }
                                    else{
                                        console.log('This user does exist')
                                    }
                                }
                                catch(error){
                                    console.log(error)
                                }


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
                const studentsQuery = query(collection(db, 'students'), orderBy('name'));
          //  listens to changes and reflects them
                onSnapshot(studentsQuery,(querySnapshot) => {
                    s_data = []; // Clear the s_data array before updating
                    querySnapshot.forEach((doc) => {
                        const student = {
                            id: doc.id,
                            name: doc.data().name,
                            level: doc.data().level,
                            admission: doc.data().admission,
                        }
                        s_data.push(student);
                    });

    // console.log(s_data);
    students.value = s_data;

   
});
                })     

            return { 
                students,
                LogOut,
                deleteStudent,
                navigateToEditPage,
                studentId,
                route,
                router,
                studentsCollection,
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
    width:60%;
    height:70px;
    position:relative;
     left:25%;
    /* line-height:1rem; */
    /* border:1px solid black; */
}
.tab{
    /* border:1px solid white; */
    /* border-bottom:3px solid white; */
    margin-top:20px;
    width:290%;
    /* height:100vh; */
    /* font-weight:bolder; */
   
}
.tr-head{
    /* border:1px solid white; */
    margin-top:10px;
}
.name{
    /* border:1px solid white; */
    width:12%;
    font-size:20px;
    /* padding-left:10px; */
}
.level{
    /* border:1px solid white; */
    /* padding-right:100px; */
    width:4%;
    /* text-align:center; */
    padding-left:25px;
    font-size:20px;
}
.admission{
    /* border:1px solid white; */
    width:10%;
    text-align:center;
    font-size:20px;
    padding-left:120px;
}
.edit-td{
    /* border:1px solid white; */
    /* position:relative;
    right:5%; */
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
    /* margin-left:10px; */
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
    position:relative;
    right:4%;
    width:5%;
}
.head-1{
    /* border:1px solid white; */
    width:30%;
    margin-top:10px;
    /* margin-left:60px; */
}
.head-2{
    width:30%;
   margin-top:10px;
   /* margin-left:30px; */
   /* border:1px solid white; */
}
.head-3{
    width:100%;
    /* border:1px solid white; */
    /* margin-right:120px; */
    margin-top:10px;
    /* text-align:center; */
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
    background:red;
    color:white;
    position:relative;
    border:none;
    border-radius:5px;
    bottom:10%;
    padding:5px 37px;
    cursor:pointer;
}
.btn1{
    text-align:center;
    background:rgb(3, 201, 3); 
    color:white;
    border-radius:5px;
    border:none;
    cursor:pointer;
    padding:5px 10px;
    margin-right:10px;
}


/* Media Queries */


@media (max-width:768px){
.data{
    display:grid;
    grid-template-columns:5fr 1fr;
    color:white;
    /* border:1px solid white; */
    margin-top:50px;
    overflow:hidden;
}
.tab{
    /* border:1px solid white; */
    /* margin-top:20px; */
    width:100%;
    position:absolute;
    left:2%;
    top:25%;
    /* height:100vh; */
    /* font-weight:bolder; */
   
}
.tr-head{
    /* border:1px solid white; */
    margin-top:10px;
}
.table-head{
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    /* height:40px; */
    width:60%;
    font-size:10px;
    /* border:1px solid white; */
    border-bottom:none;
}
.info{
    /* border:1px solid black; */
    width:30%;
    height:60px;
    text-align:center;
    position:absolute;
    left:67%;
}
.btn-logout{
    background:red;
    color:white;
    position:relative;
    top:5%;
    border:none;
    border-radius:5px;
    /* bottom:10%; */
    font-size:11px;
    padding:5px 28px;
    cursor:pointer;
}
.btn1{
    background:rgb(3, 201, 3); 
    color:white;
    border-radius:5px;
    border:none;
    cursor:pointer;
    position:relative;
    top:10%;
    left:5%;
    /* right:37%; */
    font-size:11px;
    padding:5px 5px;
}
.name{
    /* border:1px solid white; */
    width:8%;
    font-size:13px;
    text-align:center;
    /* padding-left:10px; */
}
.level{
    /* border:1px solid white; */
    /* padding-right:100px; */
    width:7%;
    text-align:center;
    padding-left:4px;
    font-size:13px;
}
/* .admission{
    /* border:1px solid white; */
    /* width:10%;
    text-align:center;
    font-size:10px;
    padding-left:5px; */

.admission{
    /* border:1px solid white; */
     width:5%; 
    margin-left:20px;
    text-align:center;
    font-size:12px;
    padding-left:15px;
}
.edit-td{
    /* border:1px solid white; */
    width:1%;
}
.edit-btn{
    text-align:center;
    background:rgb(86, 97, 245); 
    color:white;
    border-radius:5px;
    border:none;
    margin-bottom:10px;
    margin-top:10px;
    margin-left:20px;
    /* margin-left:30px; */
    font-size:11px;
    padding:5px 5px;
}
.del-btn{
    text-align:center;
    background-color:rgb(255, 57, 57);
    color:white;
    border-radius:5px;
    margin-left:25px;
    margin-bottom:10px;
    border:none;
    margin-top:10px;
    font-size:11px;
    padding:5px 5px;
}
.head-1{
    /* border:1px solid white; */
    width:70%;
    height:18px;
    /* margin-top:50px; */
    text-align:center;
    position:relative;
    right:85%;
    top:7%;
    /* border-bottom:3px solid white; */
    /* margin-left:60px; */
}
.head-2{
    width:70%;
    height:18px;
   margin-top:10px;
   position:relative;
    top:7%;
    right:50%;
   /* margin-left:30px; */
   /* border:1px solid white; */
   /* border-bottom:3px solid white; */
}
.head-3{
    width:100%;
    position:relative;
    bottom:20%;
    right:15%;
    /* border:1px solid white; */
    /* margin-right:120px; */
    margin-top:10px;
    /* text-align:center; */
}
    /* border:1px solid white; */
}
</style>
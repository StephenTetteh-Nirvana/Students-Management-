<template>
       <div class="data">
        <div class="table-head">
            <div class="head-1">
                <h2>Name</h2>
        
            </div>
            <div class="head-2">
                <h2>Class</h2>
            </div>
           
            <div class="head-3">
                <h2>Date Of Admission</h2>
            </div>
          
        </div>
            <div class="info">
                <button class="btn1"><router-link class="route-1" to="/add">Add</router-link></button>
                <button class="btn2" ><router-link class="route-2" to="/edit">Edit</router-link></button>
                <button class="btn3"><router-link class="route-3" to="/delete">Delete</router-link></button>
           </div>
       </div>
     
      <button class="btn-logout" @click="LogOut">Log Out</button>
</template>

<script>
import{onMounted,ref} from 'vue'
import{getAuth,onAuthStateChanged,signOut} from 'firebase/auth'
import {useRouter} from 'vue-router'
    export default {
        setup(){
            const loggedIn = ref(true)
            const router = useRouter()
            const auth = getAuth()

            onMounted(()=>{
                onAuthStateChanged(auth,(user)=>{
                   if(user){
                    loggedIn.value=true;
                   } 
                   else{
                    loggedIn.value=false;
                   }
                })
            })

            function LogOut(){
                signOut(auth)
                .then(()=>{
                    console.log('User Logged Out')
                    router.replace('/login')
                })
            }

            return{
                LogOut,
                router,
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
.route-2{
    text-decoration:none;
    color:white;
}
.route-3{
    text-decoration:none;
    color:white;
}
.btn-logout{
    position:relative;
    left:35%;
    top:35%;
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
.btn2{
    text-align:center;
    background:rgb(53, 64, 216); 
    color:white;
    border-radius:5px;
    border:none;
    /* width:10px; */
    /* margin-top:10px; */
    cursor:pointer;
    padding:10px 10px;
    margin-right:10px;

}
.btn3{
    text-align:center;
    background-color:red;
    color:white;
    border-radius:5px;
    border:none;
    /* margin-top:10px; */
    cursor:pointer;
    padding:10px 10px;
    margin-right:5px;

}

</style>
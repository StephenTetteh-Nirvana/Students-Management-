<template>
    <form @submit.prevent>
        <h1>Login Your Account</h1>
        <div class="icon-container">
            <img class="icon-image" src="../images/user.png" />
            <!-- <h2>Admin</h2> -->
        </div>
        <p  class="message" v-if="errMsg">{{errMsg}}</p>
    <div class="input-box">
        <div class="input-class">  
        <input type="text" placeholder="Enter Email..."  v-model="email" />
        </div>
        <div class="input-class1">  
        <input type="password" placeholder="Enter Password..." v-model="password" />
        </div>
    </div>
        <button @click="LogIn">Log In</button>
        <p class="Register">Need an account?<router-link to="/register">Register Here</router-link></p>
        <footer>Copyright&copy;2023</footer>
    </form>

</template>

<script>
import {ref} from 'vue'
// import { onBeforeMount } from 'vue';
import {useRouter} from 'vue-router'
import{getAuth,signInWithEmailAndPassword} from 'firebase/auth'
    export default {
        name:'LoginPage',
        
        setup(){
            const email=ref('')
            const password=ref('')
            const errMsg=ref("")
            const auth=getAuth()
            const router = useRouter()


    //     onBeforeMount(()=>{
    //         onAuthStateChanged(auth, (user) => {
    //             if ( !user ) {
    //         router.replace('/login')
    //         }
    //         else{
    //             console.log('Login SuccessFul')
    //         }
    //         });
    //  })
      

    async function LogIn(){
          await signInWithEmailAndPassword(auth,email.value,password.value)
   .then((data)=>{
      console.log(data)
      alert('Successfully Logged In')
      console.log('Success')
      router.replace('/database')
   })
   .catch((error)=>{
    alert(error.message)
    console.log(error.code)
    if (error.code === 'auth/invalid-email') {
         errMsg.value="The Email is incorrect"
        } else if (error.code === 'auth/wrong-password') {
            errMsg.value="The Password is incorrect"
        } else if (error.code === 'auth/user-not-found') {
            errMsg.value="No User was Found"
        } else {
          (error.code==='auth/network-request-failed')
          errMsg.value="Please Check Your Internet Connection"
        }
})


 }
        return{
            email,
            password,
            auth,
            // router,
            errMsg,
            LogIn
        }
    }
}



</script>

<style scoped>
*{
    margin:0px;
    padding:0px;
}
h1{
    font-family:Arial, Helvetica, sans-serif;
    position:relative;
    top:19%;
    color:white;
}
form{
    text-align:center;
    height:100vh;
    line-height:1em;
}

.Register{
    position:relative;
    top:38%;
    color:white;
}
.message{
    color:red;
    font-size:20px;
    text-transform:uppercase;
}
.icon-container{
    width:30px;
    position:relative;
    left:47%;
    top:27%;
}
.icon-image{
    width:80px;
}
.input-box{
    position:relative;
    top:30%;
}
input[type=text]{
    padding:10px;
    width:400px;
}
input[type=password]{
    margin-top:30px;
    padding:10px;
    width:400px;
}
a{
    color:rgb(68, 68, 238);
    margin-left:10px;
    position:relative;
    top:38%;
}
button{
    /* text-align:center;
    position:relative;
    top:35%;
    left:44%;
    display:block;
    width:180px;
    font-size:1rem;
    padding:10px;
    /* border-radius:5px; */
    /* text-transform:uppercase; */
    /* color:white;
    cursor:pointer;
    opacity:0;
  background:transparent;
    background-image:linear-gradient(to right,white 50%,transparent 50%);
    background-position:100% 0%;
    background-size:200% 100%;
    transition:0.6s;
    animation:fadeIn 1s linear 2s forwards; */
    text-align:center;
    position:relative;
    top:35%;
    left:44%;
    display:block;
    width:180px;
    font-size:1rem;
    padding:10px;
    border-radius:5px; 
    font-weight:bold;
    color:white;
    cursor:pointer;
   background:rgb(53, 64, 216); 
}

/* button:hover{
    color:black;
    /* text-transform:uppercase; */
  /* background-position:0% 50%; */


/* @keyframes fadeIn{
    from{opacity:0;}
    to{opacity:1;}
} */

/* @keyframes input{
    from{left:-100%}
    to{left:-0%}
} */
/* @keyframes fallIn{
    from{top:-100%}
    to{top:0%}
} */

footer{
    position:relative;
    top:55%;
    color:white;
    font-style:bold;
    font-size:1.3rem;
}

@media (max-width:768px){
    h1{
        position:relative;
         top:10%;
         font-size:35px;
    }
    .icon-container{
    position:relative;
    left:40%;
    top:15%;
}
    .icon-image{
       width:60px;
       /* border:1px solid black; */
}
.input-box{
    height:100px;
    width:80%;
    position:absolute;
    top:40%;
    left:10%;
}
input[type=text]{
    padding:10px;
    width:300px;
     /* border:1px solid black; */
}
input[type=password]{
    padding:10px;
    width:300px;
    /* margin-bottom:40px; */

}
button{
   text-align:center;
    position:relative;
    top:40%;
    left:38%;
    display:block;
    width:100px;
    font-size:1rem;
    padding:10px;
    border-radius:5px; 
    font-weight:bold;
    color:white;
   background:rgb(53, 64, 216); 
}
.Register{
    position:relative;
    top:45%;
}
}

</style>
<template>
    <form @submit.prevent>
        <div class="icon-container">
            <img class="icon-image" src="../images/user.png" />
            <!-- <h2>Admin</h2> -->
        </div>
        <p  v-if="errMsg">{{errMsg}}</p>
        <div class="input-class">  
        <input type="text" placeholder="Enter Email..."  v-model="email" />
        </div>
        <div class="input-class">
            <input type="password" placeholder="Enter Password..." v-model="password" />
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
      

            function LogIn(){
                signInWithEmailAndPassword(auth,email.value,password.value)
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
  });
  
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
.icon-container{
    width:30px;
    position:relative;
    left:47%;
    top:27%;
}
.icon-image{
    width:80px;
}
.input-class{
    /* left:-100%; */
    text-align:center;
    position:relative;
    top:30%;
    /* animation: input 0.5s linear 1s forwards; */
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


@keyframes fadeIn{
    from{opacity:0;}
    to{opacity:1;}
}

/* @keyframes input{
    from{left:-100%}
    to{left:-0%}
} */
@keyframes fallIn{
    from{top:-100%}
    to{top:0%}
}

footer{
    position:relative;
    top:55%;
    color:white;
    font-style:bold;
    font-size:1.3rem;
}
</style>
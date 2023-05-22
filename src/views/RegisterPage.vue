<template>
        <form @submit.prevent>
            <p class="p-error" v-if="errMsg">{{ errMsg }}</p>
            <h1>Create An Account</h1>
            <div class="icon-container">
            <img class="icon-image" src="../images/user.png" />
            <!-- <h2>Admin</h2> -->
        </div>
         <div class="input-box">
            <div class="input-class">
                <input type="text" placeholder="Enter Valid Email..."  v-model="email" >
            </div>
            <div class>
                <input type="password" placeholder="Password should be atleast 6 characters..." v-model="password" />
           </div>
        </div>
        <button @click="register">Sign Up</button>
        <p class="Register">Already got an account?<router-link to="/login">Tap here to Login</router-link></p>
        <footer>Copyright&copy;2023</footer>
        </form>
   
</template>

<script>
import {ref} from 'vue'
import{getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'vue-router'

    export default {
        name:'RegisterPage',
        
        setup(){
            const email=ref('')
            const password=ref('')
            const errMsg =ref("")
            const auth=getAuth()
            const router = useRouter()

            function register(){
                createUserWithEmailAndPassword(auth,email.value,password.value)
               .then((data)=>{
                  console.log(data)
                  alert('Successfully Registered')
                  console.log('Success')
                  router.replace('/database')
               })
               .catch((error)=>{
                console.log(error.code)
                if (error.code === 'auth/invalid-email') {
                     errMsg.value="The Email is incorrect"
                    } else if (error.code === 'auth/email-already-in-use') {
                        errMsg.value="Email Already in Use"
                    } else if (error.code === 'auth/wrong-password') {
                        errMsg.value="The Password is incorrect"
                    } else if (error.code === 'auth/user-not-found') {
                        errMsg.value="No User was Found"
                    } else if (error.code === 'auth/weak-password') {
                        errMsg.value="Password should be atleast 6 characters long"
                    } else {
                        error.code==='auth/network-request-failed'
                        errMsg.value="Please Check Your Internet Connection"
                    }
  });

                // switch(error.code){
                //      case "auth/invalid-email":
                //         errMsg.value="Invalid email";
                //         break; 
                //     case "auth/wrong-password":
                //         errMsg.value="Password should be atleast 6 characters";
                //         break; 
                //      case "auth/user-not-found":
                //         errMsg.value="No User Found";
                //         break; 
                //      default:
                //         errMsg.value="Email or Password was incorrect";
                //         break;
                // }
               
            }

       

            return{
                email,
                password,
                router,
                errMsg,
                register
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
    top:22%;
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
.p-error{
     font-size:20px;
    color:red;
    text-transform:uppercase;
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
}
button{
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

footer{
    position:relative;
    top:50%;
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
    top:12%;
}
    .icon-image{
       width:70px;
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
    top:38%;
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
    top:43%;
}
.p-error{
    position:relative;
    top:47%;
    color:red;
    font-size:20px;
    text-transform:uppercase;
}
footer{
    position:relative;
    top:57%;
    color:white;
    font-style:bold;
    font-size:1.3rem;
}
}
</style>
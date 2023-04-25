<template>
        <form @submit.prevent>
            <h1>Create An Account</h1>
            <div class="input-class">
                <input type="text" placeholder="Enter Valid Email..."  v-model="email" >
                <br/>
                <input type="password" placeholder="Password should be atleast 6 characters..." v-model="password" />
                <p  v-if="errMsg">{{ errMsg }}</p>
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
.input-class{
    /* left:-100%;  */
     text-align:center;
    position:relative;
    top:30%; 
     /* animation: input 0.5s linear 1s forwards; */
}
.input-class .p{
    color:white;
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
    top:65%;
    color:white;
    font-style:bold;
    font-size:1.3rem;
}
</style>
<template>
   <h1>Students <br /> Record <br/> Management <br/> System</h1>
   <router-link class="route" to="/login"><button class="btn-class">Proceed</button></router-link>
   <footer>Copyright&copy;2023</footer>
</template>

<script>
// import{onBeforeMount} from 'vue'
// import{UseRouter} from 'vue-router'
// import{getAuth,onAuthStateChanged} from 'firebase/auth'

    export default {
        // setup(){
        //     const auth=getAuth()
        //     const router=UseRouter()
        // onBeforeMount(()=>{
        //     onAuthStateChanged(auth, (user) => {
        //         if (!user) {
        //     router.replace('/')
        //     } 
        //     else{
        //         console.log('There is a user')
        //     }
        //     });
        //     })

          
  }

</script>

<style scoped>
h1{
    font-family:'Courier New', Courier, monospace;
    font-size:80px;
    margin-top:65px;
    color:white;
    margin-left:80px;
}
.btn-class{
 text-align:center;
    display:block;
    margin-left:80px;
    margin-top:50px;
    width:180px;
    font-size:1rem;
    padding:10px;
    text-transform:uppercase; 
    color:white;
    cursor:pointer;
    opacity:0;
    background:transparent;
    background-image:linear-gradient(to right,white 50%,transparent 50%);
    background-position:100% 0%;
    background-size:200% 100%;
    transition:0.6s;

    animation:fadeIn 0.5s linear 0.6s forwards;
}
.btn-class:hover{
    color:black;
    background-position:0% 50%;
}
@keyframes fadeIn{
    from{opacity:0;}
    to{opacity:1;}
}
.route{
    text-decoration:none;
    color:white;
    font-size:15px;
}
footer{
    position:relative;
    top:20%;
    text-align:center;
    color:white;
    font-style:bold;
    font-size:1.3rem;
}





/* Media Queries */

@media (max-width:768px){
    h1{
    font-size:50px;
    margin-top:80px;
    margin-left:20px;
    line-height:4rem;
    }
    .btn-class{
    text-align:center;
    display:block;
    margin-left:20px;
    margin-top:30px;
    width:150px;
    font-size:1rem;
    padding:10px;
    text-transform:uppercase; 
    color:white;
    cursor:pointer;
    opacity:1;
    background:transparent;
}
.route{
    text-decoration:none;
    color:white;
    font-size:15px;
}
footer{
    position:relative;
    top:36%;
    text-align:center;
    color:white;
    font-style:bold;
    font-size:1.3rem;
}
}
</style>
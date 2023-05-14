  <template>
     <div class="container">
        <div class="img">
            <h1>Student's Registry</h1>
            <router-view/>
        </div> 
    </div>
      
</template>


<script>
import{useRoute,useRouter} from 'vue-router'
import{getAuth,onAuthStateChanged} from 'firebase/auth'
import {onBeforeMount} from 'vue'

export default {
  name: 'App',
  setup(){
    const router=useRouter()
    const route=useRoute()
    const auth=getAuth()

    onBeforeMount(()=>{
      onAuthStateChanged(auth, (user) => {
        if(!user){
          router.replace('/')
        }else if(route.path=="/login" || route.path=="/register"){
              router.replace('/database')
        }
      }
      )
    })
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap');

body{
  background-color:white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
    /* background-color:#2c3e50; */
}
*{
margin:0px;
padding:0px
}
.container{
  width:100%;
  height:100vh;
  overflow:hidden;
}
h1{
  color:#f0ebeb;
  font-family:'Tilt Prism';
  font-size:50px;
  margin-left:25px;
  padding-top:10px;
}
.img{
    background-image:linear-gradient(rgba(48, 47, 47, 0.75),rgba(7, 3, 3, 0.75)),url(../background/wallpaper.jpg);
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    height: 100vh;
    width: 100%;
}

@media (max-width:768px){
  h1{
    font-size:35px;
  }
}
</style>

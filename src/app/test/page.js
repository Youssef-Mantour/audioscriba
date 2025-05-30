const doit =s=> s;
const doitnow = function(s){
  return(s);
}

const user={
    name:"youssef",email:"ymantour@gmail.com",phone:"0670099619"
}
function callb(){
  return "youman";
}
export default function index(){
    return (
        <>
           <h1>{doit("Hello my first test")}</h1>
           <h3>{user.name}</h3>
           <hr></hr>
        
           <h3>{user.email}</h3>
           <p></p>
           <hr></hr>
           <p></p>
           <h3>{user.phone}</h3>
        </>   
    )
}

const butt=document.getElementById("butt");
butt.addEventListener("click",async function(){
const name = document.getElementById("b").value;
const salary = document.getElementById("c").value;
const city = document.getElementById("d").value;
console.log(name+salary+city)
document.getElementById("b").value= "";
document.getElementById("c").value= "";
document.getElementById("d").value = "";

try{
    const response = await fetch("http://localhost:3000/submit",{
        method:"POST",
        headers :{
            "Content-Type" :"application/json"
        },
        body:JSON.stringify({name,salary,city})
    })
    const result = await response.json()
console.log("Success!",result)
}
catch (error) {
  console.error("❌ Error:", error);
}})
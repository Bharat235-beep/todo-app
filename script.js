let input=document.getElementById('input')
let todoList=document.getElementsByClassName('todo-list')
let todo=document.querySelectorAll('.todo-list li')


function addTask(){
    if(input.value!==''){
        let li=document.createElement('li')
        let div=document.createElement('div')
        let span=document.createElement('span')
        let edit=document.createElement('button')
        div.classList.add('todo-item')
        span.innerHTML='&#x2716;';
        edit.innerHTML='&#x270E;'
        li.classList.add('unchecked');
        li.innerHTML=input.value;
        // li.appendChild(span)
        div.appendChild(li)
        div.appendChild(span)
        div.appendChild(edit)
        todoList[0].appendChild(div)
        console.log('value',input.value)
        input.value=''
        saveData();
    }
}
todoList[0].addEventListener('click',async(e)=>{
    if(e.target.tagName==="LI"){
            e.target.classList.toggle('checked')
            e.target.classList.toggle('unchecked')
            saveData()
        console.log('li',e.target.tagName)
    }
    else if(e.target.tagName==="SPAN"){
        Swal.fire({
            title: "Do you want to delete it?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Deleted Successfully !!", "", "success");
              e.target.parentElement.remove();
              saveData();
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });

}
else if(e.target.tagName==="BUTTON"){
    let inputValue=  e.target.parentElement.firstChild.textContent;
 const {value}=  await Swal.fire({
        title: "Enter updated task:",
        input: "textarea",
        inputValue,
        inputLabel: "Your Task",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        }
      });
      if (value) {
        Swal.fire({
            title:'Updated Successfully!!',
            icon:'success'
        });
        e.target.parentElement.firstChild.textContent=value;
         saveData();
      }
//     let text=prompt("Enter updated task:", e.target.parentElement.firstChild.textContent);
//     if(text){
//     e.target.parentElement.firstChild.textContent=text;
//     saveData();
//   }
    console.log('edit',e.target.parentElement.firstChild.textContent)
    // e.target.parentElement.remove();
    }
    console.log(e.target)
},false)

function saveData(){
    localStorage.setItem('data',todoList[0].innerHTML)
}
function showTask(){
    todoList[0].innerHTML=localStorage.getItem('data')
}
 showTask();
// todo.forEach((val)=>{
//     val.addEventListener('click',()=>{
       
//         val.classList.toggle('checked')
//         val.classList.toggle('unchecked')
//         // val.parentElement.removeChild(val)
       
//     },false)
// })
// todo.forEach((val)=>{
//     let span=val.querySelector('span');
//     span.addEventListener('click',()=>{
//         val.parentElement.removeChild(val)
//     },false);
//     console.log(val.querySelector('span'),val.textContent)
// })
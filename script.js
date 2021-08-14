showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function () {
  addtaskinputval = addtaskinput.value;
  if (addtaskinputval.trim() != 0) {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskobj = [];
    } else {
      taskobj = JSON.parse(webtask);
    }
    taskobj.push(addtaskinputval);
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    addtaskinput.value = "";
  }

  showtask();
});

function showtask() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskobj = [];
  } else {
    taskobj = JSON.parse(webtask);
  }

  let html = "";
  let addedtasklist = document.getElementById("addedtasklist");
  taskobj.forEach((item, index) => {
    html += `            <tr class="justify-content-center align-item-center">
<th scope="row" class="fs-2">${index + 1}</th>
<td class="fs-3">${item}</td>
<td>
  <button
    type="button"
    onclick="edittask(${index})"
    class="text-dark btn btn-light mt-1"
  >
    <i class="fa fa-edit"></i> Edit
  </button>
</td>
<td>
  <button type="button" class="text-dark btn btn-info mt-1">
    <i class="fa fa-check-square"></i> Complete
  </button>
</td>
<td>
  <button
    type="button"
    onclick="deleteitem(${index})"
    class="text-dark btn btn-secondary mt-1"
  >
    <i class="fa fa-trash"></i> Delete
  </button>
</td>
</tr>`;
  });

  addedtasklist.innerHTML = html;
}

function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let addtaskbtn = document.getElementById("addtaskbtn");
  let savetaskbtn = document.getElementById("savetaskbtn");
  saveindex.value = index;
  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  addtaskinput.value = taskobj[index];
  addtaskbtn.style.display = "none";
  savetaskbtn.style.display = "inline";
}



function completetask(index){
    let webtask = localStorage.getItem("localtask");
    let taskobj  = JSON.parse(webtask);
    taskobj [index] = '<span style="text-decoration:line-through">' + taskobj [index] + '</span>';
    let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
        console.log(addedtasklist)
    })
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    showtask();
} 



let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;
  taskobj[saveindex] = addtaskinput.value;
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "inline";
  localStorage.setItem("localtask", JSON.stringify(taskobj));
  addtaskinput.value = "";
  showtask();
});

function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  taskobj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskobj));
  showtask();
}

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
  let savetaskbtn = document.getElementById("savetaskbtn");
  let addtaskbtn = document.getElementById("addtaskbtn");

  let webtask = localStorage.getItem("localtask");
  let taskobj = JSON.parse(webtask);
  if (webtask == null) {
    taskobj = [];
  } else {
    taskobj = JSON.parse(webtask);
    taskobj = [];
  }
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "inline";
  localStorage.setItem("localtask", JSON.stringify(taskobj));
  showtask();
});

let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
  let trlist = document.querySelectorAll("tr");
  Array.from(trlist).forEach(function (item) {
    let searchedtext = item.getElementsByTagName("td")[0].innerText;
    let searchtextboxval=searchtextbox.value;
    let re=new RegExp(searchtextboxval,'gi');
    if(searchedtext.match(re)){
      item.style.display='table-row';
    }else{
      item.style.display='none';
    }
  });
});

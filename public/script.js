let categories;
let duration = ["All Time", "Year", "Month", "Week", "Day"];
let date = new Date(Date.now());
let modif = false;

let selecter = document.getElementById('select');
let pre = document.getElementById('buttonpre');
let nex = document.getElementById('buttonnex');
selecter.addEventListener("change", fct_sel);
pre.addEventListener("mousedown", fct_pre, false);    
nex.addEventListener("mousedown", fct_nex, false);

for(let dure of duration){
    let op = document.createElement('option');
    op.value = dure;
    op.textContent = dure;
    selecter.appendChild(op);
}

requestCategories().then(function () {
    div_categories();
}
).then(function(){
    Draw_Categories();
})

console.log("finish");
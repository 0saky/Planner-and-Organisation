let categories;

requestCategories().then(function () {
    for (let i = 0; i < categories.length; i++) {
        console.log("Making div: " + categories[i].name)
        let div = document.createElement('div');
        div.id = categories[i].name;
        div.style = "margin-bottom: 8px!important;";
        document.getElementById('main').appendChild(div);
    }
}
).then(function(){
    Draw_Categories();
})

console.log("finish");
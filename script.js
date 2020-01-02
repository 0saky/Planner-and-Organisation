console.log("Nous allons fetch une image !");

fetch('https://pbs.twimg.com/media/EMfKGzXXUAAM2rw?format=jpg&name=large').then(response => {
    console.log(response);
    return response.blob();
}).then(blob => {
    console.log(blob);
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
}).catch(error => {
    console.log("There is an error coming");
    console.error(error);
})
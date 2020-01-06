console.log("Nous allons fetch une image !");

//const ImageLink = ['IMG.jpg'];

const ImageLink = ['https://pbs.twimg.com/media/EKjmckrXkAARzLT?format=jpg&name=large',
        'https://pbs.twimg.com/media/ELXDM50X0AAIrP4?format=jpg&name=large',
        'https://pbs.twimg.com/media/EMzoU3EW4AcIZqS?format=jpg&name=4096x4096',
        'https://pbs.twimg.com/media/EMfKGzXXUAAM2rw?format=jpg&name=large'];


for(let i = 0; i < ImageLink.length; i++){

    console.log("Nous chargons actuellement l\'image numero " + i);
    getImage(i)
    .then(response => {
        console.log('Chargement ...');
    })
    .catch( error => {
        console.log('Une érreur vas suivre : ');
        console.log(error);
    });

};


async function getImage(i){

    const response = await fetch(ImageLink[i]);

    const blob = await response.blob();    

    let img = document.createElement('img');
    
    img.src = URL.createObjectURL(blob);

    img.width = "600";

    document.getElementById('images').appendChild(img);    

}
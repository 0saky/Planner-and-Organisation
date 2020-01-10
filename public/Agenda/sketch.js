

const lang = "fr-FR";//  "en-US";
const numberofdays = 8 ;
let options;
let canvas;

function setup() {
    //Creating Canvas
    canvas = createCanvas(windowWidth-20, windowHeight-20);
    background(220);

    //Get current date
    let date = new Date(Date.now());
    //let date = new Date('January 1, 2020 03:24:00')
    //Number of miliseconds in a day;
    const increment = 86400000;
    let days = [];
            
    for(let i = 0; i < numberofdays; i++ ){

        const vardate = new Date(Date.parse(date) + (i - floor(numberofdays/2))*increment);
        let day = [];
        //Store it in diffrent variables
        options = {year: "numeric"}
        day.push(new Intl.DateTimeFormat(lang, options).format(vardate));
        options = {month: "long"}
        day.push(new Intl.DateTimeFormat(lang, options).format(vardate));
        options = {weekday: "long", day: "numeric"}
        day.push(new Intl.DateTimeFormat(lang, options).format(vardate));
        
        days.push(day);
        console.log(day);
    }
    console.log(days);

    //recuper premier et dernier de chaque
    let years = [0];
    let months = [0];
    
    for(let j = 1; j < days.length-1; j++){
        if(days[j][0] != days[j-1][0]){
            years.push(j);
        }
        if(days[j][1] != days[j-1][1]){
            months.push(j);
        }                            
    }
    years.push(numberofdays-1);
    months.push(numberofdays-1);
    console.log("years : " + years);
    console.log("months : "+ months);
    let conty = 0;
    let contm = 0;

    textAlign(CENTER);
    push();
    translate(150, 0);

    for(let k = 0; k < numberofdays; k++){
        const column = k*width/numberofdays;
        if(k == floor((years[conty]+years[conty+1])/2)){
            
            conty++;
            contm++;
            
            textSize(25);
            text(days[k][0], column, 30);
            text(days[k][1], column, 60);
            text(days[k][2], column, 90);

        } else if (k == floor((months[contm]+months[contm+1])/2)){
            
            contm++;
            
            textSize(25);
            text(days[k][1], column, 60);
            text(days[k][2], column, 90);
            
        } else {

            textSize(25);
            text(days[k][2], column, 90);

        }
    }
    pop();
    

    conty = 0;
    contm = 0;
    for(let l = 0; l < numberofdays; l++){
        
        draw_clumnlines(l, days[l][2].includes("Monday"), (days[l][2].includes("1 ") && !(days[l][2].includes("11") || days[l][2].includes("21") || days[l][2].includes("31"))));
    }
    
    draw_rowlines();

  }
  
  function draw() {
    
  }

  function draw_clumnlines(i, bool1, bool2){

    const column = (i-0.5)*width/numberofdays + 150; 
      
    if(bool1){
        strokeWeight(5);
        line(column, 70, column, height);
    }else if(bool2){
        strokeWeight(5);
        line(column, 15, column, height);
    } else {
        strokeWeight(3);
        line(column, 70, column, height);
    }
  }

  function draw_rowlines(){

    for(let i = 1; i < 6; i++){
        const y = map(map(i, 0, 6, 0, 24), 0, 24, 70, height);
        stroke(0, 0, 0, 50)
        
        line(20, y, width, y);

        noStroke();
        textSize(20)
        textAlign(LEFT);
        text(i*4+"h", 0, y);
    }
  }

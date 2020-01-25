


function create_buttons() {

    button_home = createButton('Home');
    button_home.position(350, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_Agenda = createButton('Agenda');
    button_Agenda.position(410, 20);
    button_Agenda.attribute('onclick', "window.location.href = '..';");

    button_pday = createButton('<');
    button_pday.position(70, 65);
    button_pday.mousePressed(pday);

    button_nday = createButton('>');
    button_nday.position(375, 65);
    button_nday.mousePressed(nday);

    button_save = createButton('Save');
    button_save.position(200, 350);
    button_save.mousePressed(fxnSave);

}

function create_inputs() {

    input_title = createInput('');
    input_title.position(70, 150);
    input_title.changed(title_input);
    input_title.size(300, 30);

    input_notes = createInput('');
    input_notes.position(80, 230);
    input_notes.changed(notes_input);
    input_notes.size(500, 100);
}

function create_sliders() {

    slider_start = createSlider(0, 60 * 24, 60 * 10, 1);
    slider_start.position(140, 127);
    slider_start.changed(start_time);

    slider_end = createSlider(0, 60 * 24, 60 * 11, 1);
    slider_end.position(485, 127);
    slider_end.changed(end_time);

}

function create_selecter() {
    selecter_category = createSelect();
    selecter_category.position(110, 195);
    for (let i = 0; i < categories.length; i++) {
        selecter_category.option(categories[i]);
    }
    selecter_category.changed(fnxcategory);
}

function draw_text() {

    textSize(30);
    noStroke();
    fill(0);

    text("Create New Evenement", 0, 30);

    textSize(20);

    text("Date : ", 0, 75);


    options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const write = new Intl.DateTimeFormat(lang, options).format(day)
    text(write, 100, 75);

    text("Starting Time : " + floor(slider_start.value() / 60) + ':' + slider_start.value() % 60, 0, 115);


    text("Ending Time : " + floor(slider_end.value() / 60) + ':' + slider_end.value() % 60, 350, 115);


    text("Title : ", 0, 160);

    text("Category : ", 0, 200);

    text("Notes : ", 0, 230);




}

function pday() {
    day.setDate(day.getDate() - 1);
    fnxdate();
}

function nday() {
    day.setDate(day.getDate() + 1);
    fnxdate();
}

function fnxdate() {
    console.log('Date is: ', day);
}

function start_time() {
    console.log('Start time is: ', this.value());
}

function end_time() {
    console.log('End time is: ', this.value());
}

function title_input() {
    console.log('Title is: ', this.value());
}

function fnxcategory() {
    console.log('Category is: ', this.value());
}

function notes_input() {
    console.log('Notes are: ', this.value());
}

function fxnSave() {

    let starting = new Date(day);
    starting.setHours(floor(slider_start.value() / 60));
    starting.setMinutes(slider_start.value() % 60);

    let ending = new Date(day);
    ending.setHours(floor(slider_end.value() / 60));
    ending.setMinutes(slider_end.value() % 60);
    


    const to_send = {
        title: input_title.value(),
        starting: starting,
        ending: ending,
        category: selecter_category.value(),
        notes: input_notes.value()
    }




    SaveEvenement(to_send);


}

async function SaveEvenement(data) {

    console.log('Sending : ' + data);
    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/addEvenements', sendoptions);
    const json = await response.json();

    console.log(json);

}
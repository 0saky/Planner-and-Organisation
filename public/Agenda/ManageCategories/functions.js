
function create_buttons() {

    button_home = createButton('Home');
    button_home.position(50, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_Agenda = createButton('Agenda');
    button_Agenda.position(130, 20);
    button_Agenda.attribute('onclick', "window.location.href = '..';");
}


async function addCategoty(data) {

    const ToSend = {in: data};
    console.log('Sending : ', ToSend);
    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ToSend)
    }
    const response = await fetch('/addCategorie', sendoptions);
    const json = await response.json();

    console.log(json);

    if(json.status == 'Sucessfuly receved'){
         requestCategories();
    }


}
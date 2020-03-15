let categories;
let positions = {};
let modify = false;
let categoryModif;
let subcategories = [];
let subcategoriesColors = [];
let subcategoriestitles = [];
let AddcategoryDiv;

function setup() {

    canvas = createCanvas(windowWidth - 20, windowHeight - 20);

    create_buttons();

    AddcategoryDiv = document.createElement('div');
    document.body.appendChild(AddcategoryDiv);
    AddcategoryDiv.id = "Addcategory";

    requestCategories();

    console.log(categories);


}
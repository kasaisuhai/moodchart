const lightMode = "css/light_mode.css";
const darkMode = "css/dark_mode.css";
const blueThemeStyle = "css/theme_blue.css";
const greenThemeStyle = "css/theme_green.css";
const orangeThemeStyle = "css/theme_orange.css";
const purpleThemeStyle = "css/theme_purple.css";
const swatchOrder = ["light", "dark", "accent", "medium", "highlight"];

//Functions
function initializePage(){
    if(localStorage.getItem("Initialized") === null){
        localStorage.setItem("darkChecked", false);
        localStorage.setItem("currentTheme", "blue");

        localStorage.setItem("Initialized", true);
        console.log("Initialized");
    }
    else{
        let darkOn = localStorage.getItem("darkChecked");
        let currentTheme = localStorage.getItem("currentTheme");
        console.log("Dark Mode Checked: " + darkOn);
        console.log("Current Theme: " + currentTheme);

        if(darkOn === "true"){
            $(".form-check-input").prop("checked", true);
            $(".mode").attr("href", darkMode);
            console.log("Turned on Dark Mode");
        }
        else{
            $(".form-check-input").prop("checked", false);
            $(".mode").attr("href", lightMode);
            console.log("Turned on Light Mode");
        }

        setSelectedTheme(currentTheme);
        console.log("Already Initialized");
    }
}
function setSelectedTheme(color){
    console.log("Setting Theme: " + color);
    let themeSwatch = $("#selectedTheme .theme-swatch");

    for(let i=0; i<themeSwatch.length; i++){
        let newThemeClass = swatchOrder[i] + "-" + color;

        themeSwatch.eq(i).removeClass();
        themeSwatch.eq(i).addClass("theme-swatch " + newThemeClass);
        console.log("Swatch: " + newThemeClass)
    }

    switch(color){
        case "blue":
            $("#themeStyle").attr("href", blueThemeStyle);
            break;
        case "green":
            $("#themeStyle").attr("href", greenThemeStyle);
            break;
        case "orange":
            $("#themeStyle").attr("href", orangeThemeStyle);
            break;
        case "purple":
            $("#themeStyle").attr("href", purpleThemeStyle);
            break;
    }

    localStorage.setItem("currentTheme", color);
}

//Event Listeners
$(".tag").on("click", function(){ //Tag Selection
    $(this).toggleClass("active");
});

$(".form-check-input").on("change", function(){ //Light Mode Dark Mode Switch
    let switchOn = $(this).is(":checked");

    if(switchOn){
        localStorage.setItem("darkChecked", true);
        $(".mode").attr("href", darkMode);
    }
    else{
        localStorage.setItem("darkChecked", false);
        $(".mode").attr("href", lightMode);
    }
    console.log("Switch On: " + switchOn);
});

$("#dropdownEmail").on("click", function(){ //Reminder Method Selection
    $("#reminderMethodDropdownButton").html("Email");
    console.log("Email Selected");
});
$("#dropdownSms").on("click", function(){
    $("#reminderMethodDropdownButton").html("SMS");
    console.log("SMS Selected");
});
$("#dropdownBrowser").on("click", function(){
    $("#reminderMethodDropdownButton").html("Browser");
    console.log("Browser Selected");
});

$("#blueThemeDropdownItem").on("click", function(){ //Theme Selection
    setSelectedTheme("blue");
});
$("#greenThemeDropdownItem").on("click", function(){
    setSelectedTheme("green");
});
$("#orangeThemeDropdownItem").on("click", function(){
    setSelectedTheme("orange");
});
$("#purpleThemeDropdownItem").on("click", function(){
    setSelectedTheme("purple");
});

$(".custom-dropdown .dropdown-item").on("click", function(){ //Mood Selector Dropdown
    let selectedMood = $(this).attr("class");
    console.log("Selected Mood: " + selectedMood);

    $("#selectedMood").removeClass().addClass(selectedMood).removeClass("dropdown-item");
});

$(".form-range").on("input", function(){ //Mood Intensity Slider
    console.log("Sliding");
    let range = $(this);
    let hint = range.parent(".slider-container").find(".range-hint");

    console.log("Current Value: " + range.val());
    hint.html(range.val());
});
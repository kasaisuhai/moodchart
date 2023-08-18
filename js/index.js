const lightMode = "css/light_mode.css";
const darkMode = "css/dark_mode.css";
const blueThemeStyle = "css/theme_blue.css";
const greenThemeStyle = "css/theme_green.css";
const orangeThemeStyle = "css/theme_orange.css";
const purpleThemeStyle = "css/theme_purple.css";
const swatchOrder = ["light", "dark", "accent", "medium", "highlight"];

//Functions
function initializePage(){ //Initializes data for theme and light/dark mode
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
function setSelectedTheme(color){ //Sets and updates color theme
    console.log("Setting Theme: " + color);
    let themeSwatch = $("#selectedTheme .theme-swatch");

    for(let i=0; i<themeSwatch.length; i++){
        let newThemeClass = swatchOrder[i] + "-" + color;

        themeSwatch.eq(i).removeClass();
        themeSwatch.eq(i).addClass("theme-swatch " + newThemeClass);
        console.log("Swatch: " + newThemeClass);
    }

    switch(color){ //Apply theme css
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

function formatTime(time){
    let hour = parseInt(time.substring(0, time.indexOf(":")));
    let minute = time.substring(time.indexOf(":") + 1, time.indexOf(":") + 3);
    let ampm = time.substring(time.length-2);
    
    if(ampm==="PM") hour += 12;
    if(hour < 10) hour = "0" + hour;
    
    console.log("Hour: " + hour);
    console.log("Minute: " + minute);
    console.log("AMPM: " + ampm);
    
    time = hour + ":" + minute;
    console.log(time);
    return time;
}

function unformatTime(time){
    let hour = parseInt(time.substring(0, time.indexOf(":")));
    let minute = parseInt(time.substring(time.indexOf(":") + 1, time.indexOf(":") + 3));
    let ampm;

    if(hour < 12) ampm = "AM";
    else ampm = "PM";

    if(hour > 12) hour -= 12;
    if(hour==0) hour = 12;

    if(hour < 10) hour = "0" + hour;
    if(minute < 10) minute = "0" + minute;

    time = hour + ":" + minute + " " + ampm;
    console.log("Time: " + time);
    return time;
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

$("#sleepTimeInput").on("input", function(){ //Number Input
    console.log("Number Input");
    let num = $(this).val();
    let min = $(this).attr("min");
    let max = $(this).attr("max");
    console.log("");

    if(num < min) $(this).val(min);
    if(num > max) $(this).val(max);
});

$("input[type=radio]").on("click", function(){ //Analytics Graph Radio Buttons
    let checked = $(this).attr("id");
    
    $("#analyticsGraph").removeClass();
    $("#analyticsGraph").addClass("graph");
    
    switch(checked){
        case "1M":
            $("#analyticsGraph").addClass("month-view");
            break;
        case "3M":
            $("#analyticsGraph").addClass("quarterly-view");
            break;
        case "6M":
            $("#analyticsGraph").addClass("half-year-view");
            break;
        case "1Y":
            $("#analyticsGraph").addClass("full-year-view");
            break;
    }
});

$(".edit").on("click", function(){
    let reminder = $(this).parent();
    let currentTime = reminder.find(".reminder-time").html();
    currentTime = formatTime(currentTime);

    console.log("Reminder: " + reminder.attr("class"));
    console.log("Current Time: " + currentTime);

    $("#reminderModalButton").html("Save Reminder");
    $("#reminderModalButton").removeClass("create");
    $("#reminderModalButton").addClass("overwrite");
    $("#reminderTimeInput").val(currentTime);
    $("#reminderModalName").html(reminder.parent().find(".reminder-name").html());
});

$("#newReminderButton").on("click", function(){
    $("#reminderModalButton").html("Create Reminder");
    $("#reminderModalButton").addClass("create");
    $("#reminderModalButton").removeClass("overwrite");
    $("#reminderTimeInput").val("00:00");
    $("#reminderModalName").html("Reminder " + $().length());
});

// $("#reminderModalButton .overwrite").on("click", function(){
//     let time = $("#reminderTimeInput").val();
//     time = unformatTime(time);

//     console.log("Reminder Time:" + $("#reminder1Time").html());

//     $("#reminder1Time").html(time);
//     console.log("Time: " + time);
// });
// $("#reminderModalButton").on("click", function(){
//     let time = $("#reminderTimeInput").val();
//     time = unformatTime(time);

//     console.log("Time: " + time);
// });
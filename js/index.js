const lightMode = "css/light_mode.css";
const darkMode = "css/dark_mode.css";

//Functions
function initializePage(){
    if(localStorage.getItem("darkChecked") === null){
        localStorage.setItem("darkChecked", false);
        console.log("Initialized");
    }
    else{
        let darkOn = Boolean(localStorage.getItem("darkChecked"));
        console.log("Dark Mode Checked: " + darkOn);

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
        console.log("Already Initialized");
    }
}

//Event Listeners
$(".form-check-input").on("change", function(){
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

    

function directToBeginnerKata8(){

    const kata8url="https://www.codewars.com/kata/search/?q=&r%5B%5D=-8&beta=false&order_by=sort_date%20desc"
    window.open(kata8url, "_blank");

}

function promptCompleteFiveKatas() {
    return new Promise((resolve, reject) => {
        const confirmed = confirm("You are now on CodeWars. Please complete five katas before continuing to create your coding profile.");
        if (confirmed) {
            resolve();
        } else {
            reject("User cancelled kata completion.");
        }
    });
}

function directUserToCodeWarsAndCompleteKatas(req,res) {
    if (req.body.selectLevelOfCoding==="Beginner") {
        req.body.completeChallenge=kata8urli;
        directToBeginnerKata8();
        promptCompleteFiveKatas()
            .then(() => {
                console.log("User completed five katas. Proceed to create coding profile.");
                
            })
            .catch((err) => {
                console.error("Error:", err.message);
            });
    } else {
        console.log("For intermediate and advanced levels, please select katas according to your level on CodeWars.");
        
    }
}
directUserToCodeWarsAndCompleteKatas();


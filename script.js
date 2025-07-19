const Base_URL = "https://api.exchangerate-api.com/v4/latest/";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let select of dropDowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "From" && currCode === "INR"){
            newOption.selected = "selected";
        }
        else if(select.name == "To" && currCode === "USD"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

 btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amount.value = "1";
        amtValue = 1;
    }
    const URL = `${Base_URL}${fromCurr.value}`;
let response = await fetch(URL);
let data = await response.json();
let rate = data.rates[toCurr.value];
let final_amount = amtValue * rate;
msg.innerText = `${amtValue} ${fromCurr.value} = ${final_amount} ${toCurr.value} `;
});
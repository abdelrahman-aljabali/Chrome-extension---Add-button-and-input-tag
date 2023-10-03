let myLeads = [];
// myLeads = JSON.stringify(myLeads); // to change array to a string

// myLeads = JSON.parse(myLeads);     // to change string to an array
// console.log(typeof myLeads)
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn =  document.getElementById("delete-btn");
const leadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn =  document.getElementById("save-btn");


if (leadsfromLocalStorage) {
    myLeads = leadsfromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs && tabs.length > 0) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        } else {
            console.error("Unable to get current tab information.");
        }
    });
});



function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {

    // listItems += "<li><a target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>";

    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>`;
    
}

ulEl.innerHTML = listItems
}
   


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});
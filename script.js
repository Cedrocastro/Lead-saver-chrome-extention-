let myLinks = [] 
const inputEl = document.getElementById("input-el")
const buttonEl = document.getElementById("button-el")
const ulEl = document.getElementById("ul-el")
const clearBtn = document.getElementById("clear-btn")
const linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
const tabBtn = document.getElementById("tab-btn")

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

clearBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

buttonEl.addEventListener("click", function() {
    myLinks.push(inputEl.value)
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    inputEl.value = ""
    render(myLinks) 
})

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems += 
        `<li>
            <a target='_blank' href='${links[i]}'>${links[i]}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}




    
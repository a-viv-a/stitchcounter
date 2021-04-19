if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js")
const l = localStorage
//function to add event listener to element
//this function will be made into single char by terser
const addEl = (element, fn, ev = "click") => {
    element.addEventListener(ev, fn)
}
class Counter {
    constructor() {
        this.element = document.getElementById("countNumber")

        //get the counters array or make it
        this._counters = JSON.parse(l.counters || '[{"name":"default","increment":1,"stitches":[0]}]')
        this.index = 0

        //handle data migration
        if (l.stitches || l.increment) {
            this.counters[0].increment = l.increment
            this.counters[0].stitches = l.stitches
            delete l.stitches
            delete l.increment
            delete l.cRowStitches
            console.log("old data migrated")
        }

        this.syncStorage()
        //seems silly but this runs the functions in setters
        this.number = this.number
        this.increment = this.increment

        //make the tabs
        this.makeTab("test")
    }

    get counters() { return this._counters }
    set counters(value) { this._counters = value; this.syncStorage() }

    get counter() { return this.counters[this.index] }
    set counter(value) { this.counters[this.index] = value }

    get stitches() { return this.counter.stitches }
    set stitches(value) { this.counter.stitches = value }


    get number() { return this.stitches[this.stitches.length - 1] }
    set number(value) {
        value = Math.max(0, value) //clamp values
        //disable remove button if value is zero
        removeButton.disabled = value == 0
        //display the new value on screen
        this.element.textContent = value
        //store the new value
        this.stitches[this.stitches.length - 1] = value
        //store to localstorage
        this.syncStorage()
        //write the new value to the newest row
        this.stitches[this.stitches.length - 1] = value
        //update the table to show the value
        this.syncTable()
    }

    get increment() { return this.counter.increment }
    set increment(value) {
        //store the new value
        this.counter.increment = value
        //update the onscreen buttons
        this.fixMods()
    }

    shiftMods(value) {
        this.increment = mods[mods.indexOf(this.increment) + value] || this._increment
    }
    fixMods() {
        //enable all buttons
        valMod.forEach((i) => elementArray[i].disabled = false)
        //disable the button that corresponds to the increment
        elementArray[valMod[this.increment]].disabled = true
    }
    syncTable(scroll = false) {
        //ensure we have enough rows to show all our data
        while (stitchTable.rows.length - 1 < this.stitches.length) {
            let row = stitchTable.insertRow(-1)
            row.insertCell(0).textContent = stitchTable.rows.length - 1
            row.insertCell(1).textContent = 0
        }
        //update every row to be equal to the array value
        this.stitches.forEach((stitches, index) => {
            stitchTable.rows[index + 1].cells[1].textContent = stitches
            //if we need to scroll and are on the final row, scroll it into view
            if (scroll && index === this.stitches.length - 1) stitchTable.rows[index + 1].scrollIntoView()
        })
    }
    syncStorage() {
        l.counters = JSON.stringify(this.counters)
    }
    newRow() {
        this.stitches.push(0) //add element to the array
        this.syncTable(true) //sync it to the onscreen table, and scroll it into view
        this.number = 0 //reset current row
    }
    makeTab(name) {
        let tab = document.createElement("button")
        tab.className = "tab"
        tab.textContent = name
        addEl(tab, ()=>console.log(`${name} was clicked`))
        titleBlock.insertBefore(tab, newTab)
    }
    reset() {
        //dont proceed if the popup is canceled
        if (!confirm("all rows, stitches and other data in all counters will be cleared.\nproceed?")) return
        //clear localstorage data
        l.clear()
        //reset values to default
        this.number = 0
        this.stitches = [0]
        this.increment = 1
        //delete all the rows in the onscreen table, leaving the labels
        while (stitchTable.rows.length > 1) stitchTable.deleteRow(1)
        this.syncTable()
    }
}

//get all the html elements, and init the counter object
let elementArray = [], valMod = [, 2, , 3, , 4, , , , , 5], mods = [1, 3, 5, 10]
    ;["addButton", "removeButton", "mod1", "mod3", "mod5", "mod10", "mainBlock", "countBlock", "stitchTable", "newRow", "reset", "titleBlock", "newTab"]
        .forEach(id => elementArray.push(document.getElementById(id)))
let [addButton, removeButton, mod1, mod3, mod5, mod10, mainBlock, countBlock, stitchTable, newRow, reset, titleBlock, newTab] = elementArray,
    count = new Counter()

//add all the event listeners
addEl(addButton, () => count.number += count.increment)
addEl(removeButton, () => count.number -= count.increment)

addEl(newRow, () => count.newRow())
addEl(reset, () => count.reset())

for (let i = 2; i <= 5; i++) { //add the listeners for mod buttons programatically using element array
    addEl(elementArray[i], () => count.increment = mods[i - 2])
}

// add eventlistener to handle keyboard input
addEl(document, ev => {
    if (ev.repeat) return
    console.log(ev.code)
    let handled = true
    switch (ev.code) {
        case "Space":
        case "ArrowUp":
            addButton.click()
            break
        case "ArrowRight":
            count.shiftMods(1)
            break
        case "ArrowLeft":
            count.shiftMods(-1)
            break
        case "ArrowDown":
            removeButton.click()
            break
        default:
            handled = false
    }
    if (handled) ev.preventDefault()
}, "keydown")

//window managment
const fixOrder = () => {
    if (document.body.clientWidth <= document.body.clientHeight) {
        if ((mainBlock.style.flexDirection || "row") === "row") {
            mainBlock.style.flexDirection = "column-reverse"
            countBlock.style["flex-grow"] = 1
        }
    } else {
        if ((mainBlock.style.flexDirection || "column-reverse") === "column-reverse") {
            mainBlock.style.flexDirection = "row"
            countBlock.style["flex-grow"] = 3
        }
    }
}
addEl(window, fixOrder, "resize")
addEl(window, fixOrder, "load")
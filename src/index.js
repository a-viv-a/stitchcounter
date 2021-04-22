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
        this._index = 0

        //handle data migration
        if (l.stitches || l.increment) {
            this.counters[0].increment = parseInt(l.increment)
            this.counters[0].stitches = JSON.parse(l.stitches)
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
        this.tabs = []
        this._counters.forEach(counter => this.makeTab(counter.name))
        this.tabs[0].disabled = true
    }

    get index() { return this._index }
    set index(value) {
        this._index = value
        //this should be a function
        this.number = this.number
        this.increment = this.increment
    }

    get counters() { return this._counters }
    set counters(value) { this._counters = value; this.syncStorage() }

    get counter() { return this.counters[this.index] }
    set counter(value) { this.counters[this.index] = value }

    get stitches() { return this.counter.stitches }
    set stitches(value) { this.counter.stitches = value; this.syncTable(); }


    get number() { return this.stitches[this.stitches.length - 1] }
    set number(value) {
        value = Math.max(0, value) //clamp values
        //store the new value
        this.stitches[this.stitches.length - 1] = value
        //show the new value
        this.sync(false)
    }

    get increment() { return this.counter.increment }
    set increment(value) {
        //store the new value
        this.counter.increment = value
        //update the onscreen buttons
        this.sync()
    }

    sync(mod = true, storage = true, scroll = false) {
        if (storage) l.counters = JSON.stringify(this.counters)
        
        //disable remove button if value is zero
        removeButton.disabled = this.number == 0
        //display the new value on screen
        this.element.textContent = this.number

        //sync the mods
        if (mod) {
            //enable all buttons
            valMod.forEach((i) => elementArray[i].disabled = false)
            //disable the button that corresponds to the increment
            elementArray[valMod[this.increment]].disabled = true
        }

        //sync the table
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

    shiftMods(value) {
        this.increment = mods[mods.indexOf(this.increment) + value] || this._increment
    }
    fixMods() {
        console.log("mod no more")
    }
    syncTable(scroll = false) {
    }
    clearTable() {
        while (stitchTable.rows.length > 1) stitchTable.deleteRow(1)
    }
    syncStorage() {
        console.log("store no more!")
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
        addEl(tab, () => {
            this.enableAllTabs()
            tab.disabled = true
            this.clearTable()
            this.setCounter(name)
        })
        this.tabs.push(titleBlock.insertBefore(tab, newTab))
        return tab
    }
    enableAllTabs() {
        this.tabs.forEach(tab => tab.disabled = false)
    }
    setCounter(name) {
        this.counters.some(
            (counter, index) => {
                if (counter.name === name) {
                    this.index = index
                    return true
                }
            }
        )
    }
    reset() {
        //dont proceed if the popup is canceled
        if (!confirm("all rows, stitches and other data in all counters will be cleared.\nproceed?")) return
        //clear localstorage data
        l.clear()
        //reset values to default
        this.counters = [{ name: "default", increment: 1, stitches: [0] }]
        this.tabs.forEach(tab => tab.remove())
        this.makeTab("default").click()
    }
}

//get all the html elements, and init the counter object
let elementArray = [], valMod = [, 2, , 3, , 4, , , , , 5], mods = [1, 3, 5, 10]
    ;["addButton", "removeButton", "mod1", "mod3", "mod5", "mod10", "mainBlock", "countBlock", "stitchTable", "newRow", "reset", "titleBlock", "newTab", "options", "optionsDiv", "removeTab", "removeRow"]
        .forEach(id => elementArray.push(document.getElementById(id)))
let [addButton, removeButton, mod1, mod3, mod5, mod10, mainBlock, countBlock, stitchTable, newRow, reset, titleBlock, newTab, options, optionsDiv, removeTab, removeRow] = elementArray,
    count = new Counter()

//add all the event listeners
addEl(addButton, () => count.number += count.increment)
addEl(removeButton, () => count.number -= count.increment)

addEl(newRow, () => count.newRow())
addEl(options, () => {
    optionsDiv.style.display = optionsDiv.style.display === "flex" ? "none" : "flex"
})

addEl(removeRow, () => {
    console.log("remove row")
})

addEl(reset, () => count.reset())

addEl(newTab, () => {
    let name = prompt(
        "name your new counter\nnames cannot be reused, and will display in all lowercase",
        `default${count.counters.length + 1}`
    )
    if (name === "" || name === null) return
    name = name.toLowerCase()
    if (count.counters.some(counter => counter.name === name)) {
        alert("name is already in use")
        return
    }
    count.counters.push({ name: name, increment: 1, stitches: [0] })
    count.makeTab(name).click()
})

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
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js")
class Counter {
    constructor() {
        this.element = document.getElementById("countNumber")
        if (!localStorage.increment) localStorage.increment = 1
        this._increment = parseInt(localStorage.increment)
        this.stitches = JSON.parse(localStorage.stitches || false) || [this.number]
        this.syncTable()
        this.number = (parseInt(localStorage.cRowStitches) || 0)
        this.fixMods()
    }
    set number(value) {
        value = Math.max(0, value)
        removeButton.disabled = value <= 0
        this.element.textContent = value
        localStorage.cRowStitches = value
        this.stitches[this.stitches.length - 1] = value
        this.syncTable()
    }
    get number() { return parseInt(this.element.textContent) }
    get increment() { return this._increment }
    set increment(value) {
        this._increment = value
        localStorage.increment = value
        this.fixMods()
    }
    fixMods() {
        valMod.forEach((i) => elementArray[i].disabled = false)
        elementArray[valMod[this._increment]].disabled = true
    }
    syncTable(scroll = false) {
        localStorage.stitches = JSON.stringify(this.stitches)
        while (stitchTable.rows.length - 1 < this.stitches.length) {
            let row = stitchTable.insertRow(-1)
            row.insertCell(0).textContent = stitchTable.rows.length - 1
            row.insertCell(1).textContent = 0
        }
        this.stitches.forEach((stitches, index) => {
            stitchTable.rows[index + 1].cells[1].textContent = stitches
            if (scroll && index === this.stitches.length - 1) stitchTable.rows[index + 1].scrollIntoView()
        })
    }
    newRow() {
        this.stitches.push(0)
        this.syncTable(true)
        this.number = 0
    }
    reset() {
        if (!confirm("all rows, stitches and other data will be cleared.\nproceed?")) return
        localStorage.clear()
        this.stitches = [0]
        this.number = 0
        this.increment = 1
        while (stitchTable.rows.length > 1) stitchTable.deleteRow(1)
        this.syncTable()
    }
}

let elementArray = [], valMod = [, 2, , 3, , 4, , , , , 5]
    ;["addButton", "removeButton", "mod1", "mod3", "mod5", "mod10", "mainBlock", "countBlock", "stitchTable", "newRow", "reset"]
        .forEach(id => elementArray.push(document.getElementById(id)))
let [addButton, removeButton, mod1, mod3, mod5, mod10, mainBlock, countBlock, stitchTable, newRow, reset] = elementArray,
    count = new Counter()
addButton.addEventListener("click", () => count.number += count.increment)
removeButton.addEventListener("click", () => count.number -= count.increment)
newRow.addEventListener("click", () => count.newRow())
reset.addEventListener("click", () => count.reset())

mod1.addEventListener("click", () => { mod1.disabled = true; count.increment = 1 })
for (let i = 2; i <= 5; i++) {
    elementArray[i].addEventListener("click", () => count.increment = [1, 3, 5, 10][i - 2])
}
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
window.addEventListener("resize", fixOrder)
window.addEventListener("load", fixOrder)
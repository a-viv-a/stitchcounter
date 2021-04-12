class Counter {
    constructor() {
        this.element = document.getElementById("countNumber")
        if (!localStorage.increment) localStorage.increment = 1
        this._increment = parseInt(localStorage.increment)
        this.number = (parseInt(localStorage.cRowStitches) || 0)
        this.fixMods()
    }
    set number(value) {
        value = Math.max(0, value)
        removeButton.disabled = value <= 0
        this.element.textContent = value
        localStorage.cRowStitches = value
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
}

let elementArray = [], valMod = [,2,,3,,4,,,,,5]
    ;["addButton", "removeButton", "mod1", "mod3", "mod5", "mod10", "mainBlock", "countBlock"]
        .forEach((id) => { elementArray.push(document.getElementById(id)) })
let [addButton, removeButton, mod1, mod3, mod5, mod10, mainBlock, countBlock] = elementArray,
count = new Counter()
addButton.addEventListener("click", () => count.number += count.increment)
removeButton.addEventListener("click", () => count.number -= count.increment)

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
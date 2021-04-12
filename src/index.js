class Counter {
    constructor() {
        this.element = document.getElementById("countNumber")
    }
    set number(value) {
        value = Math.max(0, value)
        removeButton.disabled = value <= 0
        //console.log(`counter set to ${value}`)
        this.element.textContent = value
    }
    get number() { return parseInt(this.element.textContent) }
}

let countNumber = new Counter()
let buttonArray = []
    ;["addButton", "removeButton", "mod1", "mod3", "mod5", "mod10"].forEach((id) => { buttonArray.push(document.getElementById(id)) })
let [addButton, removeButton, mod1, mod3, mod5, mod10] = buttonArray
addButton.addEventListener("click", () => countNumber.number++)
removeButton.addEventListener("click", () => countNumber.number--)
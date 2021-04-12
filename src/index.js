class Counter {
    constructor() {
        this.element = document.getElementById("countNumber")
    }
    set number(value) {
        value = Math.max(0, value)
        removeButton.disabled = value <= 0
        this.element.textContent = value
    }
    get number() { return parseInt(this.element.textContent) }
}

let countNumber = new Counter()
let elementArray = []
    ;["addButton", "removeButton", "mod1", "mod3", "mod5", "mod10", "mainBlock", "countBlock"]
        .forEach((id) => { elementArray.push(document.getElementById(id)) })
let [addButton, removeButton, mod1, mod3, mod5, mod10, mainBlock, countBlock] = elementArray
addButton.addEventListener("click", () => countNumber.number++)
removeButton.addEventListener("click", () => countNumber.number--)
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
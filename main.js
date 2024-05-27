const btns = document.querySelectorAll(".btn");
const output = document.getElementById("results");
const ops = document.querySelectorAll(".op");
const calc = document.querySelector(".eq");
const dlt = document.querySelector(".del");
const clear = document.querySelector(".clear");
let dotDumped = true;

btns.forEach((btn) => {
    btn.addEventListener("click", function () {
        if (
            isNaN(Number.parseFloat(output.value.at(-1))) &&
            output.value.at(-1) != "."
        ) {
            output.value += " " + btn.getAttribute("data-value");
        } else {
            output.value += btn.getAttribute("data-value");
        }
    });
});
ops.forEach((op) => {
    op.addEventListener("click", function () {
        let size = output.value.length;
        if (size > 0) {
            if (
                isNaN(Number.parseFloat(output.value.at(-1))) &&
                op.getAttribute("data-value") != "."
            ) {
                if (output.value.at(-1) == ".") {
                    output.value =
                        output.value.substring(0, size - 1) +
                        " " +
                        op.getAttribute("data-value");
                } else {
                    output.value =
                        output.value.substring(0, size - 2) +
                        " " +
                        op.getAttribute("data-value");
                }
                dotDumped = true;
            } else {
                if (
                    op.getAttribute("data-value") == "." &&
                    dotDumped &&
                    Number.parseFloat(output.value.at(-1))
                ) {
                    output.value += op.getAttribute("data-value");
                    dotDumped = false;
                } else {
                    if (op.getAttribute("data-value") != ".") {
                        output.value += " " + op.getAttribute("data-value");
                        dotDumped = true;
                    }
                }
            }
        }
    });
});
clear.addEventListener("click", function () {
    output.value = "";
    dotDumped = true;
});
calc.addEventListener("click", function () {
    if (output.value.length > 0) {
        if (isNaN(Number.parseFloat(output.value.at(-1)))) {
            if (output.value.at(-1) == "/" || output.value.at(-1) == "*")
                output.value = eval(output.value + "1");
            else output.value = eval(output.value + "0");
        } else output.value = eval(output.value);
        if (Number.isInteger(parseFloat(output.value))) dotDumped = true;
        else dotDumped = false;
    }
});
dlt.addEventListener("click", function () {
    let size = output.value.length;
    if (size > 0) {
        if (
            isNaN(Number.parseFloat(output.value.at(-1))) &&
            output.value.at(-1) != "."
        )
            output.value = output.value.substring(0, size - 2);
        else {
            if (output.value.at(-1) == ".") {
                dotDumped = true;
            }
            if (
                output.value.at(-1) == "." ||
                output.value.at(-2) == "." ||
                Number.parseFloat(output.value.at(-2))
            ) {
                output.value = output.value.substring(0, size - 1);
            } else {
                output.value = output.value.substring(0, size - 2);
            }
        }
    }
});

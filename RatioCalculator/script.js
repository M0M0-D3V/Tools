// welcome minion
console.log("I am alive")

const calculate = () => {
    console.log("calculating the thing")
    let numer1 = document.getElementById("numer1")
    let denom1 = document.getElementById("denom1")
    let numer2 = document.getElementById("numer2")
    let denom2 = document.getElementById("denom2")
    let message = document.getElementById("message")

    // check if at least 3 numbers are filled
    let daCount = countInput(numer1, denom1, numer2, denom2)
    if(daCount < 3) {
        message.innerHTML = "Less than 3 numbers inputted, please enter 3 numbers"
    }
    // else if(daCount > 3) {
    //     console.log("there's 4")
    // }
    else {
        message.innerHTML = ""
        getRatio(numer1, denom1, numer2, denom2)
    }
}

const countInput = (n1, d1, n2, d2) => {
    let count = 0
    if(n1.value != "") {
        count++
    }
    if(d1.value != "") {
        count++
    }
    if(n2.value != "") {
        count++
    }
    if(d2.value != "") {
        count++
    }
    return count
}

const getRatio = (n1, d1, n2, d2) => {
    let mult = 0
    let ans = 0
    if(n1.value != "" && d2.value != "") {
        mult = n1.value * d2.value
        console.log("mult: ", mult)
        if(n2.value != "") {
            ans = (mult / n2.value).toFixed(2)
            d1.value = ans
        }
        else if(d1.value != "") {
            ans = (mult / d1.value).toFixed(2)
            n2.value = ans
        }
        console.log("ans: ", ans)
    }
    else if(d1.value != "" && n2.value != "") {
        mult = d1.value * n2.value
        console.log("mult: ", mult)
        if(d2.value != "") {
            ans = (mult / d2.value).toFixed(2)
            n1.value = ans
        }
        else if (n1.value != "") {
            ans = (mult / n1.value).toFixed(2)
            d2.value = ans
        }
        console.log("ans: ", ans)
    }
}

// $(document).ready(function(){
    // $("button").click(function(){
    //   alert("Value: " + $("#test").val());
    // });
//   });
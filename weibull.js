function makeDiv(){
    let title = document.createElement("h6")

    let titlecol = document.createElement("div")
    titlecol.className = "col"
    titlecol.appendChild(title)

    var remove = document.createElement("button")
    remove.className = "btn-close"
    remove.onclick = function (){
        let toremove = this.parentNode.parentNode.parentNode
        toremove.parentNode.removeChild(toremove)
        plot()
    }

    let removecol = document.createElement("div")
    removecol.className = "col-auto"
    removecol.appendChild(remove)

    let titlerow = document.createElement("div")
    titlerow.className = "row"
    titlerow.appendChild(titlecol)
    titlerow.appendChild(removecol)
    
    let spanbeta = document.createElement("span")
    spanbeta.className = "input-group-text"
    spanbeta.innerHTML = "&beta;"

    let inputbeta = document.createElement("input")
    inputbeta.className = "form-control"
    inputbeta.type = "number"
    inputbeta.required = true
    inputbeta.min = 0.1
    inputbeta.step = 0.1
    inputbeta.value = 1
    inputbeta.onchange = function (){
        plot()
    }

    let divbeta = document.createElement("div")
    divbeta.classList = "input-group py-1"
    divbeta.appendChild(spanbeta)
    divbeta.appendChild(inputbeta)

    let spaneta = document.createElement("span")
    spaneta.className = "input-group-text"
    spaneta.innerHTML = "&eta;"

    let inputeta = document.createElement("input")
    inputeta.className = "form-control"
    inputeta.type = "number"
    inputeta.disabled = true
    inputeta.readOnly = true

    let diveta = document.createElement("div")
    diveta.classList = "input-group"
    diveta.appendChild(spaneta)
    diveta.appendChild(inputeta)

    let container = document.createElement("div")
    container.className = "col-3"
    container.appendChild(titlerow)
    container.appendChild(divbeta)
    container.appendChild(diveta)
    
    let entries = document.getElementById("entries")
    entries.appendChild(container)

    plot()
}


function plot(){
    let entries = document.getElementById("entries")
    let mttf = parseFloat(document.getElementById("mttf").value)
    var steps = 100
    var start = 0
    var stop = mttf*3
    var step = (stop - start)/(steps-1)
    var t = []
    var data = []

    for (var i = 0; i < steps; i++){
        t.push(start + step*i)
    }

    for (let i = 1, max=entries.children.length; i < max; i++){
        entries.children[i].children[0].children[0].children[0].innerHTML = "Distribution " + i
        let beta = parseFloat(entries.children[i].children[1].children[1].value)
        let eta = mttf/math.gamma(1/beta+1)
        console.log(eta)
        entries.children[i].children[2].children[1].value = eta
        let f = []
        // let fail = []
        // let rely = []
        for (var t_ of t){
            f.push(beta/eta*(t_/eta)**(beta-1)*Math.exp(-1*(t_/eta)**beta))
            // rely.push(Math.exp(-1*(t_/eta)**beta))
        }
        // for (var r of rely){
        //     fail.push(1 - r)
        // }
        data.push({
            x: t,
            y: f,
            // customdata: {f: fail, r: rely},
            // hovertemplate: "",
            name: entries.children[i].children[0].children[0].children[0].innerHTML,
            type: "line"
        })
    }

    var layout = {
        hovermode: 'x unified',
        title: {
            text: 'Weibull Distribution'
        },
        shapes: [{
            label: {
                text: "MTTF",
                textposition: "middle"
            },
            line: {
                color: "red",
                dash: "dash"
            },
            type: "line",
            x0: mttf,
            x1: mttf,
            xref: "x",
            y0: 0,
            y1: 1,
            yref: "y domain"
        }]
    }

    Plotly.newPlot('plot', data, layout)
}

makeDiv()
plot()

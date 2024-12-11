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
        updateTitles()
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

    let divbeta = document.createElement("div")
    divbeta.className = "input-group"
    divbeta.appendChild(spanbeta)
    divbeta.appendChild(inputbeta)

    let spaneta = document.createElement("span")
    spaneta.className = "input-group-text"
    spaneta.innerHTML = "&eta;"

    let inputeta = document.createElement("input")
    inputeta.className = "form-control"
    inputeta.type = "number"
    inputeta.required = true

    let diveta = document.createElement("div")
    diveta.className = "input-group"
    diveta.appendChild(spaneta)
    diveta.appendChild(inputeta)

    let container = document.createElement("div")
    container.classList = ["container", "g-0"]
    container.appendChild(titlerow)
    container.appendChild(divbeta)
    container.appendChild(diveta)
    
    let entries = document.getElementById("entries")
    entries.appendChild(container)

    updateTitles()
    plot()
}

function updateTitles(){
    let entries = document.getElementById("entries")
    let i = 1
    for (div of entries.children){
        div.children[0].children[0].children[0].innerHTML = "Distribution " + i
        i++
    }
}

function plot(){
    let entries = document.getElementById("entries")
    var steps = 100
    var start = 0
    var stop = 10
    var step = (stop - start)/(steps-1)
    var t = []
    var data = []

    for (var i = 0; i < steps; i++){
        t.push(start + step*i)
    }

    for (entry of entries.children){
        let beta = parseFloat(entry.children[1].children[1].value)
        let eta = parseFloat(entry.children[2].children[1].value)
        let f = []
        for (var t_ of t){
            f.push(beta/eta*(t_/eta)**(beta-1)*Math.exp(-1*(t_/eta)**beta))
        }
        data.push({
            x: t,
            y: f,
            name: entry.children[0].children[0].children[0].innerHTML,
            type: "line"
        })
    }

    var layout = {
        hovermode: 'x unified',
        title: {
            text: 'Weibull Distribution'
        }
    }

    Plotly.newPlot('plot', data, layout);
}

plot()

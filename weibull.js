function renderBody(){
    const body = document.getElementById("body")

    const nav = document.createElement("nav")
    nav.className = "navbar sticky-top bg-body-tertiary"

    const navcontainer = document.createElement("div")
    navcontainer.className = "container"

    const navbrand = document.createElement("a")
    navbrand.className = "navbar-brand"
    navbrand.innerText = "Weibull Distribution"

    const plotdiv = document.createElement("div")
    plotdiv.className = "container"
    plotdiv.id = "plot"

    const entriesdiv = document.createElement("div")
    entriesdiv.className = "container p-3"

    const row = document.createElement("div")
    row.className = "row align-items-end g-3"
    row.id = "entries"

    const col = document.createElement("div")
    col.className = "col-3"

    const inputgroup = document.createElement("div")
    inputgroup.className = "input-group py-1"

    const inputgrouptext = document.createElement("span")
    inputgrouptext.className = "input-group-text"
    inputgrouptext.innerText = "MTTF"

    const input = document.createElement("input")
    input.className = "form-control"
    input.id = "mttf"
    input.type = "number"
    input.min = 0.1
    input.step = 0.1
    input.value = 1
    input.required = true
    input.onchange = function (){
        plot()
    }

    const buttondiv = document.createElement("div")
    buttondiv.className = "d-grid gap-1"

    const button = document.createElement("button")
    button.className = "btn btn-primary"
    button.type = "button"
    button.onclick = function (){
        makeDiv()
    }

    const buttonicon = document.createElement("i")
    buttonicon.className = "bi bi-plus-lg"

    body.append(nav, plotdiv, entriesdiv)
    nav.append(navcontainer)
    navcontainer.append(navbrand)
    entriesdiv.append(row)
    row.append(col)
    col.append(inputgroup, buttondiv)
    inputgroup.append(inputgrouptext, input)
    buttondiv.append(button)
    button.append(buttonicon)
}


function makeDiv(){
    const
        entries = document.getElementById("entries"),
        col = document.createElement("div"),
        row1 = document.createElement("div"),
        col1 = document.createElement("div"),
        title = document.createElement("h6"),
        col2 = document.createElement("div"),
        remove = document.createElement("button"),
        divbeta = document.createElement("div"),
        spanbeta = document.createElement("span"),
        inputbeta = document.createElement("input"),
        diveta = document.createElement("div"),
        spaneta = document.createElement("span"),
        inputeta = document.createElement("input")

    col.className = "col-3"
    row1.className = "row"
    col1.className = "col"
    col2.className = "col-auto"
    remove.className = "btn-close"
    remove.onclick = function (){
        const toremove = this.parentNode.parentNode.parentNode
        toremove.parentNode.removeChild(toremove)
        plot()
    }
    divbeta.classList = "input-group py-1"
    spanbeta.className = "input-group-text"
    spanbeta.innerHTML = "&beta;"
    inputbeta.className = "form-control"
    inputbeta.type = "number"
    inputbeta.required = true
    inputbeta.min = 0.1
    inputbeta.step = 0.1
    inputbeta.value = 1
    inputbeta.onchange = function (){
        plot()
    }
    diveta.className = "input-group"
    spaneta.className = "input-group-text"
    spaneta.innerHTML = "&eta;"
    inputeta.className = "form-control"
    inputeta.type = "number"
    inputeta.disabled = true
    inputeta.readOnly = true

    entries.append(col)
    col.append(row1, divbeta, diveta)
    row1.append(col1, col2)
    col1.append(title)
    col2.append(remove)
    divbeta.append(spanbeta, inputbeta)
    diveta.append(spaneta, inputeta)

    plot()
}


function plot(){
    const
        mttf = parseFloat(document.getElementById("mttf").value),
        steps = 100,
        start = 0,
        stop = mttf*3,
        step = (stop - start)/(steps-1),
        entries = document.getElementById("entries").children,
        t = [],
        data = []

    for (let i = 0; i < steps; i++){
        t.push(start + step*i)
    }

    for (let i = 1, max=entries.length; i < max; i++){
        const
            beta = parseFloat(entries[i].children[1].children[1].value),
            eta = mttf/math.gamma(1/beta+1),
            customdata = [],
            f = []
        entries[i].children[0].children[0].children[0].innerHTML = "PDF " + i
        entries[i].children[2].children[1].value = eta
        for (const t_ of t){
            const r = Math.exp(-1*(t_/eta)**beta)
            f.push(beta/eta*(t_/eta)**(beta-1)*r)
            customdata.push([r, 1-r])
        }
        data.push({
            x: t,
            y: f,
            customdata: customdata,
            hovertemplate: "%{y:.2} | <span style='color: #00D000'>R: %{customdata[0]:.2%}</span> | <span style='color: #D00000'>F: %{customdata[1]:.2%}</span>",
            name: entries[i].children[0].children[0].children[0].innerHTML,
            type: "line"
        })
    }

    const layout = {
        hovermode: 'x unified',
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

renderBody()
makeDiv()
plot()

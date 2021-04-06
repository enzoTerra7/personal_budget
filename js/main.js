class Expense {
    constructor(year, mounth, day, type, description, value){
        this.year = year
        this.mounth = mounth
        this.day = day
        this.type = type
        this.description = description
        this.value = value
    }
}

const values = {
    year: document.querySelector('#ano'),
    mounth: document.querySelector('#mes'),
    day: document.querySelector('#dia'),
    type: document.querySelector('#tipo'),
    description: document.querySelector('#descricao'),
    value: document.querySelector('#valor'),
    containerExpense: document.querySelector('#containerExpense')
}

const register = {

    save(exp){

        if(localStorage.getItem('id') === null || localStorage.length <= 1){
            var valueId = 0
            localStorage.setItem('id', valueId)
        } else {
            valueId = parseInt(localStorage.getItem('id')) + 1
            localStorage.setItem('id', valueId)
        }

        localStorage.setItem(valueId, JSON.stringify(exp))

        register.index = parseInt(localStorage.getItem('id')) + 1
    },

    expense(){

        const { year, mounth, day, type, description, value } = values


        let expense = new Expense(
            year.value,
            mounth.value, 
            day.value,
            type.value,
            description.value,
            value.value
        )

        if(year.value === '' ||
        mounth.value  === '' ||
        day.value  === '' ||
        type.value  === '' ||
        description.value === '' ||
        value.value  === null ||
        value.value === 0 ||
        value.value === undefined){
            let colorTxt = 'red'
            document.querySelector('#containerMsg').innerHTML = `<span style="width: 300px; color: ${colorTxt};" id="alertContainer">
                Por favor preencha todos os campos
            </span>`
            setTimeout( () =>{
                document.querySelector('#containerMsg').firstChild.remove()
            },2000)
        } else {
            let colorTxt = 'green'
            document.querySelector('#containerMsg').innerHTML = `<span style="width: 300px; color: ${colorTxt};" id="alertContainer">
                Parabéns, divida adicionada com sucesso!
            </span>`
            setTimeout( () =>{
                document.querySelector('#containerMsg').firstChild.remove()
            },2000)

            register.save(expense, value.value, type.value)

            description.value = null
            value.value = null
            day.value = null
        }
    }

}

const init = {

    loadExpenses(lsA){

        let localStorageId = localStorage.getItem('id')

        for (let i = 0; i <= localStorageId; i++) {
            if(localStorage.getItem(`${i}`) == null){
                continue
            }
            else{
                let expense = JSON.parse(localStorage.getItem(`${i}`))

                lsA.push(expense)

            }
        }   

    },

    removeExpense(index){
        
        localStorage.removeItem(`${index}`)
        document.querySelector(`#removeTr${index}`).parentElement.remove()

    },

    initAplication(){

        let localStorageArray = []

        init.loadExpenses(localStorageArray)

        let DOMExpense = document.querySelector('#containerExpense')

        localStorageArray.forEach((exp, index) =>{

            if(exp === null){
                console.log('this array object is null')
            } else{
                DOMExpense.insertRow().innerHTML = `
                <td> ${exp.day}/${exp.mounth}/${exp.year} </td>
                <td> ${exp.type} </td>
                <td> ${exp.description} </td>
                <td> ${exp.value} </td>
                <td id="removeTr${index}"> <span onclick="init.removeExpense(${index})"> <i class="fas fa-trash"></i> </span> </td>
                `
            }

        })

    }

}

const searchFilter = {

    estructuring(e){

        let arrayForFilter = []

        let startSearch = init.loadExpenses(arrayForFilter)

        let filteredArray = arrayForFilter

        if(e.value.length > 0){
            filteredArray = filteredArray.filter( a => parseInt(a.value) >= parseInt(e.value))
        }
        if(e.type.length > 0){
            filteredArray = filteredArray.filter( a => a.type == e.type)
        }
        if(e.year.length > 0){
            filteredArray = filteredArray.filter( a => a.year == e.year)
        }
        if(e.day.length > 0){
            filteredArray = filteredArray.filter( a => a.day == e.day)
        }
        if(e.mounth.length > 0){
            filteredArray = filteredArray.filter( a => a.mounth == e.mounth)
        }
        if(e.description.length > 0){
            filteredArray = filteredArray.filter( a => a.description == e.description )
        }

        let documentDom = document.querySelector('#containerExpense')

        if( e.description.length <= 0 &&
            e.year.length <= 0 &&
            e.day.length <= 0 &&
            e.mounth.length <= 0 &&
            e.value.length <= 0 &&
            e.type.length <= 0){
                documentDom.innerHTML = ''
                init.initAplication()
        } else{
            documentDom.innerHTML = ''

            filteredArray.forEach((exp, index) =>{

            if(exp === null){
                console.log('this array object is null')
            } else{
                documentDom.insertRow().innerHTML = `
                <tr>
                <td> ${exp.day}/${exp.mounth}/${exp.year} </td>
                <td> ${exp.type} </td>
                <td> ${exp.description} </td>
                <td> ${exp.value} </td>
                <td id="removeTr${index}"> <span onclick="init.removeExpense(${index})"> <i class="fas fa-trash"></i> </span> </td>
                </tr>
                `
                }

            })
        }

    },

    search(){

        let year = document.querySelector('#ano').value
        let mounth = document.querySelector('#mes').value
        let day = document.querySelector('#dia').value
        let description = document.querySelector('#descricao').value
        let type = document.querySelector('#tipo').value
        let valueIn = document.querySelector('#valor').value

        let expense = new Expense(year, mounth, day, type, description, valueIn)

        searchFilter.estructuring(expense)

    }

}
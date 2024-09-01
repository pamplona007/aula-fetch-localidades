function pegarMacrorregioes() {
    macrorregiao.innerHTML = "<option disabled selected>Selecionar macrorregião</option>"

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/regioes')
        .then((response) => response.json())
        .then((response) => {
            for (let index = 0; index < response.length; index++) {
                const regiao = response[index];

                macrorregiao.innerHTML += `<option value="${regiao.id}">${regiao.nome}</option>`
            }
        })
}

function pegarEstados(regiao) {
    estado.innerHTML = "<option disabled selected>Selecionar estado</option>"

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiao}/estados`)
        .then((response) => response.json())
        .then((response) => {
            for (let index = 0; index < response.length; index++) {
                const uf = response[index];

                estado.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`
            }
        })
}

function pegarCidades(estado) {
    cidade.innerHTML = "<option disabled selected>Selecionar cidade</option>"

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        .then((response) => response.json())
        .then((response) => {
            for (let index = 0; index < response.length; index++) {
                const municipio = response[index];

                cidade.innerHTML += `<option value="${municipio.id}">${municipio.nome}</option>`
            }
        })
}

pegarMacrorregioes()

macrorregiao.onchange = (event) => {
    pegarEstados(event.target.value)
}

estado.onchange = (event) => {
    pegarCidades(event.target.value)
}
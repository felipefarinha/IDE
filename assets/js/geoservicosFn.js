import { iconDownload, iconFileDowload, iconNoFileDowload, iconPreview, iconNotView, iconLink, iconNoLink } from "./icons.js"
import { listaSvg } from "./listaSvg.js"
import { dadosBruto } from '../../script.js';

const arr_ideOrgaos = []
const arr_ideTematica = []
let returnObj = {}

export function geoservicosIDE(dadosBruto) {

    //const dadosBruto = Object.entries(fileJson) //convert to array

    let arrFileJson = []

    dadosBruto.map((item, index) => {
        // console.log(item)
        arrFileJson.push({
            id: index,
            acesso: item[1].ide_acesso,
            camada: item[1].ide_camada,
            download: item[1].ide_download,
            geoservico: item[1].ide_geoservico,
            metadado: item[1].ide_metadado,
            orgao: item[1].ide_orgao,
            tematica: item[1].ide_tematica,
            visualizacao: item[1].ide_visualizacao
        })

        return arrFileJson
    })

    arrFileJson.map(item => arr_ideTematica.push(item.tematica))
    arrFileJson.map(item => arr_ideOrgaos.push(item.orgao))

    const uniqueTematica = [...new Set(arr_ideTematica)]
    const uniqueOrgaos = [...new Set(arr_ideOrgaos)]

    returnObj = {
        uniqueTematica: uniqueTematica,
        uniqueOrgaos: uniqueOrgaos,
        arrFileJson: arrFileJson
    }

    let key = "tematica"

    // console.log(findOcc(arrFileJson, key))

    function findOcc(arr, key){

        let arr2 = [];
            
        arr.forEach((item)=>{
            // Verificando se existe algum objeto em arr2
            // que contém o valor da chave
            const verify = arr2.some((val) => val[key] == item[key] )

            if (verify) {
                // If yes! then increase the occurrence by 1
                arr2.forEach((k)=>{
                    if(k[key] === item[key]){ 
                        k["count"]++
                    }
                })
            } else {
                // Se não! Em seguida, crie um novo objeto inicialize
                //-lo com o valor da chave de iteração atual e
                // define a ocorrência para 1
                let a = {}
                a[key] = item[key]
                a["count"] = 1
                arr2.push(a);
            }
        })
            
        return arr2
    }
    
    renderContents(uniqueTematica, findOcc(arrFileJson, key))

    return returnObj
}

function renderContents(tematica, arr2) {
    // console.log(tematica, arr2)
    
    tematica.forEach((item, index) => {
        
        const printText = arr2[index].count > 1 ? 'itens' : 'item';
        // console.log(index);

        const resultListaSvg = listaSvg.filter(ele => {
            if (ele.id.toLocaleLowerCase() == item.toLocaleLowerCase() ) {
                // console.log(ele.svg)
                return ele.svg
            }
        })

        const boxTematica = document.createElement('div')
        boxTematica.classList.add(`c_tematica`)

        boxTematica.innerHTML = `
                                <div class="headerTematica">
                                    <h3>${item}</h3>

                                    <p>${arr2[index].count} ${printText}</p>
                                </div>

                                <div class="c_tematicaSvg">
                                    ${ resultListaSvg[0]?.svg }
                                </div>
                                `

        document.querySelector("#build2").appendChild(boxTematica)
        boxTematica.addEventListener('click', modalFn )
    })
}

const linkConcat = 'https://www.metadados.seduh.df.gov.br/geonetwork/srv/por/catalog.search#/search?any=';
const linkConcat_download_part1 = 'https://www.metadados.seduh.df.gov.br/geonetwork/srv/api/records/';
const linkConcat_download_part2 = '/formatters/xsl-view?output=pdf&language=por&approved=true';
const linkConcatVisualizacao = '';

function modalFn(e) {
    // console.log(this)

    const divWrapModal = window.document.createElement('div')
    divWrapModal.setAttribute('class', 'divWrapModal')

    const fade = window.document.createElement('div')
    fade.setAttribute('class', 'fade')

    const divModal = document.createElement('div')
    divModal.setAttribute('class', 'divModal')

    const intoModal = document.createElement('div')
    intoModal.setAttribute('class', 'intoModal')

    e.path[9].appendChild(divWrapModal)
    divWrapModal.appendChild(fade)
    divWrapModal.appendChild(divModal)
    divModal.appendChild(intoModal)

    // const svgClose = document.createElement('div')
    // svgClose.setAttribute('class', 'svgClose')

    // divModal.append(svgClose)
    // intoModal.appendChild(svgClose)

    returnObj.arrFileJson.map((item, index) => {
        // console.log(index)

        const nameContent = this.querySelector("h3").textContent
    

        if(item.tematica == nameContent){
            // console.log(item)
    
            intoModal.innerHTML = `
                                    <h1>${nameContent}</h1> 
                                    <div class="svgClose">Fechar (Esc)</div>
                                    `

            const div = window.document.createElement('div')
            div.setAttribute('class', 'dadosDisponiveis')
            
            const verificaVisualizacao = item.visualizacao !== null
            ? `<a href="${linkConcatVisualizacao}${item.visualizacao}" target="_blank">${iconPreview} Visualização</a>`
            : `<c class="noView">${iconNotView} Visualização</c>`;

            const verificaMetadado = item.metadado !== null
                ? `<a href="${linkConcat}${item.metadado}" target="_blank">${iconLink} Metadado</a>`
                : `<c class="noView">${iconNoLink} Metadado</c>`;

            const verificaMetadadoPDF = item.metadadoPDF !== null
                ? `<a href="${linkConcat_download_part1}${item.metadadoPDF}${linkConcat_download_part2}" target="_blank">${iconDownload} Metadado PDF</a>`
                : `<c class="noView">${iconNoFileDowload} Metadado PDF</c>`;

            const verificaGeoservico = item.geoservico !== null
                ? `<a href="${item.geoservico}" target="_blank">${iconLink} Geoserviço</a>`
                : `<c class="noView">${iconNoLink} Geoserviço</c>`;

            const verificaDownload = item.download !== null
                ? `<a href="${item.download}" target="_blank">${iconFileDowload} Download</a>`
                : `<c class="noView">${iconNoFileDowload} Download</c>`;

            div.innerHTML = `
                            
                            <p>${item.orgao} - ${item.camada}</p>
                            <div>                                
                                ${verificaVisualizacao}
                                ${verificaMetadado}
                                ${verificaMetadadoPDF}
                                ${verificaGeoservico}
                                ${verificaDownload}
                            </div>
                            `

            divModal.appendChild(div)
        }
    })


    window.addEventListener('keydown', closeModalESC)

    function closeModalESC(){
        if (event.key === 'Escape') {
            // console.log(event.key, 'esc')
            divWrapModal.remove()
            window.removeEventListener('keydown', closeModalESC)
        }
    }
    
    divWrapModal.addEventListener('click', (e)=>{
        // console.log(e.target.className)
        // console.log(e.target.getAttribute("class"))

        const targetClassName = e.target.className

        const classList = ['fade', 'svgClose']
        
        const shoulCloseModal = classList.some(item => item == targetClassName || item == targetClassName.baseVal)

        if(shoulCloseModal) { divWrapModal.remove() }
    })
}


document.querySelector(".container .wrap_search .svgSearch").addEventListener('click', inputSearchFn)

document
    .querySelector(".container .wrap_search  input")
    .addEventListener('keyup', fn)

function fn(e) {
    // console.log(this.value)
    
    const searchBtnClear = document.querySelector(".container .wrap_search .searchBtnClear")

    searchBtnClear.addEventListener('click', (event) => { 
        const inputSearch = document.querySelector(".container .wrap_search  input")
        inputSearch.value = ''
        searchBtnClear.style.display = "none"
        inputSearchFn(event)
    })

    if (e.key == 'Enter') {
        // console.log(e)
        inputSearchFn(e)
    }

    if (this.value === '' ) {
        searchBtnClear.style.display = "none"
    }
    else {
        searchBtnClear.style.display = 'block'
    } 
}


function inputSearchFn (e) {
    // console.log(e)

    document.querySelector("#build2").innerHTML = ''

    const inputSearch = document.querySelector(".container .wrap_search  input")
    
    let inputSearchValue = inputSearch.value.toLowerCase()

    if (inputSearchValue !== '') {
        document.querySelector("#build").innerHTML = ''

        let filtrados = returnObj.arrFileJson.filter(item => (new RegExp(inputSearchValue)).test(item.camada.toLocaleLowerCase()));
    
        filtrados.map( (item, index) => {

            document.querySelector("#build2").innerHTML = ''

            const div = window.document.createElement('div')
                div.setAttribute('class', 'dadosDisponiveis')  

            const verificaVisualizacao = item.visualizacao !== null
            ? `<a href="${linkConcatVisualizacao}${item.visualizacao}" target="_blank">${iconPreview} Visualização</a>`
            : `<c class="noView">${iconNotView} Visualização</c>`;

            const verificaMetadado = item.metadado !== null
                ? `<a href="${linkConcat}${item.metadado}" target="_blank">${iconLink} Metadado</a>`
                : `<c class="noView">${iconNoLink} Metadado</c>`;

            const verificaMetadadoPDF = item.metadadoPDF !== null
                ? `<a href="${linkConcat_download_part1}${item.metadadoPDF}${linkConcat_download_part2}" target="_blank">${iconDownload} Metadado PDF</a>`
                : `<c class="noView">${iconNoFileDowload} Metadado PDF</c>`;

            const verificaGeoservico = item.geoservico !== null
                ? `<a href="${item.geoservico}" target="_blank">${iconLink} Geoserviço</a>`
                : `<c class="noView">${iconNoLink} Geoserviço</c>`;

            const verificaDownload = item.download !== null
                ? `<a href="${item.download}" target="_blank">${iconFileDowload} Download</a>`
                : `<c class="noView">${iconNoFileDowload} Download</c>`;


            div.innerHTML = `
                            <p>${item.orgao} - ${item.camada}</p>
                            <div>                                
                                ${verificaVisualizacao}
                                ${verificaMetadado}
                                ${verificaMetadadoPDF}
                                ${verificaGeoservico}
                                ${verificaDownload}
                            </div>
                            `

                    const idBuild = document.querySelector("#build")
                    idBuild.appendChild(div)
        })

    }
    else {
        geoservicosIDE(dadosBruto)

        document.querySelector("#build").innerHTML = ''
        }
}
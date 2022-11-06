import fileJson from './geoservicos_ide.json' assert {type: 'json'};
import { geoservicosIDE } from './assets/js/geoservicosFn.js' ;
import { verificaDispositivo, isMobileDevice } from './assets/js/verificaDispositivo.js' ;


//==============================================================================
// const arr_ideOrgaos = []
// const arr_ideTematica = []
// const mount = []
// const ArrConstructor = [];

// function isolate() {

//     const dadosBruto = Object.entries(fileJson) //convert to array

//     let arrFileJson = []

//     dadosBruto.map((item, index) => {
//         // console.log(item)
//         arrFileJson.push({
//             id: index,
//             acesso: item[1].ide_acesso,
//             camada: item[1].ide_camada,
//             download: item[1].ide_download,
//             geoservico: item[1].ide_geoservico,
//             metadado: item[1].ide_metadado,
//             orgao: item[1].ide_orgao,
//             tematica: item[1].ide_tematica,
//             visualizacao: item[1].ide_visualizacao
//         })

//         return arrFileJson
//     })

//     arrFileJson.map(item => arr_ideOrgaos.push(item.orgao))
//     arrFileJson.map(item => arr_ideTematica.push(item.tematica))

//     console.log(arr_ideTematica)

//     const uniqueOrgaos = [...new Set(arr_ideOrgaos)]

//     const arrFilterOrgaos = uniqueOrgaos.map((item) => {
//         let newArrFiltroOrgaos = [];

//         arrFileJson.forEach((ele) => {
//             if (ele.orgao === item) {
//                 newArrFiltroOrgaos.push(ele);
//             }
//         })

//         return newArrFiltroOrgaos;
//     })

//     uniqueOrgaos.map((item, index) => {
//         mount[item] = [];

//         arrFilterOrgaos[index].filter((ele, i) => {
//             if (item == item) {
//                 mount[item].push(ele);
//             }

//             function namesOrder(arrayObj) {
//                 return arrayObj.sort(function (objA, objB) {
//                     let a = objA.tematica
//                     let b = objB.tematica
//                     return a < b ? -1 : a > b ? 1 : 0;
//                 })
//             }
//             namesOrder(mount[item])
//         })
//     });


//     const linkConcat = 'https://www.metadados.seduh.df.gov.br/geonetwork/srv/por/catalog.search#/search?any=';
//     const linkConcat_download_part1 = 'https://www.metadados.seduh.df.gov.br/geonetwork/srv/api/records/';
//     const linkConcat_download_part2 = '/formatters/xsl-view?output=pdf&language=por&approved=true';
//     const linkConcatVisualizacao = '';

//     uniqueOrgaos.forEach(item => {
//         const verificaOrgao = `<summary>${item}</summary>`

//         // console.log('================================ CRIANDO: ', item)

//         ArrConstructor.push(`<details>`)
//         ArrConstructor.push(verificaOrgao)

//         let confere = mount[item][0].tematica

//         Object.values(mount[item].map((ele, i) => {

//             const verificaVisualizacao = ele.visualizacao !== null
//                 ? `<a href="${linkConcatVisualizacao}${ele.visualizacao} target="_blank">${iconPreview} Visualização</a>`
//                 : `<c class="noView">${iconNotView} Visualização</c>`;

//             const verificaMetadado = ele.metadado !== null
//                 ? `<a href="${linkConcat}${ele.metadado}" target="_blank">${iconLink} Metadado</a>`
//                 : `<c class="noView">${iconNoLink} Metadado</c>`;

//             const verificaMetadadoPDF = ele.metadadoPDF !== null
//                 ? `<a href="${linkConcat_download_part1}${ele.metadadoPDF}${linkConcat_download_part2}" target="_blank">${iconDownload} Metadado PDF</a>`
//                 : `<c class="noView">${iconNoFileDowload} Metadado PDF</c>`;

//             const verificaGeoservico = ele.geoservico !== null
//                 ? `<a href="${ele.geoservico}" target="_blank">${iconLink} Geoserviço</a>`
//                 : `<c class="noView">${iconNoLink} Geoserviço</c>`;

//             const verificaDownload = ele.download !== null
//                 ? `<a href="${ele.download}" target="_blank">${iconFileDowload} Download</a>`
//                 : `<c class="noView">${iconNoFileDowload} Download</c>`;

//             let verificaTematica = `<summary>${ele.tematica}</summary>`
//             let verificaCamada = `<p>${ele.camada}</p>`



//             const verify = ArrConstructor.includes(verificaTematica) ? true : false

//             // console.log(ele.tematica !== confere, !verify, '====', ele.tematica !== confere && !verify)


//             if (!verify && ele.tematica !== confere) {
//                 // console.log('fechando tematica', confere)
//                 ArrConstructor.push('</details>')
//             }

//             if (item == ele.orgao) {
//                 // if (item == '- MODELO') {
//                 // console.log(verificaTematica, verifyy, 'no array')

//                 if (verify) {
//                     if (ele.acesso == 'PUBLICO') {
//                         // console.log('add itens')
//                         ArrConstructor.push('<div class="dadosDisponiveis">')
//                         ArrConstructor.push(verificaCamada)
//                         ArrConstructor.push('<div>')
//                         ArrConstructor.push(verificaVisualizacao)
//                         ArrConstructor.push(verificaMetadado)
//                         ArrConstructor.push(verificaMetadadoPDF)
//                         ArrConstructor.push(verificaGeoservico)
//                         ArrConstructor.push(verificaDownload)
//                         ArrConstructor.push('</div>')
//                         ArrConstructor.push('</div> <!-- end div dadosDisponiveis -->')
//                     }
//                     else {
//                         console.log(ele)

//                         ArrConstructor.push('<div class="dadosDisponiveis">')
//                         ArrConstructor.push(verificaCamada)
//                         ArrConstructor.push('<div>')
//                         ArrConstructor.push(verificaMetadado)
//                         ArrConstructor.push('</div>')
//                         ArrConstructor.push('</div> <!-- end div dadosDisponiveis -->')
//                     }
//                 }

//                 else {
//                     // console.log('======= CRIANDO TEMÁTICA', ele.tematica)

//                     ArrConstructor.push('<details>')
//                     ArrConstructor.push(verificaTematica)
//                     ArrConstructor.push('<div class="dadosDisponiveis">')

//                     console.log('add itens')

//                     ArrConstructor.push(verificaCamada)
//                     ArrConstructor.push('<div>')
//                     ArrConstructor.push(verificaVisualizacao)
//                     ArrConstructor.push(verificaMetadado)
//                     ArrConstructor.push(verificaMetadadoPDF)
//                     ArrConstructor.push(verificaGeoservico)
//                     ArrConstructor.push(verificaDownload)
//                     ArrConstructor.push('</div>')
//                     ArrConstructor.push('</div> <!-- end div dadosDisponiveis -->')
//                 }
//             }

//             confere = ele.tematica
//             // console.log('Tematica att para:', confere)
//         }))

//         // console.log('================================ FECHANDO: ', item)
//         ArrConstructor.push('</details>')
//         ArrConstructor.push('</details>')
//     })

//     // console.log(ArrConstructor)

//     // return mount
//     return ArrConstructor
// }

// document.querySelector("#build2").innerHTML = isolate().join('')

//==============================================================================
export const dadosBruto = Object.entries(fileJson) //convert to array

geoservicosIDE(dadosBruto)

//==============================================================================
// atualiza nomes

const listaNomes = [
    {
        titular: 'Wisney Rafael Alves de Oliveira, matrícula n° 279.261-3',
        suplente: 'Luís Fernando Rodrigues de Abreu, matrícula nº 265.125-4',
        identificador: 'Secretaria de Estado de Economia do Distrito Federal - SEEC',
        class: 'SEEC'
    },
    {
        titular: 'Tânia Maria Vieira da Silva',
        suplente: 'Ayla Narjara de Carvalho Vieira',
        identificador: 'Secretaria Executiva da IDE/DF',
        class: 'secExIDE'
    },
]

function setName(lista) {
    lista.forEach((item, i) => {
        // console.log(item.class)
        document.querySelectorAll(`.${item.class}`).forEach(ele => {
            // console.log(ele, i)
            ele.innerHTML = ` Titular: ${lista[i].titular} <br> Suplente: ${lista[i].suplente} <br>`;
        })
    })
}
setName(listaNomes)
//==============================================================================
// navbar-menu backgorund color and footer position

const navbar_lista = document.querySelectorAll('.navbar_lista')
// console.log(navbar_lista)

navbar_lista.forEach(item => {
    item.addEventListener('click', () => {
        navbar_lista.forEach(item => item.classList.remove("active"))
        item.classList.add("active")
        footerPosition()
    })
})
//==============================================================================
// summary click position footer
document
    .querySelectorAll('summary')
    .forEach(item => item.addEventListener('click', () => {
        footerPosition()
    }))
//==============================================================================
// function navbar-menu Abas

const section_list = document.querySelectorAll('.section')

section_list[0].style.display = "block" //frist item active

navbar_lista.forEach(function (item, i) {
    item.addEventListener('click', () => {
        section_list.forEach(item => item.style.display = "none") //none para todos
        section_list[i].style.display = "block" //block para o atual clicado
    })
})
//==============================================================================
//leva até a aba Adesão

document.querySelector("#click")
    .addEventListener("click", () => {
        document.querySelector("body > div.container > div > div.container-right > div > ul > li:nth-child(6) > a").click()
    })

//==============================================================================
//alinha o footer no bottom

function footerPosition() {
    verificaDispositivo()
    let footer = document.getElementsByTagName('footer')[0]
    footer.removeAttribute('style')

    setTimeout(() => {
        let footerPositionTop = document.getElementsByTagName('footer')[0].getBoundingClientRect().top

        const medidaContainer = 650

        if (!isMobileDevice && (footerPositionTop <= medidaContainer)) {
            let tamanhoTela = window.innerHeight
            let heightFooter = footer.clientHeight
            let footerPosition = (tamanhoTela - heightFooter)

            footer.style.position = 'absolute';
            footer.style.top = `${footerPosition}px`
        }
    }, 50)
}
//==============================================================================
// imagens da aba inicial

const listaLateral = document.querySelectorAll(".lista-lateral ")

listaLateral.forEach(item => {
    const sectionLeftImg = document.querySelector(`.wrap-section-left-img`)

    item.addEventListener('mouseover', () => {
        // console.log(item.innerText)

        if (item.innerText == 'GEOPORTAL IDE/DF') {
            sectionLeftImg.src = "./assets/imagens/bg-geoportal.png"
        }
        else if (item.innerText == 'CATÁLAGOS DE METADADOS IDE/DF') {
            sectionLeftImg.src = "./assets/imagens/metadados.png"
        }
        else if (item.innerText == 'INDE') {
            sectionLeftImg.src = "./assets/imagens/inde.png"
        }
        else if (item.innerText == 'GEOSERVIÇOS') {
            sectionLeftImg.src = "./assets/imagens/Geoserviços.png"
        }
        else if (item.innerText == 'Brasília Ambiental') {
            sectionLeftImg.src = "./assets/imagens/IBRAM.png"
        }
        else if (item.innerText == 'CAESB') {
            sectionLeftImg.src = "./assets/imagens/CAESB.png"
        }
        else if (item.innerText == 'SISDIA') {
            sectionLeftImg.src = "./assets/imagens/SISDIA.png"
        }
    })
    item.addEventListener('mouseout', () => {
        sectionLeftImg.src = "./assets/imagens/bg-geoportal.png"
    })
})


//==============================================================================
//atribiu no bottom de download o texto de link do (summary a)
//NÃO ESTÁ USANDO NADA

// let arrTexts = []
// let arrLinks = []

// const listaSumarioLinkText = document.querySelectorAll('.lista-sumario a')

// for (let i = 0; i < listaSumarioLinkText.length; i++) {
//     arrTexts.push(listaSumarioLinkText[i].text)
//     arrLinks.push(listaSumarioLinkText[i].href)
// }

// const wrapaBtn = document.querySelectorAll('.wrap-aBtn a')

// wrapaBtn.forEach((item, i) => {
//     item.innerHTML = `
//                         <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z"/></g></svg>
//                         `

//     // item.addEventListener('mouseover', () => {
//     item.setAttribute('href', `${arrLinks[i]}`)
//     item.setAttribute('target', '_blanck')
//     item.setAttribute('download', `${arrTexts[i]}.pdf`)
//     item.style.cssText = `
//                         width: auto;
//                         background-color: var(--bg-section);
//                         filter: brightness(1.2);
//                         color: white;
//                         fill: white;
//                         cursor: pointer;
//                         `

//     item.innerHTML = `
//                         <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><g><rect fill="none" height="24" width="24"/></g><g><path d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z"/></g></svg>
//                         ${arrTexts[i]}
//                         `

//     //     item.addEventListener('mouseout', () => {
//     //         item.removeAttribute('style')
//     //         item.innerHTML = `
//     //                         <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z"/></g></svg>
//     //                         `
//     //     })
//     // })
// })

// setInterval(() => { buildDadosDisponiveis() }, 1000 * 60 * 60 * 24 / 2) //a cada 12h

//==============================================================================
// form validation
//NÃO ESTÁ USANDO NADA

// const form = document.getElementById('form');
// const mensagem = document.querySelector('.mensagem');

// let { name, email, instt, fsub } = form;

// let db_formulario = [];

// form.addEventListener('keyup', (e) => { mensagem.textContent = " " });
// name.addEventListener('keyup', (e) => { let valorInput = e.target.value; name.value = valorInput.replace(/[0-9]/g, '') });

// document.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const validarRegExNoEmail = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//     if (email.value.match(validarRegExNoEmail)) {
//         email.style.cssText = 'border: 2px solid green;'
//         name.style.cssText = 'border: 2px solid green;'
//         instt.style.cssText = 'border: 2px solid green;'

//         db_formulario.push({ name: name.value.trim(), email: email.value, instt: instt.value })
//         mensagem.textContent = "Enviado com sucesso"
//     }
//     else {
//         email.style.cssText = 'border: 2px solid red;'
//         console.log('erro formulário')
//     }
//     // console.log(db_formulario)
//     // fsub.style.cursor = 'not-allowed'
// })

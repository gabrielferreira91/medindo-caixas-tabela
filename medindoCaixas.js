const transpasseNormal = 10
const transpasse30 = 60
const abaEnvoltorio = 80
const abaMaleta = 70
const abaEnvoltorio01Tampa = 60
const somaAltura = 5

let tipoDeCaixa = document.getElementById('tiposDeCaixa')

let inputLengthBox = document.getElementById('lengthBox')
let inputWidthBox = document.getElementById('widthBox')
let inputHeightBox = document.getElementById('heightBox')

let totalLength = document.getElementById('totalLength')
let totalWidth = document.getElementById('totalWidth')

let inputGramatura = document.getElementById('gramatura')
let inputValorKg = document.getElementById('valorKg')

const totalValue = document.getElementById('resultValue')
const totalRs = document.getElementById('resultR')

let inputBoxName = document.getElementById('boxName')

const buttonValue = document.getElementById('calcValor')
const buttonAddTable = document.getElementById('addTable')

// Iniciando a Tabela
const tableField = document.getElementById('tableBoxes')
const tableContainer = document.getElementById('containerTable')

let newRow = document.createElement('tr')
let newEl = document.createElement('td')
var elementid = document.getElementsByTagName('td').length

function handleCreateTable() {
  getValues()
  if (isInvalidValue || isInvalidFunction(resultBox[0])) {
    console.log("Valor inválido")
    return
  }
  tableContainer.style.display = "grid"
  setTableValues()
}

function tipoDePapelao(gram){
  if (gram < 2){
    gram = gram * 1000
  }

  let tipoPapelao = ''
    let gramaturaPapelao = {
    a: 'ONDA C',
    b: 'ONDA C-2',
    c: 'ONDA C Exportação',
    d: 'TRIPLEX',
    e: 'TRIPLEX-Exportação',
    f: 'Acoplado',
    g: 'Gr. Inexistente'
  }

  if (gram >= 300 & gram <= 400){
    tipoPapelao = gramaturaPapelao.a
  } else if (gram > 400 & gram < 480){
    tipoPapelao = gramaturaPapelao.b      
  } else if (gram >= 480 & gram < 560){
    tipoPapelao = gramaturaPapelao.c      
  } else if (gram >= 560 & gram < 720){
    tipoPapelao = gramaturaPapelao.d      
  } else if (gram >= 720 & gram < 1200){
    tipoPapelao = gramaturaPapelao.e      
  } else if (gram >= 1200 & gram < 1500){
    tipoPapelao = gramaturaPapelao.f
  } else {
    tipoPapelao = gramaturaPapelao.g
  }

  return tipoPapelao
}


function setTableValues() {
  let nameMedidas = 0
  
  if (isTabuleiro) {
    nameMedidas = inputLengthBox.value + ' X ' + inputWidthBox.value
  } else {
    nameMedidas =
    inputLengthBox.value +
    ' X ' +
    inputWidthBox.value +
    ' X ' +
    inputHeightBox.value
  }
  
  let nameBox = inputBoxName.value
  let nameGramatura = tipoDePapelao(inputGramatura.value)
  let nameValor = 'R$ ' + totalValue.textContent
  let modeloCaixa = resultBox[2]
  
  let newRow = tableField.insertRow(-1)
  let cellName = newRow.insertCell(0)
  let cellMedidas = newRow.insertCell(1)
  let cellModeloCaixa = newRow.insertCell(2)
  let cellGramatura = newRow.insertCell(3)
  let cellValor = newRow.insertCell(4)
  
  let textName = document.createTextNode(nameBox)
  let textMedidas = document.createTextNode(nameMedidas)
  let textModeloCaixas = document.createTextNode(modeloCaixa)
  let textGramatura = document.createTextNode(nameGramatura)
  let textValor = document.createTextNode(nameValor)
  

  cellName.appendChild(textName)
  cellMedidas.appendChild(textMedidas)
  cellModeloCaixa.appendChild(textModeloCaixas)
  cellGramatura.appendChild(textGramatura)
  cellValor.appendChild(textValor)

}

// Fim da parte da tabela

tipoDeCaixa.addEventListener('change', disableHeightWhenIsTabuleiro)

let resultBox = []
let isInvalid = false
let isInvalidValue = false
let isTabuleiro = false

function isHeightValid(heightBox) {
  if (isTabuleiro) {
    return false
  } else {
    return isInvalidFunction(heightBox)
  }
}

function typeOfBox(boxes) {
  let lengthBox = parseInt(inputLengthBox.value)
  let widthBox = parseInt(inputWidthBox.value)
  let heightBox = parseInt(inputHeightBox.value)

  if (
    isInvalidFunction(lengthBox) ||
    isInvalidFunction(widthBox) ||
    isHeightValid(heightBox)
  ) {
    isInvalid = true
    addClass(buttonValue)
    addClass(buttonAddTable)
  } else {
    isInvalid = false
    removeClass(buttonValue)
    removeClass(buttonAddTable)

    switch (boxes) {
      case 'maleta':
        calcMaleta(lengthBox, widthBox, heightBox)
        break

      case 'maletaTTotal':
        calcMaletaTTotal(lengthBox, widthBox, heightBox)
        break

      case 'maletaT030':
        calcMaletaT30(lengthBox, widthBox, heightBox)
        break

      case 'maletaTInferior':
        calcMaletaTInferior(lengthBox, widthBox, heightBox)
        break

      case 'env1tampa':
        calcEnv01Tampa(lengthBox, widthBox, heightBox)
        break

      case 'envNormal':
        calcEnvNormal(lengthBox, widthBox, heightBox)
        break

      case 'envT030':
        calcEnvTransp30(lengthBox, widthBox, heightBox)
        break

      case 'tabuleiro':
        calcTabuleiro(lengthBox, widthBox)
        break
    }
  }
}
//Calculando medidas de caixas

function calcMaleta(length, width, height) {
  const riscador =
    (width + transpasseNormal) / 2 +
    (height + somaAltura) +
    (width + transpasseNormal) / 2
  const impressora = length + width + length + width + abaMaleta
  let nameOfBoxType = 'Maleta'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function calcMaletaTTotal(length, width, height) {
  const riscador = width + (height + somaAltura) + width
  const impressora = length + width + length + width + abaMaleta
  let nameOfBoxType = 'Maleta T. Total'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function calcMaletaT30(length, width, height) {
  const riscador =
    (width + transpasse30) / 2 +
    (height + somaAltura) +
    (width + transpasse30) / 2
  const impressora = length + width + length + width + abaMaleta
  let nameOfBoxType = 'Maleta T. 30mm'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function calcMaletaTInferior(length, width, height) {
  const riscador =
    (width + transpasseNormal) / 2 + (height + somaAltura) + width
  const impressora = length + width + length + width + abaMaleta
  let nameOfBoxType = 'Maleta T. Inferior'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function calcEnvNormal(length, width, height) {
  const riscador =
    (width + transpasseNormal) / 2 +
    (height + somaAltura) +
    (width + somaAltura) +
    (height + somaAltura) +
    (width + transpasseNormal) / 2
  const impressora = abaEnvoltorio + height + length + height + abaEnvoltorio
  let nameOfBoxType = 'Env. Normal'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function calcEnv01Tampa(length, width, height) {
  const riscador =
    width +
    somaAltura +
    (height + somaAltura) +
    (width + somaAltura) +
    (height + somaAltura) +
    abaEnvoltorio01Tampa
  const impressora = abaEnvoltorio + height + length + height + abaEnvoltorio
  let nameOfBoxType = 'Env. 1 tampa'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function calcEnvTransp30(length, width, height) {
  const riscador =
    (width + transpasse30) / 2 +
    (height + somaAltura) +
    (width + somaAltura) +
    (height + somaAltura) +
    (width + transpasse30) / 2
  const impressora = abaEnvoltorio + height + length + height + abaEnvoltorio
  let nameOfBoxType = 'Env. Transp. 30mm'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function calcTabuleiro(length, width) {
  const riscador = length
  const impressora = width
  let nameOfBoxType = 'Tabuleiro'

  resultBox = [riscador, impressora, nameOfBoxType]
  return resultBox
}

function isInvalidFunction(valor) {
  if (valor <= 0 || isNaN(valor)) {
    return true
  } else {
    return false
  }
}

function finalValue(comp, larg, gramatura, valor) {
  let area = (comp * larg) / 1000
  let result = (gramatura * area * valor) / 1000

  return result
}

function gramatura(gram) {
  gram > 2 ? (gram = gram / 1000) : gram
  return gram
}

function setTimes(resultLength, resultWidth) {
  totalLength.textContent = resultLength
  totalWidth.textContent = resultWidth
}

function setValue(resultValue) {
  totalRs.textContent = 'R$ '
  totalValue.textContent = resultValue.toFixed(2)
}

function msgError() {
  totalLength.textContent = 'VALOR '
  totalWidth.textContent = 'INVÁLIDO'
}

function msgErrorValue() {
  totalRs.textContent = ''
  totalValue.textContent = 'VALOR INVÁLIDO'
}

function removeClass(nameValue) {
  nameValue.disabled = false
  nameValue.classList.remove('disabled')
}

function addClass(nameValue) {
  nameValue.disabled = true
  nameValue.classList.add('disabled')
}

// FUNCTION OF BUTTON

function getMeasure() {
  tipoDeCaixa = document.getElementById('tiposDeCaixa').value

  typeOfBox(tipoDeCaixa)
  isInvalid ? msgError() : setTimes(resultBox[0], resultBox[1])

}

function getValues() {
  getMeasure()
  let gramaturaCaixa = gramatura(parseFloat(inputGramatura.value))
  let valorKg = parseFloat(inputValorKg.value)

  const valorFinal = finalValue(
    resultBox[0],
    resultBox[1],
    gramaturaCaixa,
    valorKg
  )

  if (isInvalidFunction(gramaturaCaixa) || isInvalidFunction(valorKg)) {
    isInvalidValue = true
  } else {
    isInvalidValue = false
  }

  isInvalidValue ? msgErrorValue() : setValue(valorFinal)
}

// FUNCTION OF TABULEIRO

function disableHeightWhenIsTabuleiro() {
  if (document.getElementById('tiposDeCaixa').value == 'tabuleiro') {
    addClass(inputHeightBox)
    isTabuleiro = true
  } else {
    removeClass(inputHeightBox)
    isTabuleiro = false
  }
}

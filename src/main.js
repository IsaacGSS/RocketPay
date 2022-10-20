import "./css/index.css"
import IMask from 'imask';

const ccBgcolor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgcolor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo= document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType (type) {
  const colors = {
    visa: ["#436d99","#2d57f2"],
    mastercard: ["#df6f29","#c69347"],
    default: ["black","gray"],
  }

  ccBgcolor01.setAttribute("fill", colors[type][0])
  ccBgcolor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)

}

globalThis.setCardType = setCardType

const securityCode = document.querySelector('#security-code');
const securityCodeMaskPatter = {
  mask: '0000',
}

const securityCodeMask = IMask(securityCode, securityCodeMaskPatter);

const expirationDate = document.querySelector('#expiration-date');
const expiretionDateMaskPatter = {
  mask: "MM{/}YY",
  
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  }
}
const expirationDateMask = IMask(expirationDate, expiretionDateMaskPatter)

const cardNumber = document.querySelector('#card-number');
const cardNumberPatter = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa", 
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard", 
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default", 
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g,'');
    const valueMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    });

    return valueMask
  },
}
const cardNumberMask = IMask(cardNumber, cardNumberPatter)

const addCard = document.querySelector('#addCard');
addCard.addEventListener('click', () => {

 alert("Cartão adicionado")
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
})

var cardHolder = document.querySelector('#card-holder') ;
cardHolder.addEventListener('input', () => {
  name(cardHolder)
})

function name() {
  const holder = document.querySelector(".cc-holder .value")
  holder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
}

securityCodeMask.on("accept", () => {
 code(securityCodeMask)
})

function code() {
  const ccSecurity = document.querySelector('.cc-security .value');
  ccSecurity.innerText = securityCodeMask.value.length === 0 ? "123" : securityCodeMask.value
}

expirationDateMask.on("accept", () => {
  expiration(expirationDateMask)
})

function expiration() {
  const ccExpiration = document.querySelector('.cc-expiration .value');
  ccExpiration.innerText = expirationDateMask.value.length === 0 ? "02/32" : expirationDateMask.value
}

cardNumberMask.on("accept", () => {
  const cardType = cardNumberMask.masked.currentMask.cardtype
  setCardType(cardType)
  card(cardNumberMask)
})

function card() {
  const ccNumber = document.querySelector('.cc-number');
  ccNumber.innerText = cardNumberMask.value.length === 0 ? "1234 5678 9012 3456" : cardNumberMask.value  
  console.log(cardType);
}
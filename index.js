const grid = document.querySelector('.grid')

const personagens = [
    'Onça Pintada',
    'Capivara',
    'Arara-Azul',
    'Lobo Guará',
    'Mico Leão',
    'Anta',
    'Bem-Te-Vi',
    'Lontra',
    'Bicho Preguiça'
]

let firstCarta = ''
let secondCarta = ''

const criarElemento = (tag, className) => {
    const elemento = document.createElement(tag)
    elemento.className = className
    return elemento
}

const checkEndGame = () => {
    const disCartas = document.querySelectorAll('.dis-carta')
  
    if (disCartas.length == personagens.length * 2) {
        setTimeout(() => {
            alert('Parabéns')
        }, 250)
        
    }
  }

const checkCards = () => {
    const firstCharacter = firstCarta.getAttribute('data-perso')
    const secondCharacter = secondCarta.getAttribute('data-perso')
  
    if (firstCharacter === secondCharacter) {
  
      firstCarta.firstChild.classList.add('dis-carta')
      secondCarta.firstChild.classList.add('dis-carta')
  
      firstCarta = ''
      secondCarta = ''

      checkEndGame()
  
    } else {
      setTimeout(() => {
  
        firstCarta.classList.remove('revelar-carta')
        secondCarta.classList.remove('revelar-carta')
  
        firstCarta = ''
        secondCarta = ''
  
      }, 500)
    }
}

const revelarCarta = ({ target }) =>{
    if (target.parentNode.className.includes('revelar-carta')) {
        return 
    }
    
    if (firstCarta === '') {

    target.parentNode.classList.add('revelar-carta')
    firstCarta = target.parentNode

    } else if (secondCarta === '') {

    target.parentNode.classList.add('revelar-carta')
    secondCarta = target.parentNode

    checkCards()

    }
}



const criarCarta = (personagen) =>{
    const carta = criarElemento('div', 'carta')
    const front= criarElemento('div', 'face front')
    const back = criarElemento('div', 'face back')
    const leg = criarElemento('span', 'legenda')
    
    leg.innerHTML = `${personagen}`
    front.style.backgroundImage = ` url('../images/cartas/${personagen}.png') `;
    front.appendChild(leg)
  
    carta.appendChild(front)
    carta.appendChild(back)

    carta.addEventListener('click', revelarCarta)
    carta.setAttribute('data-perso', personagen)

    return carta
}

const Jogo = () =>{

    const duplicaCarta = [...personagens, ...personagens] 

    const embaralhar = duplicaCarta.sort(() => Math.random() - 0.5)

    embaralhar.forEach((chave)=>{
        const carta = criarCarta(chave)
        grid.appendChild(carta)
    })
}
Jogo()
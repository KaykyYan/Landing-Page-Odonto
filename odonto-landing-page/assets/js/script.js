// ==================== Carrossel de Serviços ====================
// Lida com o carrossel de serviços, incluindo navegação, progresso, e responsividade.

const carousel = document.querySelector('.servicos-carousel');
const progress = document.querySelector('.progress');
const leftBtn = document.querySelector('.nav-btn.left');
const rightBtn = document.querySelector('.nav-btn.right');

let currentIndex = 0; // Índice atual do carrossel
const cardWidth = 320; // Largura de cada card incluindo margens
const totalCards = document.querySelectorAll('.servicos-carousel .card').length;

let visibleCards = Math.floor(carousel.parentElement.clientWidth / cardWidth); // Cards visíveis
let maxIndex = totalCards - visibleCards; // Índice máximo de navegação

// Atualiza a posição e aparência do carrossel
function updateCarousel() {
  carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
  progress.style.width = `${((currentIndex + visibleCards) / totalCards) * 100}%`;
  updateButtons();
}

// Atualiza os estados dos botões de navegação
function updateButtons() {
  leftBtn.disabled = currentIndex <= 0;
  rightBtn.disabled = currentIndex >= maxIndex;
  leftBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
  rightBtn.style.visibility = currentIndex < maxIndex ? 'visible' : 'hidden';
}

// Navegação para a esquerda
leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Navegação para a direita
rightBtn.addEventListener('click', () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

// Responsividade - Redimensiona o carrossel conforme o tamanho da janela
window.addEventListener('resize', () => {
  carousel.classList.add('no-transition');
  clearTimeout(this.resizeTimeout);

  this.resizeTimeout = setTimeout(() => {
    carousel.classList.remove('no-transition');
    visibleCards = Math.floor(carousel.parentElement.clientWidth / cardWidth);
    maxIndex = totalCards - visibleCards;
    currentIndex = Math.min(currentIndex, maxIndex);

    updateCarousel();
  }, 200);
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

// Inicialização do carrossel de serviços
if (totalCards <= visibleCards) {
  leftBtn.style.display = 'none';
  rightBtn.style.display = 'none';
  progress.style.width = '100%';
} else {
  updateCarousel();
}

// ==================== Carrossel de Outros Itens ====================
// Configura o carrossel genérico para itens adicionais com transições e botões.

function setupCarousel() {
  const items = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;
  let isTransitioning = false;

  function updateCarousel() {
    if (isTransitioning) return;
    isTransitioning = true;

    items.forEach((item, index) => {
      item.classList.toggle('active', index === currentIndex);
    });

    setTimeout(() => {
      isTransitioning = false;
    }, 500); // Tempo igual à transição CSS
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    } else if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }
  });

  updateCarousel(); // Inicializa o estado do carrossel
}

setupCarousel();

// ==================== Seção de Dúvidas Frequentes ====================
// Implementa comportamento para expandir/contrair perguntas frequentes.

document.querySelectorAll('.duv-faq').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.toggle-icon');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    icon.textContent = icon.textContent === '+' ? '−' : '+';
  });
});

// Atualiza os ícones de rotação e estado das respostas
const faqButtons = document.querySelectorAll('.duv-faq');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const icon = button.querySelector('i');
    icon.classList.toggle('rotate');
    const answer = button.nextElementSibling;
    if (answer.classList.contains('open')) {
      answer.classList.remove('open');
    } else {
      answer.classList.add('open');
    }
  });
});

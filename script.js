document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");
    
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });x
    });
});





function myFunction(){
    alert(`
    Project in progress...
`)}




// Função para abrir a imagem maior no modal
function openImage(imageSrc) {
    var modal = document.getElementById('image-modal');
    var modalImg = document.getElementById('modal-img');
    modalImg.src = imageSrc; // Definir a imagem no modal
    modal.classList.add('show'); // Exibir o modal
}

// Função para fechar a imagem
function closeImage() {
    var modal = document.getElementById('image-modal');
    modal.classList.remove('show'); // Fechar o modal
}

//função carrocel
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carrossel-item').length;
const container = document.querySelector('.carrossel-container');

function moverCarrossel(direction) {
    currentIndex += direction;

    // Verifica os limites
    if (currentIndex < 0) {
        currentIndex = totalItems - 3; // Volta para o último conjunto de 3 imagens
    } else if (currentIndex > totalItems - 3) {
        currentIndex = 0; // Volta para o primeiro conjunto de 3 imagens
    }

    const offset = -currentIndex * 33.33; // Calcula o deslocamento
    container.style.transform = `translateX(${offset}%)`;
}

// Função para avançar automaticamente (opcional)
function autoMoverCarrossel() {
    moverCarrossel(1);
}

setInterval(autoMoverCarrossel, 3000); // Muda as imagens a cada 3 segundos
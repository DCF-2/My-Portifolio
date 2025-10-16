'use strict';

// Seleciona todos os elementos que vamos usar
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Adiciona um evento de clique para cada link da navegação
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {

    // Pega o nome da página alvo a partir do texto do botão (ex: "sobre", "currículo")
    const targetPage = this.innerHTML.toLowerCase();

    // Itera sobre todas as páginas (articles)
    pages.forEach(page => {
      // Se o nome da página for igual ao alvo, mostra a página
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        // Senão, esconde a página
        page.classList.remove("active");
      }
    });

    // Itera sobre todos os links da navegação
    navigationLinks.forEach(navLink => {
      // Se o link for o que foi clicado, marca como ativo
      if (navLink === this) {
        navLink.classList.add("active");
      } else {
        // Senão, desmarca
        navLink.classList.remove("active");
      }
    });

    // Rola a página para o topo ao trocar de aba
    window.scrollTo(0, 0);

  });
});

// =================== LÓGICA DO FORMULÁRIO DE CONTATO ===================

const contactForm = document.querySelector("[data-form]");
const formBtn = document.querySelector("[data-form-btn]");

// Função para validar e habilitar o botão de envio
const formInputs = document.querySelectorAll("[data-form-input]");
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (contactForm.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Função para enviar o formulário
contactForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Mostra um feedback visual no botão
  formBtn.disabled = true;
  formBtn.querySelector("span").textContent = "Enviando...";

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Mensagem de sucesso
      formBtn.querySelector("span").textContent = "Enviado com Sucesso!";
      contactForm.reset(); // Limpa o formulário
    } else {
      // Mensagem de erro
      formBtn.querySelector("span").textContent = "Erro ao Enviar. Tente novamente.";
    }
  } catch (error) {
    console.error("Erro no envio:", error);
    formBtn.querySelector("span").textContent = "Erro na Rede. Verifique a conexão.";
  } finally {
    // Reabilita o botão após um tempo
    setTimeout(() => {
      formBtn.querySelector("span").textContent = "Enviar Mensagem";
      formBtn.setAttribute("disabled", "");
    }, 4000);
  }
});
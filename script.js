/* ==============================================================
   FRIO MORTAL — SCRIPT DO PERFIL
   Edite os LINKS somente em ./assets/links.js
   Edite os ARQUIVOS de imagem/som na pasta ./assets/
   ============================================================== */
(() => {
  "use strict";

  const links = window.FRIO_LINKS || {};
  const toast = document.getElementById("toast");
  const music = document.getElementById("backgroundMusic");
  const glow = document.getElementById("cursorGlow");
  const profileImage = document.getElementById("profileImage");
  let toastTimer;

  function showToast(message, duration = 3500) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), duration);
  }

  function isValidExternalURL(value) {
    if (typeof value !== "string" || !value.trim()) return false;
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  // Associa os cinco cartões com as URLs definidas em assets/links.js.
  document.querySelectorAll("[data-link]").forEach((card) => {
    const key = card.getAttribute("data-link");
    const value = links[key];
    if (isValidExternalURL(value)) {
      card.href = value.trim();
      card.removeAttribute("aria-disabled");
    } else {
      card.href = "#links";
      card.setAttribute("aria-disabled", "true");
      card.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Configure este link em assets/links.js no seu GitHub.");
      });
    }
  });

  // Se uma imagem ainda não tiver sido enviada ao GitHub,
  // ela será substituída pela identidade visual provisória.
  document.querySelectorAll(".link-icon img, #profileImage").forEach((img) => {
    const fail = () => img.classList.add("is-missing");
    img.addEventListener("error", fail, { once: true });
    if (img.complete && img.naturalWidth === 0) fail();
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());

  // Revelação sutil dos elementos durante a rolagem.
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    revealItems.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
      observer.observe(element);
    });
  } else {
    revealItems.forEach((element) => element.classList.add("is-visible"));
  }

  // Navegação com marcação da seção ativa.
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const sections = ["inicio", "sobre", "projetos", "links"].map(id => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Glow do cursor (somente dispositivos com mouse).
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = "1";
    }, { passive: true });
    document.addEventListener("pointerleave", () => { glow.style.opacity = "0"; });
  }

  // Efeito tridimensional suave no cartão de perfil.
  const profile = document.getElementById("profileDisplay");
  const profileHolder = document.querySelector(".hero-right");
  if (profile && profileHolder && window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
    profileHolder.addEventListener("pointermove", event => {
      const bounds = profileHolder.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      profile.style.setProperty("--tilt-x", `${-y * 5}deg`);
      profile.style.setProperty("--tilt-y", `${x * 5}deg`);
    }, { passive: true });
    profileHolder.addEventListener("pointerleave", () => { profile.style.setProperty("--tilt-x", "0deg"); profile.style.setProperty("--tilt-y", "0deg"); });
  }

  /* ============================================================
     MÚSICA 300 NO 7 — REPRODUÇÃO CONTÍNUA (SEM BOTÕES)

     ARQUIVO: assets/300-no-7.mp3
     - Autoplay ativado.
     - Loop infinito ativado.
     - NENHUM botão de play/pause, avançar, etc.
     - Se o navegador bloquear autoplay, qualquer primeiro toque/clique
       na página libera o áudio. Isso é uma restrição do navegador.
     ============================================================ */
  if (music) {
    music.loop = true;
    music.autoplay = true;
    music.volume = 0.65;
    music.preload = "auto";

    let started = false;
    let missingAudio = false;

    music.addEventListener("error", () => {
      missingAudio = true;
      console.info("[FrioMortal] Adicione assets/300-no-7.mp3 para ativar a trilha sonora.");
    });

    async function tryPlay() {
      if (missingAudio || started && !music.paused) return;
      try {
        await music.play();
        started = true;
      } catch (err) {
        // O autoplay com som pode ser bloqueado. O primeiro toque no site
        // libera a reprodução sem introduzir um player ou um menu.
      }
    }

    // Tenta imediatamente, inclusive em navegadores que permitem autoplay.
    tryPlay();
    music.addEventListener("canplay", tryPlay);

    // Primeiro toque em QUALQUER parte da página para liberar o som.
    document.addEventListener("pointerdown", tryPlay, { passive: true });
    document.addEventListener("touchstart", tryPlay, { passive: true });
    document.addEventListener("keydown", tryPlay);

    // Em uma aba reativada, tenta retomar caso o navegador tenha pausado.
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && music.paused && started) tryPlay();
    });
  }
})();

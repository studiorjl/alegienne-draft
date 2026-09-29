(() => {
  const openBtn = document.querySelector("[data-aleg-menu-open]");
  const panel = document.querySelector("[data-aleg-panel]");
  const closeBtn = document.querySelector("[data-aleg-menu-close]");
  if (!openBtn || !panel || !closeBtn) return;

  const open = () => {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("aleg-panel-open");
    openBtn.setAttribute("aria-expanded", "true");
    closeBtn.focus();
  };

  const close = () => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("aleg-panel-open");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.focus();
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  panel.addEventListener("click", (event) => {
    if (event.target === panel) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) close();
  });
})();

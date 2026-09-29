(() => {
  const form = document.querySelector("[data-subscribe-form]");
  if (!form) return;
  const status = form.querySelector("[data-subscribe-status]");
  const endpoint = "https://rjl-publisher-insights-agent-a07f3048.base44.app/functions/subscribeAlegienne?format=json";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.querySelector('[name="email"]').value.trim();
    const events = form.querySelector('[name="events"]').checked;
    const moon = form.querySelector('[name="moon"]').checked;

    if (!email) {
      status.textContent = "please add your email.";
      return;
    }
    if (!events && !moon) {
      status.textContent = "pick at least one, so we know what to send.";
      return;
    }

    status.textContent = "sending…";
    const submitBtn = form.querySelector("[data-subscribe-submit]");
    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, events, moon }),
      });
      if (!res.ok) throw new Error("failed");
      status.textContent = "you're in — welcome to the list, x";
      form.reset();
    } catch (error) {
      status.textContent = "something went sideways — try again, or write to orders@alegienne.com.au";
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
})();

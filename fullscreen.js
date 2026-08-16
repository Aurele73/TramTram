// Sur mobile, passe en plein écran au premier contact pour masquer la barre du navigateur.
(function () {
  const isMobile = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  if (!isMobile) return;

  function requestFullscreen() {
    const el = document.documentElement;
    const request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (!request) return;
    try {
      const result = request.call(el);
      if (result && typeof result.catch === 'function') result.catch(() => {});
    } catch (err) {}
  }

  document.addEventListener('click', requestFullscreen, { once: true });
  document.addEventListener('touchend', requestFullscreen, { once: true });
})();

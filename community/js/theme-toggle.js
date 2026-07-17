(function () {
  "use strict";

  const key = "bits2sys-theme";
  const modes = ["auto", "dark", "light"];
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const labels = {
    auto: "跟随系统",
    dark: "深色",
    light: "浅色",
  };
  const icons = {
    auto: "◐",
    dark: "●",
    light: "○",
  };

  function preference() {
    try {
      const saved = window.localStorage.getItem(key);
      return modes.includes(saved) ? saved : "auto";
    } catch (_error) {
      return document.documentElement.dataset.themePreference || "auto";
    }
  }

  function apply(mode) {
    const effective = mode === "auto" ? (media.matches ? "dark" : "light") : mode;
    document.documentElement.dataset.colorScheme = effective;
    document.documentElement.dataset.themePreference = mode;
    if (button) {
      button.textContent = icons[mode];
      button.title = `主题：${labels[mode]}（Alt + T）`;
      button.setAttribute("aria-label", button.title);
    }
  }

  function nextMode() {
    const current = preference();
    const next = modes[(modes.indexOf(current) + 1) % modes.length];
    apply(next);
    try {
      window.localStorage.setItem(key, next);
    } catch (_error) {
      // The visual toggle still works when storage is unavailable.
    }
  }

  const header = document.querySelector("#header, #header-post");
  const nav = document.querySelector("#header #nav");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.addEventListener("click", nextMode);
  if (header) {
    if (header.id === "header-post") {
      button.classList.add("theme-toggle--post");
      document.body.appendChild(button);
    } else {
      header.insertBefore(button, nav || null);
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.altKey && event.key.toLowerCase() === "t") {
      event.preventDefault();
      nextMode();
    }
  });

  media.addEventListener("change", function () {
    if (preference() === "auto") apply("auto");
  });

  apply(preference());
})();

type Attribution = {
  url: string;
  label?: string;
  html?: string;
}

export const drawAttributions = (attributions: Attribution[]) => {
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    bottom: "0",
    right: "0",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "12px",
    lineHeight: "1",
    letterSpacing: "0.02em",
    zIndex: "1000",
    padding: "2px 4px",
  });

  attributions.forEach((attr, i) => {
    const elm = attr.label ? document.createElement("a") : document.createElement("span");

    if (elm instanceof HTMLAnchorElement) {
      elm.href = attr.url;
      elm.target = "_blank";
      elm.rel = "noopener noreferrer";
      elm.textContent = attr.label ?? "";
    } else {
      elm.innerHTML = attr.html ?? "";
      elm.querySelectorAll("a").forEach(a => a.style.color = "#fff");
    }
    Object.assign(elm.style, {
      color: "#fff",
      padding: "4px 8px",
      borderLeft: i === 0 ? "none" : "1px solid rgba(255, 255, 255, 0.4)",
      whiteSpace: "nowrap",
    });
    container.appendChild(elm);
  });

  document.body.appendChild(container);
};

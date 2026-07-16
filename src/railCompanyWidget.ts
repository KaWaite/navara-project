// Overlay panel listing every rail operator with a visibility checkbox.
// Plain DOM on purpose — the app has no UI framework.

export type RailOperator = {
  op: string;
  lines: number;
  color: string;
  /** [west, south, east, north] over the operator's whole network. */
  bbox: [number, number, number, number];
};

const STYLE = `
.rail-widget {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 264px;
  background: rgba(18, 22, 30, 0.88);
  color: #e8ecf2;
  font: 12px/1.5 system-ui, -apple-system, sans-serif;
  border-radius: 8px;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
}
.rail-widget header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}
.rail-widget header .rail-widget-count {
  font-weight: 400;
  color: #9aa4b2;
  margin-left: auto;
}
.rail-widget-controls {
  display: flex;
  gap: 6px;
  padding: 0 12px 8px;
}
.rail-widget-controls input[type="search"] {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: inherit;
  padding: 3px 8px;
  font: inherit;
}
.rail-widget-controls button {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: inherit;
  font: inherit;
  padding: 3px 8px;
  cursor: pointer;
}
.rail-widget-controls button:hover {
  background: rgba(255, 255, 255, 0.16);
}
.rail-widget ul {
  list-style: none;
  margin: 0;
  padding: 0 0 6px;
  overflow-y: auto;
  max-height: 56vh;
}
.rail-widget li {
  display: flex;
  align-items: center;
}
.rail-widget li:hover {
  background: rgba(255, 255, 255, 0.06);
}
.rail-widget li label {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0 3px 12px;
  cursor: pointer;
  white-space: nowrap;
}
.rail-widget .rail-widget-zoom {
  flex: none;
  background: none;
  border: none;
  color: #9aa4b2;
  font: inherit;
  font-size: 13px;
  padding: 3px 12px 3px 8px;
  cursor: pointer;
  visibility: hidden;
}
.rail-widget li:hover .rail-widget-zoom {
  visibility: visible;
}
.rail-widget .rail-widget-zoom:hover {
  color: #e8ecf2;
}
.rail-widget .rail-widget-swatch {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 2px;
}
.rail-widget .rail-widget-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
.rail-widget .rail-widget-lines {
  margin-left: auto;
  color: #9aa4b2;
}
.rail-widget.collapsed .rail-widget-body {
  display: none;
}
`;

export function createRailCompanyWidget({
  operators,
  onChange,
  onZoom,
}: {
  operators: RailOperator[];
  /** Called with the set of hidden operator names whenever a toggle changes. */
  onChange: (hidden: ReadonlySet<string>) => void;
  /** Called with a [west, south, east, north] bbox to fly the camera to —
   * a single operator's network, or the union of all selected ones. */
  onZoom: (bbox: [number, number, number, number]) => void;
}): HTMLElement {
  document.head.appendChild(
    Object.assign(document.createElement("style"), { textContent: STYLE }),
  );

  const hidden = new Set<string>();

  const root = document.createElement("div");
  root.className = "rail-widget";

  const header = document.createElement("header");
  const title = Object.assign(document.createElement("span"), {
    textContent: "Rail companies",
  });
  const count = Object.assign(document.createElement("span"), {
    className: "rail-widget-count",
  });
  header.append(title, count);
  header.addEventListener("click", () => root.classList.toggle("collapsed"));

  const body = document.createElement("div");
  body.className = "rail-widget-body";

  const controls = document.createElement("div");
  controls.className = "rail-widget-controls";
  const search = Object.assign(document.createElement("input"), {
    type: "search",
    placeholder: "Filter…",
  });
  const showAll = Object.assign(document.createElement("button"), {
    type: "button",
    textContent: "All",
  });
  const hideAll = Object.assign(document.createElement("button"), {
    type: "button",
    textContent: "None",
  });
  const zoomSelected = Object.assign(document.createElement("button"), {
    type: "button",
    textContent: "⌖",
    title: "Zoom to all selected companies",
  });
  controls.append(search, showAll, hideAll, zoomSelected);

  const list = document.createElement("ul");
  const checkboxes = new Map<string, HTMLInputElement>();

  for (const operator of operators) {
    const { op, lines, color } = operator;
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = Object.assign(document.createElement("input"), {
      type: "checkbox",
      checked: true,
    });
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) hidden.delete(op);
      else hidden.add(op);
      update();
    });
    checkboxes.set(op, checkbox);

    const swatch = document.createElement("span");
    swatch.className = "rail-widget-swatch";
    swatch.style.background = color;

    label.append(
      checkbox,
      swatch,
      Object.assign(document.createElement("span"), {
        className: "rail-widget-name",
        textContent: op,
        title: op,
      }),
      Object.assign(document.createElement("span"), {
        className: "rail-widget-lines",
        textContent: String(lines),
        title: `${lines} lines`,
      }),
    );

    const zoom = Object.assign(document.createElement("button"), {
      type: "button",
      className: "rail-widget-zoom",
      textContent: "⌖",
      title: `Zoom to ${op}`,
    });
    zoom.addEventListener("click", () => onZoom(operator.bbox));

    item.append(label, zoom);
    list.appendChild(item);
  }

  search.addEventListener("input", () => {
    const q = search.value.trim();
    let i = 0;
    for (const item of list.children as HTMLCollectionOf<HTMLElement>) {
      item.style.display = operators[i++].op.includes(q) ? "" : "none";
    }
  });

  // Fly to the union bbox of every checked company.
  zoomSelected.addEventListener("click", () => {
    const selected = operators.filter(({ op }) => !hidden.has(op));
    if (!selected.length) return;
    const bbox: [number, number, number, number] = [180, 90, -180, -90];
    for (const o of selected) {
      bbox[0] = Math.min(bbox[0], o.bbox[0]);
      bbox[1] = Math.min(bbox[1], o.bbox[1]);
      bbox[2] = Math.max(bbox[2], o.bbox[2]);
      bbox[3] = Math.max(bbox[3], o.bbox[3]);
    }
    onZoom(bbox);
  });

  const setAll = (visible: boolean) => {
    hidden.clear();
    if (!visible) for (const { op } of operators) hidden.add(op);
    for (const [op, checkbox] of checkboxes) checkbox.checked = !hidden.has(op);
    update();
  };
  showAll.addEventListener("click", () => setAll(true));
  hideAll.addEventListener("click", () => setAll(false));

  function update() {
    count.textContent = `${operators.length - hidden.size}/${operators.length}`;
    onChange(hidden);
  }
  count.textContent = `${operators.length}/${operators.length}`;

  body.append(controls, list);
  root.append(header, body);
  return root;
}

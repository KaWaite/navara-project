// Overlay panel listing every rail operator, built around a single concept:
// focus. Click a row to focus a company (accented in place — the list never
// reorders); focused companies appear as removable chips above the list, and
// a segmented control decides how everything else renders on the globe.
// Plain DOM on purpose — the app has no UI framework.

export type RailOperator = {
  op: string;
  lines: number;
  color: string;
  /** [west, south, east, north] over the operator's whole network. */
  bbox: [number, number, number, number];
};

/** How non-focused companies render on the globe while focus is non-empty. */
export type RestMode = "all" | "dim" | "hide";

export type RailFocusState = {
  focused: ReadonlySet<string>;
  restMode: RestMode;
};

const STYLE = `
.rail-widget {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 280px;
  background: rgba(18, 22, 30, 0.70);
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
  align-items: center;
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
.rail-widget-zoom-btn {
  flex: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: inherit;
  font: inherit;
  padding: 3px 8px;
  cursor: pointer;
}
.rail-widget-zoom-btn:hover {
  background: rgba(255, 255, 255, 0.16);
}
.rail-widget-rest-label {
  color: #9aa4b2;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.rail-widget-seg {
  display: flex;
  margin-left: auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  overflow: hidden;
}
.rail-widget-seg button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  padding: 2px 10px;
  cursor: pointer;
}
.rail-widget-seg button + button {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}
.rail-widget-seg button:hover {
  background: rgba(255, 255, 255, 0.1);
}
.rail-widget-seg button.active {
  background: rgba(96, 165, 250, 0.3);
}
.rail-widget-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 0 12px 8px;
}
.rail-widget-chip {
  display: flex;
  align-items: center;
  max-width: 100%;
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.45);
  border-radius: 10px;
  padding: 1px 2px 1px 8px;
}
.rail-widget-chip-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}
.rail-widget-chip button {
  background: none;
  border: none;
  color: #9aa4b2;
  font: inherit;
  padding: 0 5px;
  cursor: pointer;
}
.rail-widget-chip button:hover {
  color: #e8ecf2;
}
.rail-widget-clear {
  background: none;
  border: none;
  color: #9aa4b2;
  font: inherit;
  padding: 1px 6px;
  cursor: pointer;
  text-decoration: underline;
}
.rail-widget-clear:hover {
  color: #e8ecf2;
}
.rail-widget ul {
  list-style: none;
  margin: 0;
  padding: 0 0 6px;
  overflow-y: auto;
  max-height: 52vh;
}
.rail-widget li {
  display: flex;
  align-items: center;
}
.rail-widget li:hover {
  background: rgba(255, 255, 255, 0.06);
}
.rail-widget li.focused {
  background: rgba(96, 165, 250, 0.16);
  box-shadow: inset 2px 0 0 #60a5fa;
}
.rail-widget li.focused:hover {
  background: rgba(96, 165, 250, 0.24);
}
.rail-widget-main {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0 3px 12px;
  cursor: pointer;
  white-space: nowrap;
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
.rail-widget .rail-widget-row-zoom {
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
.rail-widget li:hover .rail-widget-row-zoom {
  visibility: visible;
}
.rail-widget .rail-widget-row-zoom:hover {
  color: #e8ecf2;
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
  /** Called whenever the focus set or the rest-mode changes. */
  onChange: (state: RailFocusState) => void;
  /** Called with a [west, south, east, north] bbox to fly the camera to —
   * a single operator's network, the focus, or the whole network. */
  onZoom: (bbox: [number, number, number, number]) => void;
}): HTMLElement {
  document.head.appendChild(
    Object.assign(document.createElement("style"), { textContent: STYLE }),
  );

  const focused = new Set<string>();
  let restMode: RestMode = "dim";

  const root = document.createElement("div");
  root.className = "rail-widget";

  const header = document.createElement("header");
  const count = Object.assign(document.createElement("span"), {
    className: "rail-widget-count",
  });
  header.append(
    Object.assign(document.createElement("span"), {
      textContent: "鉄道会社",
    }),
    count,
  );
  header.addEventListener("click", () => root.classList.toggle("collapsed"));

  const body = document.createElement("div");
  body.className = "rail-widget-body";

  // Row 1: search + zoom-to-focus.
  const searchRow = document.createElement("div");
  searchRow.className = "rail-widget-controls";
  const search = Object.assign(document.createElement("input"), {
    type: "search",
    placeholder: "検索…",
  });
  const zoomFocus = Object.assign(document.createElement("button"), {
    type: "button",
    className: "rail-widget-zoom-btn",
    textContent: "⌖",
    title: "選択中の会社へズーム（未選択時は全路線網）",
  });
  searchRow.append(search, zoomFocus);

  // Row 2: how non-focused companies render on the globe.
  const restRow = document.createElement("div");
  restRow.className = "rail-widget-controls";
  restRow.appendChild(
    Object.assign(document.createElement("span"), {
      className: "rail-widget-rest-label",
      textContent: "その他",
    }),
  );
  const seg = document.createElement("div");
  seg.className = "rail-widget-seg";
  const segButtons = new Map<RestMode, HTMLButtonElement>();
  for (const [mode, label, title] of [
    ["all", "全て", "非選択の会社を通常表示"],
    ["dim", "淡く", "非選択の会社を細く淡く表示"],
    ["hide", "非表示", "非選択の会社を地球上から隠す"],
  ] as const) {
    const button = Object.assign(document.createElement("button"), {
      type: "button",
      textContent: label,
      title,
    });
    button.addEventListener("click", () => {
      restMode = mode;
      for (const [m, b] of segButtons) b.classList.toggle("active", m === mode);
      update();
    });
    segButtons.set(mode, button);
    seg.appendChild(button);
  }
  segButtons.get(restMode)!.classList.add("active");
  restRow.appendChild(seg);

  // Chips for the current focus; hidden while the focus is empty.
  const chips = document.createElement("div");
  chips.className = "rail-widget-chips";
  chips.style.display = "none";

  const list = document.createElement("ul");
  const items = new Map<string, HTMLLIElement>();

  const toggleFocus = (op: string) => {
    if (focused.has(op)) focused.delete(op);
    else focused.add(op);
    items.get(op)?.classList.toggle("focused", focused.has(op));
    update();
  };

  for (const operator of operators) {
    const { op, lines, color } = operator;
    const item = document.createElement("li");

    const swatch = document.createElement("span");
    swatch.className = "rail-widget-swatch";
    swatch.style.background = color;

    const main = document.createElement("div");
    main.className = "rail-widget-main";
    main.title = `${op} — クリックで選択`;
    main.append(
      swatch,
      Object.assign(document.createElement("span"), {
        className: "rail-widget-name",
        textContent: op,
      }),
      Object.assign(document.createElement("span"), {
        className: "rail-widget-lines",
        textContent: String(lines),
        title: `${lines} 路線`,
      }),
    );
    main.addEventListener("click", () => toggleFocus(op));

    const zoom = Object.assign(document.createElement("button"), {
      type: "button",
      className: "rail-widget-row-zoom",
      textContent: "⌖",
      title: `${op}へズーム`,
    });
    zoom.addEventListener("click", () => onZoom(operator.bbox));

    item.append(main, zoom);
    list.appendChild(item);
    items.set(op, item);
  }

  search.addEventListener("input", () => {
    const q = search.value.trim();
    for (const { op } of operators) {
      items.get(op)!.style.display = op.includes(q) ? "" : "none";
    }
  });

  // Fly to the union bbox of the focus, or of the whole network.
  zoomFocus.addEventListener("click", () => {
    const pool = focused.size
      ? operators.filter(({ op }) => focused.has(op))
      : operators;
    const bbox: [number, number, number, number] = [180, 90, -180, -90];
    for (const o of pool) {
      bbox[0] = Math.min(bbox[0], o.bbox[0]);
      bbox[1] = Math.min(bbox[1], o.bbox[1]);
      bbox[2] = Math.max(bbox[2], o.bbox[2]);
      bbox[3] = Math.max(bbox[3], o.bbox[3]);
    }
    onZoom(bbox);
  });

  const renderChips = () => {
    chips.replaceChildren();
    chips.style.display = focused.size ? "" : "none";
    for (const op of focused) {
      const chip = document.createElement("span");
      chip.className = "rail-widget-chip";
      const remove = Object.assign(document.createElement("button"), {
        type: "button",
        textContent: "×",
        title: `${op}の選択を解除`,
      });
      remove.addEventListener("click", () => toggleFocus(op));
      chip.append(
        Object.assign(document.createElement("span"), {
          className: "rail-widget-chip-name",
          textContent: op,
          title: op,
        }),
        remove,
      );
      chips.appendChild(chip);
    }
    if (focused.size) {
      const clear = Object.assign(document.createElement("button"), {
        type: "button",
        className: "rail-widget-clear",
        textContent: "クリア",
      });
      clear.addEventListener("click", () => {
        focused.clear();
        for (const item of items.values()) item.classList.remove("focused");
        update();
      });
      chips.appendChild(clear);
    }
  };

  function update() {
    renderChips();
    count.textContent = focused.size
      ? `${focused.size} 件選択 · ${operators.length}`
      : String(operators.length);
    onChange({ focused, restMode });
  }
  count.textContent = String(operators.length);

  body.append(searchRow, restRow, chips, list);
  root.append(header, body);
  return root;
}

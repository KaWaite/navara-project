// Combined overlay panel with two tabs: rail companies and prefectures.
//
// Rail companies tab — focus concept: click a row to focus a company
// (accented in place, the list never reorders); focused companies appear as
// removable chips, and a segmented control decides how everything else
// renders on the globe.
//
// Prefectures tab — selection concept: while the selection is non-empty,
// only rail pieces inside selected prefectures render (the evaluator in
// main.ts reads the feature's `pref` tag). Empty selection shows everything.
//
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

export type Prefecture = {
  /** JIS prefecture code, 1 (北海道) .. 47 (沖縄県). */
  code: number;
  name: string;
  lines: number;
  /** [west, south, east, north] over the prefecture's rail pieces. */
  bbox: [number, number, number, number];
};

type Bbox = [number, number, number, number];

const STYLE = `
.filter-widget {
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
.filter-widget header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 0 12px;
  cursor: pointer;
  user-select: none;
}
.fw-tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #9aa4b2;
  font: inherit;
  font-weight: 600;
  padding: 8px 0 5px;
  cursor: pointer;
}
.fw-tab:hover {
  color: #e8ecf2;
}
.fw-tab.active {
  color: #e8ecf2;
  border-bottom-color: #60a5fa;
}
.fw-count {
  color: #9aa4b2;
  margin-left: auto;
}
.fw-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px 8px;
}
.fw-controls input[type="search"] {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: inherit;
  padding: 3px 8px;
  font: inherit;
}
.fw-btn {
  flex: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: inherit;
  font: inherit;
  padding: 3px 8px;
  cursor: pointer;
}
.fw-btn:hover {
  background: rgba(255, 255, 255, 0.16);
}
.fw-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.fw-btn:disabled:hover {
  background: rgba(255, 255, 255, 0.08);
}
.fw-rest-label {
  color: #9aa4b2;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.fw-seg {
  display: flex;
  margin-left: auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  overflow: hidden;
}
.fw-seg button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  padding: 2px 10px;
  cursor: pointer;
}
.fw-seg button + button {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}
.fw-seg button:hover {
  background: rgba(255, 255, 255, 0.1);
}
.fw-seg button.active {
  background: rgba(96, 165, 250, 0.3);
}
.fw-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 0 12px 8px;
}
.fw-chip {
  display: flex;
  align-items: center;
  max-width: 100%;
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.45);
  border-radius: 10px;
  padding: 1px 2px 1px 8px;
}
.fw-chip-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}
.fw-chip button {
  background: none;
  border: none;
  color: #9aa4b2;
  font: inherit;
  padding: 0 5px;
  cursor: pointer;
}
.fw-chip button:hover {
  color: #e8ecf2;
}
.fw-clear-link {
  background: none;
  border: none;
  color: #9aa4b2;
  font: inherit;
  padding: 1px 6px;
  cursor: pointer;
  text-decoration: underline;
}
.fw-clear-link:hover {
  color: #e8ecf2;
}
.filter-widget ul {
  list-style: none;
  margin: 0;
  padding: 0 0 6px;
  overflow-y: auto;
  max-height: 52vh;
}
.filter-widget li {
  display: flex;
  align-items: center;
}
.filter-widget li:hover {
  background: rgba(255, 255, 255, 0.06);
}
.filter-widget li.selected {
  background: rgba(96, 165, 250, 0.16);
  box-shadow: inset 2px 0 0 #60a5fa;
}
.filter-widget li.selected:hover {
  background: rgba(96, 165, 250, 0.24);
}
.fw-main {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0 3px 12px;
  cursor: pointer;
  white-space: nowrap;
}
.fw-swatch {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 2px;
}
.fw-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
.fw-lines {
  margin-left: auto;
  color: #9aa4b2;
}
.fw-row-zoom {
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
.filter-widget li:hover .fw-row-zoom {
  visibility: visible;
}
.fw-row-zoom:hover {
  color: #e8ecf2;
}
.filter-widget.collapsed .fw-body {
  display: none;
}
`;

const unionBbox = (boxes: Bbox[]): Bbox => {
  const bbox: Bbox = [180, 90, -180, -90];
  for (const b of boxes) {
    bbox[0] = Math.min(bbox[0], b[0]);
    bbox[1] = Math.min(bbox[1], b[1]);
    bbox[2] = Math.max(bbox[2], b[2]);
    bbox[3] = Math.max(bbox[3], b[3]);
  }
  return bbox;
};

type Pane = {
  el: HTMLElement;
  /** Header count text for this pane, e.g. "3 件選択 · 177". */
  count: () => string;
};

function buildRailPane(
  operators: RailOperator[],
  onChange: (state: RailFocusState) => void,
  onZoom: (bbox: Bbox) => void,
  refreshHeader: () => void,
): Pane {
  const focused = new Set<string>();
  let restMode: RestMode = "dim";

  const pane = document.createElement("div");

  // Row 1: search + zoom-to-focus.
  const searchRow = document.createElement("div");
  searchRow.className = "fw-controls";
  const search = Object.assign(document.createElement("input"), {
    type: "search",
    placeholder: "検索…",
  });
  const zoomFocus = Object.assign(document.createElement("button"), {
    type: "button",
    className: "fw-btn",
    textContent: "⌖",
    title: "選択中の会社へズーム（未選択時は全路線網）",
  });
  searchRow.append(search, zoomFocus);

  // Row 2: how non-focused companies render on the globe.
  const restRow = document.createElement("div");
  restRow.className = "fw-controls";
  restRow.appendChild(
    Object.assign(document.createElement("span"), {
      className: "fw-rest-label",
      textContent: "その他",
    }),
  );
  const seg = document.createElement("div");
  seg.className = "fw-seg";
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
  chips.className = "fw-chips";
  chips.style.display = "none";

  const list = document.createElement("ul");
  const items = new Map<string, HTMLLIElement>();

  const toggleFocus = (op: string) => {
    if (focused.has(op)) focused.delete(op);
    else focused.add(op);
    items.get(op)?.classList.toggle("selected", focused.has(op));
    update();
  };

  for (const operator of operators) {
    const { op, lines, color } = operator;
    const item = document.createElement("li");

    const swatch = document.createElement("span");
    swatch.className = "fw-swatch";
    swatch.style.background = color;

    const main = document.createElement("div");
    main.className = "fw-main";
    main.title = `${op} — クリックで選択`;
    main.append(
      swatch,
      Object.assign(document.createElement("span"), {
        className: "fw-name",
        textContent: op,
      }),
      Object.assign(document.createElement("span"), {
        className: "fw-lines",
        textContent: String(lines),
        title: `${lines} 路線`,
      }),
    );
    main.addEventListener("click", () => toggleFocus(op));

    const zoom = Object.assign(document.createElement("button"), {
      type: "button",
      className: "fw-row-zoom",
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
    if (pool.length) onZoom(unionBbox(pool.map((o) => o.bbox)));
  });

  const renderChips = () => {
    chips.replaceChildren();
    chips.style.display = focused.size ? "" : "none";
    for (const op of focused) {
      const chip = document.createElement("span");
      chip.className = "fw-chip";
      const remove = Object.assign(document.createElement("button"), {
        type: "button",
        textContent: "×",
        title: `${op}の選択を解除`,
      });
      remove.addEventListener("click", () => toggleFocus(op));
      chip.append(
        Object.assign(document.createElement("span"), {
          className: "fw-chip-name",
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
        className: "fw-clear-link",
        textContent: "クリア",
      });
      clear.addEventListener("click", () => {
        focused.clear();
        for (const item of items.values()) item.classList.remove("selected");
        update();
      });
      chips.appendChild(clear);
    }
  };

  function update() {
    renderChips();
    refreshHeader();
    onChange({ focused, restMode });
  }

  pane.append(searchRow, restRow, chips, list);
  return {
    el: pane,
    count: () =>
      focused.size
        ? `${focused.size} 件選択 · ${operators.length}`
        : String(operators.length),
  };
}

function buildPrefPane(
  prefectures: Prefecture[],
  onChange: (selected: ReadonlySet<number>) => void,
  onZoom: (bbox: Bbox) => void,
  refreshHeader: () => void,
): Pane {
  const selected = new Set<number>();

  const pane = document.createElement("div");

  const controls = document.createElement("div");
  controls.className = "fw-controls";
  const search = Object.assign(document.createElement("input"), {
    type: "search",
    placeholder: "検索…",
  });
  const zoomSelection = Object.assign(document.createElement("button"), {
    type: "button",
    className: "fw-btn",
    textContent: "⌖",
    title: "選択中の都道府県へズーム（未選択時は全国）",
  });
  const clear = Object.assign(document.createElement("button"), {
    type: "button",
    className: "fw-btn",
    textContent: "クリア",
    title: "選択を解除して全国を表示",
    disabled: true,
  });
  controls.append(search, zoomSelection, clear);

  const list = document.createElement("ul");
  const items = new Map<number, HTMLLIElement>();

  const toggle = (code: number) => {
    if (selected.has(code)) selected.delete(code);
    else selected.add(code);
    items.get(code)?.classList.toggle("selected", selected.has(code));
    update();
  };

  for (const prefecture of prefectures) {
    const { code, name, lines } = prefecture;
    const item = document.createElement("li");

    const main = document.createElement("div");
    main.className = "fw-main";
    main.title = `${name} — クリックで表示切替`;
    main.append(
      Object.assign(document.createElement("span"), {
        className: "fw-name",
        textContent: name,
      }),
      Object.assign(document.createElement("span"), {
        className: "fw-lines",
        textContent: String(lines),
        title: `${lines} 路線`,
      }),
    );
    main.addEventListener("click", () => toggle(code));

    const zoom = Object.assign(document.createElement("button"), {
      type: "button",
      className: "fw-row-zoom",
      textContent: "⌖",
      title: `${name}へズーム`,
    });
    zoom.addEventListener("click", () => onZoom(prefecture.bbox));

    item.append(main, zoom);
    list.appendChild(item);
    items.set(code, item);
  }

  search.addEventListener("input", () => {
    const q = search.value.trim();
    for (const { code, name } of prefectures) {
      items.get(code)!.style.display = name.includes(q) ? "" : "none";
    }
  });

  // Fly to the union bbox of the selection, or of the whole country.
  zoomSelection.addEventListener("click", () => {
    const pool = selected.size
      ? prefectures.filter(({ code }) => selected.has(code))
      : prefectures;
    if (pool.length) onZoom(unionBbox(pool.map((p) => p.bbox)));
  });

  clear.addEventListener("click", () => {
    selected.clear();
    for (const item of items.values()) item.classList.remove("selected");
    update();
  });

  function update() {
    clear.disabled = selected.size === 0;
    refreshHeader();
    onChange(selected);
  }

  pane.append(controls, list);
  return {
    el: pane,
    count: () =>
      selected.size
        ? `${selected.size} 件選択 · ${prefectures.length}`
        : String(prefectures.length),
  };
}

export function createFilterWidget({
  operators,
  prefectures,
  onRailChange,
  onPrefChange,
  onZoom,
}: {
  operators: RailOperator[];
  prefectures: Prefecture[];
  /** Called whenever the company focus set or the rest-mode changes. */
  onRailChange: (state: RailFocusState) => void;
  /** Called whenever the prefecture selection changes. Empty set = show all. */
  onPrefChange: (selected: ReadonlySet<number>) => void;
  /** Called with a [west, south, east, north] bbox to fly the camera to. */
  onZoom: (bbox: Bbox) => void;
}): HTMLElement {
  document.head.appendChild(
    Object.assign(document.createElement("style"), { textContent: STYLE }),
  );

  const root = document.createElement("div");
  root.className = "filter-widget";

  const header = document.createElement("header");
  const count = Object.assign(document.createElement("span"), {
    className: "fw-count",
  });
  // Clicking the header background collapses the widget; tab clicks switch
  // panes without collapsing (stopPropagation below).
  header.addEventListener("click", () => root.classList.toggle("collapsed"));

  const body = document.createElement("div");
  body.className = "fw-body";

  type TabKey = "rail" | "pref";
  let active: TabKey = "pref";
  const panes = new Map<TabKey, Pane>();
  const tabs = new Map<TabKey, HTMLButtonElement>();

  const refreshHeader = () => {
    count.textContent = panes.get(active)?.count() ?? "";
  };

  const activate = (key: TabKey) => {
    active = key;
    for (const [k, tab] of tabs) tab.classList.toggle("active", k === key);
    for (const [k, pane] of panes) {
      pane.el.style.display = k === key ? "" : "none";
    }
    root.classList.remove("collapsed");
    refreshHeader();
  };

  const railPane = buildRailPane(
    operators,
    onRailChange,
    onZoom,
    refreshHeader,
  );
  const prefPane = buildPrefPane(
    prefectures,
    onPrefChange,
    onZoom,
    refreshHeader,
  );
  panes.set("rail", railPane);
  panes.set("pref", prefPane);

  for (const [key, label, available] of [
    ["pref", "都道府県", prefectures.length > 0],
    ["rail", "鉄道会社", operators.length > 0],
  ] as const) {
    const tab = Object.assign(document.createElement("button"), {
      type: "button",
      className: "fw-tab",
      textContent: label,
    });
    if (!available) tab.style.display = "none";
    tab.addEventListener("click", (e) => {
      e.stopPropagation();
      activate(key);
    });
    tabs.set(key, tab);
    header.appendChild(tab);
    body.appendChild(panes.get(key)!.el);
  }
  header.appendChild(count);

  // Default to the first tab that has data.
  activate(operators.length || !prefectures.length ? "pref" : "rail");

  root.append(header, body);
  return root;
}

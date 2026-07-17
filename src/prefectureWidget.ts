// Overlay panel listing the 47 prefectures, top-left. Same focus concept as
// the rail company widget: click a row to select a prefecture; while the
// selection is non-empty, only rail pieces inside selected prefectures render
// (the evaluator in main.ts reads the feature's `pref` tag). Empty selection
// means everything is shown.
// Plain DOM on purpose — the app has no UI framework.

export type Prefecture = {
  /** JIS prefecture code, 1 (北海道) .. 47 (沖縄県). */
  code: number;
  name: string;
  lines: number;
  /** [west, south, east, north] over the prefecture's rail pieces. */
  bbox: [number, number, number, number];
};

const STYLE = `
.pref-widget {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 10;
  width: 230px;
  background: rgba(18, 22, 30, 0.70);
  color: #e8ecf2;
  font: 12px/1.5 system-ui, -apple-system, sans-serif;
  border-radius: 8px;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
}
.pref-widget header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}
.pref-widget header .pref-widget-count {
  font-weight: 400;
  color: #9aa4b2;
  margin-left: auto;
}
.pref-widget-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px 8px;
}
.pref-widget-controls input[type="search"] {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: inherit;
  padding: 3px 8px;
  font: inherit;
}
.pref-widget-zoom-btn,
.pref-widget-clear-btn {
  flex: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: inherit;
  font: inherit;
  padding: 3px 8px;
  cursor: pointer;
}
.pref-widget-zoom-btn:hover,
.pref-widget-clear-btn:hover {
  background: rgba(255, 255, 255, 0.16);
}
.pref-widget-clear-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.pref-widget-clear-btn:disabled:hover {
  background: rgba(255, 255, 255, 0.08);
}
.pref-widget ul {
  list-style: none;
  margin: 0;
  padding: 0 0 6px;
  overflow-y: auto;
  max-height: 56vh;
}
.pref-widget li {
  display: flex;
  align-items: center;
}
.pref-widget li:hover {
  background: rgba(255, 255, 255, 0.06);
}
.pref-widget li.selected {
  background: rgba(96, 165, 250, 0.16);
  box-shadow: inset 2px 0 0 #60a5fa;
}
.pref-widget li.selected:hover {
  background: rgba(96, 165, 250, 0.24);
}
.pref-widget-main {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0 3px 12px;
  cursor: pointer;
  white-space: nowrap;
}
.pref-widget .pref-widget-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
.pref-widget .pref-widget-lines {
  margin-left: auto;
  color: #9aa4b2;
}
.pref-widget .pref-widget-row-zoom {
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
.pref-widget li:hover .pref-widget-row-zoom {
  visibility: visible;
}
.pref-widget .pref-widget-row-zoom:hover {
  color: #e8ecf2;
}
.pref-widget.collapsed .pref-widget-body {
  display: none;
}
`;

export function createPrefectureWidget({
  prefectures,
  onChange,
  onZoom,
}: {
  prefectures: Prefecture[];
  /** Called whenever the selection changes. Empty set = show everything. */
  onChange: (selected: ReadonlySet<number>) => void;
  /** Called with a [west, south, east, north] bbox to fly the camera to —
   * a single prefecture's network, the selection, or the whole country. */
  onZoom: (bbox: [number, number, number, number]) => void;
}): HTMLElement {
  document.head.appendChild(
    Object.assign(document.createElement("style"), { textContent: STYLE }),
  );

  const selected = new Set<number>();

  const root = document.createElement("div");
  root.className = "pref-widget";

  const header = document.createElement("header");
  const count = Object.assign(document.createElement("span"), {
    className: "pref-widget-count",
  });
  header.append(
    Object.assign(document.createElement("span"), {
      textContent: "都道府県",
    }),
    count,
  );
  header.addEventListener("click", () => root.classList.toggle("collapsed"));

  const body = document.createElement("div");
  body.className = "pref-widget-body";

  const controls = document.createElement("div");
  controls.className = "pref-widget-controls";
  const search = Object.assign(document.createElement("input"), {
    type: "search",
    placeholder: "検索…",
  });
  const zoomSelection = Object.assign(document.createElement("button"), {
    type: "button",
    className: "pref-widget-zoom-btn",
    textContent: "⌖",
    title: "選択中の都道府県へズーム（未選択時は全国）",
  });
  const clear = Object.assign(document.createElement("button"), {
    type: "button",
    className: "pref-widget-clear-btn",
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
    main.className = "pref-widget-main";
    main.title = `${name} — クリックで表示切替`;
    main.append(
      Object.assign(document.createElement("span"), {
        className: "pref-widget-name",
        textContent: name,
      }),
      Object.assign(document.createElement("span"), {
        className: "pref-widget-lines",
        textContent: String(lines),
        title: `${lines} 路線`,
      }),
    );
    main.addEventListener("click", () => toggle(code));

    const zoom = Object.assign(document.createElement("button"), {
      type: "button",
      className: "pref-widget-row-zoom",
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
    const bbox: [number, number, number, number] = [180, 90, -180, -90];
    for (const p of pool) {
      bbox[0] = Math.min(bbox[0], p.bbox[0]);
      bbox[1] = Math.min(bbox[1], p.bbox[1]);
      bbox[2] = Math.max(bbox[2], p.bbox[2]);
      bbox[3] = Math.max(bbox[3], p.bbox[3]);
    }
    onZoom(bbox);
  });

  clear.addEventListener("click", () => {
    selected.clear();
    for (const item of items.values()) item.classList.remove("selected");
    update();
  });

  function update() {
    clear.disabled = selected.size === 0;
    count.textContent = selected.size
      ? `${selected.size} 件選択 · ${prefectures.length}`
      : String(prefectures.length);
    onChange(selected);
  }
  count.textContent = String(prefectures.length);

  body.append(controls, list);
  root.append(header, body);
  return root;
}

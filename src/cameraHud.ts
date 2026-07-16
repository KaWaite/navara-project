// Read-only camera HUD: compass + position/orientation, bottom-left.
// Plain DOM on purpose — the app has no UI framework.

/** Structural subset of ThreeViewCamera (not exported by @navara/three). */
export type CameraLike = {
  positionGeographic: { lng: number; lat: number; height: number };
  orientation: { heading?: number; pitch?: number; roll?: number };
  zoom: number | undefined;
  on(event: "move" | "moveend", cb: () => void): void;
};

const STYLE = `
.camera-hud {
  position: fixed;
  bottom: 12px;
  left: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px 8px 10px;
  background: rgba(18, 22, 30, 0.88);
  color: #e8ecf2;
  font: 12px/1.4 system-ui, -apple-system, sans-serif;
  border-radius: 8px;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  pointer-events: none;
  user-select: none;
}
.camera-hud-compass {
  flex: none;
  display: block;
}
.camera-hud-needle {
  transform-origin: 50% 50%;
}
.camera-hud-grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2px 14px;
}
.camera-hud-grid > div {
  display: flex;
  gap: 6px;
  align-items: baseline;
}
.camera-hud-label {
  color: #9aa4b2;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.camera-hud-value {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
`;

const COMPASS = `
<svg class="camera-hud-compass" width="34" height="34" viewBox="0 0 34 34">
  <circle cx="17" cy="17" r="16" fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
  <g class="camera-hud-needle">
    <polygon points="17,5 20.5,17 13.5,17" fill="#e5534b"/>
    <polygon points="17,29 20.5,17 13.5,17" fill="#cfd6df"/>
    <circle cx="17" cy="17" r="1.6" fill="#10141b"/>
  </g>
</svg>
`;

function formatHeight(height: number): string {
  if (height >= 10_000) {
    return `${Math.round(height / 1000).toLocaleString("en")} km`;
  }
  return `${Math.round(height).toLocaleString("en")} m`;
}

export function createCameraHud(camera: CameraLike): HTMLElement {
  document.head.appendChild(
    Object.assign(document.createElement("style"), { textContent: STYLE }),
  );

  const root = document.createElement("div");
  root.className = "camera-hud";
  root.innerHTML = COMPASS;
  const needle = root.querySelector<SVGGElement>(".camera-hud-needle")!;

  const grid = document.createElement("div");
  grid.className = "camera-hud-grid";
  const values = new Map<string, HTMLSpanElement>();
  for (const label of ["lat", "lng", "alt", "heading", "pitch", "zoom"]) {
    const cell = document.createElement("div");
    const value = Object.assign(document.createElement("span"), {
      className: "camera-hud-value",
      textContent: "–",
    });
    cell.append(
      Object.assign(document.createElement("span"), {
        className: "camera-hud-label",
        textContent: label,
      }),
      value,
    );
    values.set(label, value);
    grid.appendChild(cell);
  }
  root.appendChild(grid);

  const set = (label: string, text: string) => {
    values.get(label)!.textContent = text;
  };

  const render = (): boolean => {
    let lng: number, lat: number, height: number, heading, pitch;
    try {
      ({ lng, lat, height } = camera.positionGeographic);
      ({ heading = 0, pitch = 0 } = camera.orientation);
    } catch {
      // The getters throw until the engine has produced its first camera
      // pose (shortly after init).
      return false;
    }
    const zoom = camera.zoom;

    set("lat", `${lat.toFixed(4)}°`);
    set("lng", `${lng.toFixed(4)}°`);
    set("alt", formatHeight(height));
    set("heading", `${(((heading % 360) + 360) % 360).toFixed(1)}°`);
    set("pitch", `${pitch.toFixed(1)}°`);
    set("zoom", zoom === undefined ? "–" : zoom.toFixed(2));

    // Screen-up points along the heading, so north sits at -heading.
    needle.style.transform = `rotate(${-heading}deg)`;
    return true;
  };

  // Coalesce bursts of move events into one update per frame.
  let raf = 0;
  const scheduleRender = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      render();
    });
  };
  camera.on("move", scheduleRender);
  camera.on("moveend", scheduleRender);

  // Poll until the first pose is readable, then rely on move events.
  const waitForFirstPose = () => {
    if (!render()) requestAnimationFrame(waitForFirstPose);
  };
  waitForFirstPose();

  return root;
}

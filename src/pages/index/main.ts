const pages: string[] = PAGES;
const examples: string[] = EXAMPLES;
document.querySelector<HTMLDivElement>('body')!.innerHTML = `
  <div style="margin: 10px 20px;">
    <h1>Index</h1>
      <ul>
      ${pages.map(e => `<li><a href="/${e}">${e}</a></li>`).join("")}
      </ul>
    <h2>Examples</h2>
      <ul>
      ${examples.map(e => `<li><a href="/examples-${e}">${e}</a></li>`).join("")}
      </ul>
  </div>
`;

let docute = new Docute({
  target: "#docute",
  sourcePath: "./docs/",
  nav: [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "About",
      link: "/about"
    }
  ],
  sidebar: [
    {
      title: "Guide",
      links: [
        {
          title: "Introduction",
          link: "/introduction"
        },
        {
          title: "Installation",
          link: "/installation"
        }
      ]
    }
  ]
});

docute.pluginApi.extendMarkedRenderer(renderer => {
  let originalRendererCode = renderer.code;
  renderer.code = function() {
    if (arguments[1].toLowerCase() == "mermaid") {
      return `<mermaid-graph> ${arguments[0]} </mermaid-graph>`;
    }

    return originalRendererCode.apply(this, arguments);
  };
});

mermaid.initialize({
  theme: "default",
  startOnLoad: false,
  securityLevel: "loose"
});

Vue.component("mermaid-graph", {
  template: `
    <div class="mermaid" ref="mermaid">
     <slot></slot>
    </div>
  `,
  mounted() {
    try {
      mermaid.init(undefined, this.$refs.mermaid);
    } catch (e) {
      let errorMessage = document.createElement("pre");
      errorMessage.classList.add("error-message");
      errorMessage.innerText = "mermaid " + e;
      this.$refs.mermaid.innerHTML = "";
      this.$refs.mermaid.appendChild(errorMessage);
      console.error(e);
    }
  }
});

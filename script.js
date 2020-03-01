/* globals Docute */

new Docute({
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
    mermaid.init(undefined, this.$refs.mermaid);
  }
});

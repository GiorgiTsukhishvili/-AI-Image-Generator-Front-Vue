const colors = [
  { color: "rgba(250, 128, 114, 1)", background: "rgba(250, 128, 114, 0.15)" },
  { color: "rgba(255, 191, 0, 1)", background: "rgba(255, 191, 0, 0.15)" },
  { color: "rgba(100, 149, 237, 1)", background: "rgba(100, 149, 237, 0.15)" },
  { color: "rgba(14, 224, 208, 1)", background: "rgba(14, 224, 208, 0.15)" },
  { color: "rgba(124, 124, 255, 1)", background: "rgba(124, 124, 255, 0.15)" },
  { color: "rgba(16, 16, 128, 1)", background: "rgba(16, 16, 128, 0.15)" },
  { color: "rgba(255, 0, 255, 1)", background: "rgba(255, 0, 255, 0.15)" },
  { color: "rgba(128, 0, 128, 1)", background: "rgba(128, 0, 128, 0.15)" },
  { color: "rgba(25, 219, 105, 1)", background: "rgba(25, 219, 105, 0.15)" },
  { color: "rgba(224, 17, 95, 1)", background: "rgba(224, 17, 95,  0.15)" },
  { color: "rgba(0, 255, 0, 1)", background: "rgba(0, 255, 0, 0.15)" },
  { color: "rgba(2, 21, 179, 1)", background: "rgba(2, 21, 179, 0.15)" },
  { color: "rgba(255, 41, 0, 1)", background: "rgba(255, 41, 0, 0.15)" },
  { color: "rgba(255, 41, 255, 1)", background: "rgba(255, 41, 255, 0.15)" },
];

export const randColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

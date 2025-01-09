export function reveal() {
  const attrName = "start-hidden";
  const elements = document.querySelectorAll(`[${attrName}]`);
  elements.forEach((element) => {
    element.removeAttribute(attrName);
  });
}

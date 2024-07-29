// 获取SVG元素
const svgElement = document.querySelector('svg');

// 获取SVG元素相对于视口的位置
const boundingRect = svgElement.getBoundingClientRect();

// 获取元素左上角相对于视口的坐标
const left = boundingRect.left;
const top = boundingRect.top;

console.log('SVG元素在视口中的位置：', left, top);

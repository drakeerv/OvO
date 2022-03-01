let blocklyArea = document.getElementById("blocklyArea");
let blocklyOutput = document.getElementById("blocklyOutput");
let blocklyDiv = document.getElementById("blocklyDiv");

Creator = {};
Creator.workspace = null;

for (var messageKey in MSG) {
  if (messageKey.indexOf('cat') === 0) {
    Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
  }
}

let toolboxText = document
  .getElementById("toolbox")
  .outerHTML.replace(/(^|[^%]){(\w+)}/g, function (m, p1, p2) {
    return p1 + MSG[p2];
  });
let toolboxXml = Blockly.Xml.textToDom(toolboxText);

Creator.workspace = Blockly.inject(blocklyDiv, {
  grid: { spacing: 25, length: 3, colour: "#ccc", snap: true },
  media: "assets/blockly/",
  toolbox: toolboxXml,
  zoom: { controls: true, wheel: true },
});

let onresize = function (e) {
  let element = blocklyArea;
  let x = 0;
  let y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  blocklyDiv.style.left = x + "px";
  blocklyDiv.style.top = y + "px";
  blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
  blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
  Blockly.svgResize(Creator.workspace);
};
window.addEventListener("resize", onresize, false);
Blockly.svgResize(Creator.workspace);
onresize();

let generateCode = function () {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  let code = Blockly.JavaScript.workspaceToCode(Creator.workspace);
  blocklyOutput.firstElementChild.innerHTML = code;
  if (typeof hljs === "object") {
    hljs.highlightElement(blocklyOutput.firstElementChild);
  }
};
Creator.workspace.addChangeListener(generateCode);

Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
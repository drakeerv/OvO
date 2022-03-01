Blockly.JavaScript["notification"] = function (block) {
  var value_title = Blockly.JavaScript.valueToCode(
    block,
    "TITLE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var value_text = Blockly.JavaScript.valueToCode(
    block,
    "TEXT",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var value_image = Blockly.JavaScript.valueToCode(
    block,
    "IMAGE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `ovoModApi.game.notify(${
    value_title
      ? value_title +
        (value_text
          ? ", " + value_text + (value_image ? ", " + value_image : "")
          : "")
      : ""
  });\n`;
  return code;
};

Blockly.Blocks["notification"] = {
  init: function () {
    this.appendValueInput("TITLE").setCheck("String").appendField("title");
    this.appendValueInput("TEXT").setCheck("String").appendField("text");
    this.appendValueInput("IMAGE").setCheck("String").appendField("image");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Creates a notification");
    this.setHelpUrl("");
  },
};


Blockly.JavaScript["get_player"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "ovoModApi.game.getPlayer()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["get_player"] = {
    init: function () {
      this.appendDummyInput().appendField("get player");
      this.setOutput(true, ["undefined", "object"]);
      this.setColour(0);
      this.setTooltip("Gets the player collider");
      this.setHelpUrl("");
    },
  };
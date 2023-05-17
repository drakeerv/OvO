Blockly.JavaScript["convert_angle"] = function (block) {
  const dropdownType = block.getFieldValue("TYPE");
  const valueAngle = Blockly.JavaScript.valueToCode(
    block,
    "ANGLE",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `${dropdownType}(${valueAngle})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["convert_angle"] = {
  init: function () {
    this.appendValueInput("ANGLE").setCheck("Number").appendField("convert angle");
    this.appendDummyInput().appendField("to").appendField(new Blockly.FieldDropdown([["degree", "cr.to_degrees"], ["radian", "cr.to_radians"]]), "TYPE");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Converts angle to degree or radian");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["on_start"] = function (block) {
  const statementsDo = Blockly.JavaScript.statementToCode(block, "DO");

  const code = `(function () {
${statementsDo}
})();
`
  return code;
};

Blockly.Blocks["on_start"] = {
  init: function () {
    this.appendStatementInput("DO").appendField("on start do");
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(0);
    this.setTooltip("Runs a function on start");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["on_tick"] = function (block) {
  const statementsDo = Blockly.JavaScript.statementToCode(block, "DO").replace(/\s+$/gm, '');

  const code = `ovoModAPI.game.tick(function () {
${statementsDo}
});
`
  return code;
};

Blockly.Blocks["on_tick"] = {
  init: function () {
    this.appendStatementInput("DO").appendField("on tick do");
    this.setColour(0);
    this.setTooltip("Ticks a function");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["game_value"] = function (block) {
  const dropdownValue = block.getFieldValue("VALUE");

  const code = `ovoModAPI.game.runtime.${dropdownValue}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["game_value"] = {
  init: function () {
    this.appendDummyInput().appendField("get game value").appendField(new Blockly.FieldDropdown([["Tick Count", "tickcount"], ["FPS", "fps"], ["Frame Count", "framecount"], ["Delta Time", "dt"], ["Width", "width"], ["Height", "height"]]), "VALUE");
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Returns the current game value for the selected value");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["notification"] = function (block) {
  const valueTitle = Blockly.JavaScript.valueToCode(
    block,
    "TITLE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueText = Blockly.JavaScript.valueToCode(
    block,
    "MESSAGE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueImage = Blockly.JavaScript.valueToCode(
    block,
    "IMAGE",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.notify(${valueTitle}, ${valueText}, ${valueImage});\n`;
  return code;
};

Blockly.Blocks["notification"] = {
  init: function () {
    this.appendValueInput("TITLE").setCheck("String").appendField("create notification with title");
    this.appendValueInput("MESSAGE").setCheck("String").appendField("message");
    this.appendValueInput("IMAGE").setCheck("String").appendField("image");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Creates a notification");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["get_sprite_instance"] = function (block) {
  const dropdownSprite = block.getFieldValue("SPRITE");
  
  const functions = {
    "player": "getPlayer",
    "flag": "getFlag",
    "coin": "getCoin",
  };

  const code = `ovoModAPI.game.${functions[dropdownSprite]}()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_sprite_instance"] = {
  init: function () {
    this.appendDummyInput().appendField("get sprite instance").appendField(new Blockly.FieldDropdown([["Player", "player"], ["Flag", "flag"], ["Coin", "coin"]]), "SPRITE");
    this.setOutput(true, ["undefined", "Instance"]);
    this.setColour(0);
    this.setTooltip("Gets the sprite instance");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["get_layout"] = function (block) {
  const code = "ovoModAPI.game.getLayout()";
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_layout"] = {
  init: function () {
    this.appendDummyInput().appendField("get layout");
    this.setOutput(true, ["undefined", "Layout"]);
    this.setColour(0);
    this.setTooltip("Gets the layout");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["set_layout"] = function (block) {
  const valueLayout = Blockly.JavaScript.valueToCode(block, "LAYOUT", Blockly.JavaScript.ORDER_ATOMIC);
  const code = `ovoModAPI.game.setLayout(${valueLayout});\n`;
  return code;
}

Blockly.Blocks["set_layout"] = {
  init: function () {
    this.appendValueInput("LAYOUT").setCheck("Layout").appendField("set layout");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Sets the layout");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["get_layer"] = function (block) {
  const valueLayerName = Blockly.JavaScript.valueToCode(
    block,
    "LAYER",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.getLayer(${valueLayerName})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_layer"] = {
  init: function () {
    this.appendValueInput("LAYER").setCheck("String").appendField("get layer");
    this.setInputsInline(true);
    this.setOutput(true, ["undefined", "Layer"]);
    this.setColour(0);
    this.setTooltip("Gets the layer");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["layer_scale"] = function (block) {
  const valueLayer = Blockly.JavaScript.valueToCode(
    block,
    "LAYER",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueScale = Blockly.JavaScript.valueToCode(
    block,
    "SCALE",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.layerScale(${valueLayer}, ${valueScale});\n`;
  return code;
}

Blockly.Blocks["layer_scale"] = {
  init: function () {
    this.appendValueInput("LAYER").setCheck("Layer").appendField("scale layer");
    this.appendValueInput("SCALE").setCheck("Number").appendField("by");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Scales the layer");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["get_instance_property"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const dropdownProperty = block.getFieldValue("PROPERTY");

  const code = `${valueInstance}.${dropdownProperty}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_instance_property"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("get instance location");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["X", "x"], ["Y", "y"], ["Z", "z"], ["Angle", "angle"], ["Width", "width"], ["Height", "height"], ["Depth", "depth"], ["Opacity", "opacity"], ["UID", "uid"], ["PUID", "puid"]]), "PROPERTY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Gets the instance location property");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["move_instance"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueX = Blockly.JavaScript.valueToCode(
    block,
    "X",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueY = Blockly.JavaScript.valueToCode(
    block,
    "Y",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.moveInstance(${valueInstance}, ${valueX}, ${valueY});\n`;
  return code;
}

Blockly.Blocks["move_instance"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("move instance");
    this.appendValueInput("X").setCheck("Number").appendField("to x");
    this.appendValueInput("Y").setCheck("Number").appendField("y");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Moves the instance");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["rotate_instance"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueAngle = Blockly.JavaScript.valueToCode(
    block,
    "ANGLE",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.rotateInstance(${valueInstance}, ${valueAngle});\n`;
  return code;
}

Blockly.Blocks["rotate_instance"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("rotate instance");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("by");
    this.appendDummyInput().appendField("degrees");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Rotates the instance");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["resize_instance"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueWidth = Blockly.JavaScript.valueToCode(
    block,
    "WIDTH",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueHeight = Blockly.JavaScript.valueToCode(
    block,
    "HEIGHT",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.resizeInstance(${valueInstance}, ${valueWidth}, ${valueHeight});\n`;
  return code;
}

Blockly.Blocks["resize_instance"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("resize instance");
    this.appendValueInput("WIDTH").setCheck("Number").appendField("width");
    this.appendValueInput("HEIGHT").setCheck("Number").appendField("height");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Resizes the instance");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["instance_opacity"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueOpacity = Blockly.JavaScript.valueToCode(
    block,
    "OPACITY",
    Blockly.JavaScript.ORDER_ATOMIC
  ) / 100;

  const code = `ovoModAPI.game.instanceOpacity(${valueInstance}, ${valueOpacity});\n`;
  return code;
}

Blockly.Blocks["instance_opacity"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("set opacity of instance");
    this.appendValueInput("OPACITY").setCheck("Number").appendField("to");
    this.appendDummyInput().appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Sets the opacity of the instance");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["instance_destroy"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.destroyInstance(${valueInstance});\n`;
  return code;
}

Blockly.Blocks["instance_destroy"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("destroy instance");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Destroys the instance");
    this.setHelpUrl("");
  }
}

// takes  in instance and does nothing
Blockly.JavaScript["ignore_instance"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `${valueInstance};\n`;
  return code;
}

Blockly.Blocks["ignore_instance"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("ignore instance");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Ignores the instance");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["create_solid"] = function (block) {
  const valueX = Blockly.JavaScript.valueToCode(
    block,
    "X",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueY = Blockly.JavaScript.valueToCode(
    block,
    "Y",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueWidth = Blockly.JavaScript.valueToCode(
    block,
    "WIDTH",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueHeight = Blockly.JavaScript.valueToCode(
    block,
    "HEIGHT",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueAngle = Blockly.JavaScript.valueToCode(
    block,
    "ANGLE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueLayer = Blockly.JavaScript.valueToCode(
    block,
    "LAYER",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.createSolid(${valueX}, ${valueY}, ${valueWidth}, ${valueHeight}, ${valueAngle}, ${valueLayer})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["create_solid"] = {
  init: function () {
    this.appendValueInput("X").setCheck("Number").appendField("create solid at x");
    this.appendValueInput("Y").setCheck("Number").appendField("y");
    this.appendValueInput("WIDTH").setCheck("Number").appendField("width");
    this.appendValueInput("HEIGHT").setCheck("Number").appendField("height");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("angle");
    this.appendValueInput("LAYER").setCheck("Layer").appendField("layer");
    this.setOutput(true, "Instance");
    this.setColour(0);
    this.setTooltip("Creates a solid");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["create_sprite"] = function (block) {
  const valueX = Blockly.JavaScript.valueToCode(
    block,
    "X",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueY = Blockly.JavaScript.valueToCode(
    block,
    "Y",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueWidth = Blockly.JavaScript.valueToCode(
    block,
    "WIDTH",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueHeight = Blockly.JavaScript.valueToCode(
    block,
    "HEIGHT",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueAngle = Blockly.JavaScript.valueToCode(
    block,
    "ANGLE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueSpriteName = Blockly.JavaScript.valueToCode(
    block,
    "SPRITE_NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const valueLayer = Blockly.JavaScript.valueToCode(
    block,
    "LAYER",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.game.createSprite(${valueX}, ${valueY}, ${valueWidth}, ${valueHeight}, ${valueAngle}, ${valueSpriteName}, ${valueLayer})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["create_sprite"] = {
  init: function () {
    this.appendValueInput("X").setCheck("Number").appendField("create sprite at x");
    this.appendValueInput("Y").setCheck("Number").appendField("y");
    this.appendValueInput("WIDTH").setCheck("Number").appendField("width");
    this.appendValueInput("HEIGHT").setCheck("Number").appendField("height");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("angle");
    this.appendValueInput("SPRITE_NAME").setCheck("String").appendField("sprite name");
    this.appendValueInput("LAYER").setCheck("Layer").appendField("layer");
    this.setOutput(true, "Instance");
    this.setColour(0);
    this.setTooltip("Creates a sprite");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["get_game_states"] = function (block) {
  const dropdownCondition = block.getFieldValue("CONDITION");

  const code = `ovoModAPI.game.${dropdownCondition}()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_game_states"] = {
  init: function () {
    this.appendDummyInput().appendField("Is").appendField(new Blockly.FieldDropdown([["In Level", "isInLevel"], ["Paused", "isPaused"]]), "CONDITION");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(0);
    this.setTooltip("Checks game states");
    this.setHelpUrl("");
  }
}
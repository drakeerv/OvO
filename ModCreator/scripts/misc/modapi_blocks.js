Blockly.JavaScript["deg_to_rad"] = function (block) {
  const valueDegree = Blockly.JavaScript.valueToCode(
    block,
    "DEGREE",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.math.degToRad(${valueDegree})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["deg_to_rad"] = {
  init: function () {
    this.appendValueInput("DEGREE").setCheck("Number").appendField("convert degree");
    this.appendDummyInput().appendField("to radian");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Converts degree to radian");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["rad_to_deg"] = function (block) {
  const valueRadian = Blockly.JavaScript.valueToCode(
    block,
    "RADIAN",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const code = `ovoModAPI.math.radToDeg(${valueRadian})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["rad_to_deg"] = {
  init: function () {
    this.appendValueInput("RADIAN").setCheck("Number").appendField("convert radian");
    this.appendDummyInput().appendField("to degree");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Converts radian to degree");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["on_start"] = function (block) {
  const statementsDo = Blockly.JavaScript.statementToCode(block, "DO");

  const code = `(function () {
${statementsDo}
})();`
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

  const code = `ovoModAPI.game.tick(() => {
${statementsDo}
});`
  return code;
};

Blockly.Blocks["on_tick"] = {
  init: function () {
    this.appendStatementInput("DO").appendField("on tick do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("Ticks a function");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["tick_count"] = function (block) {
  const code = `ovoModAPI.game.getTickCount()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["tick_count"] = {
  init: function () {
    this.appendDummyInput().appendField("get tick count");
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Returns the current tick count");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["fps"] = function (block) {
  const code = `ovoModAPI.game.getFps()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["fps"] = {
  init: function () {
    this.appendDummyInput().appendField("get fps");
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Returns the current fps");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["frame_count"] = function (block) {
  const code = `ovoModAPI.game.getFrameCount()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["frame_count"] = {
  init: function () {
    this.appendDummyInput().appendField("get frame count");
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Returns the current frame count");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["delta_time"] = function (block) {
  const code = `ovoModAPI.game.getDeltaTime()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["delta_time"] = {
  init: function () {
    this.appendDummyInput().appendField("get delta time");
    this.setOutput(true, "Number");
    this.setColour(0);
    this.setTooltip("Returns the current delta time");
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


Blockly.JavaScript["get_player"] = function (block) {
  const code = "ovoModAPI.game.getPlayer()";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["get_player"] = {
  init: function () {
    this.appendDummyInput().appendField("get player");
    this.setOutput(true, ["undefined", "Instance"]);
    this.setColour(0);
    this.setTooltip("Gets the player collider");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["get_flag"] = function (block) {
  const code = "ovoModAPI.game.getFlag()";
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_flag"] = {
  init: function () {
    this.appendDummyInput().appendField("get flag");
    this.setOutput(true, ["undefined", "Instance"]);
    this.setColour(0);
    this.setTooltip("Gets the flag");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["get_coin"] = function (block) {
  const code = "ovoModAPI.game.getCoin()";
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_coin"] = {
  init: function () {
    this.appendDummyInput().appendField("get coin");
    this.setOutput(true, ["undefined", "Instance"]);
    this.setColour(0);
    this.setTooltip("Gets the coin");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["get_runtime"] = function (block) {
  const code = "ovoModAPI.game.runtime";
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_runtime"] = {
  init: function () {
    this.appendDummyInput().appendField("get runtime");
    this.setOutput(true, ["undefined", "Runtime"]);
    this.setColour(0);
    this.setTooltip("Gets the runtime");
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

// getInstanceLocation(instance) {
//   return {
//       x: instance.x,
//       y: instance.y,
//       z: instance.z,
//       rot: instance.angle,
//   };
// },
// one block with dropdown for x, y, z, rot
Blockly.JavaScript["get_instance_location_property"] = function (block) {
  const valueInstance = Blockly.JavaScript.valueToCode(
    block,
    "INSTANCE",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const dropdownProperty = block.getFieldValue("PROPERTY");

  const code = `ovoModAPI.game.getInstanceLocation(${valueInstance}).${dropdownProperty}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["get_instance_location_property"] = {
  init: function () {
    this.appendValueInput("INSTANCE").setCheck("Instance").appendField("get instance");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["X", "x"], ["Y", "y"], ["Z", "z"], ["Rot", "rot"]]), "PROPERTY");
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

Blockly.JavaScript["is_in_level"] = function (block) {
  const code = `ovoModAPI.game.isInLevel()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["is_in_level"] = {
  init: function () {
    this.appendDummyInput().appendField("is in level");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(0);
    this.setTooltip("Checks if the instance is in the level");
    this.setHelpUrl("");
  }
}

Blockly.JavaScript["is_paused"] = function (block) {
  const code = `ovoModAPI.game.isPaused()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks["is_paused"] = {
  init: function () {
    this.appendDummyInput().appendField("is paused");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(0);
    this.setTooltip("Checks if the game is paused");
    this.setHelpUrl("");
  }
}
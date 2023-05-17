Blockly.JavaScript["load_mod"] = function (block) {
    const modURL = Blockly.JavaScript.valueToCode(block, "MOD_URL", Blockly.JavaScript.ORDER_ATOMIC);
    const modLocal = Blockly.JavaScript.valueToCode(block, "MOD_LOCAL", Blockly.JavaScript.ORDER_ATOMIC);
    const modNotify = Blockly.JavaScript.valueToCode(block, "MOD_NOTIFY", Blockly.JavaScript.ORDER_ATOMIC);

    const code = `ovoModLoader.loadModURL(${modURL}, ${modLocal}, ${modNotify});\n`;
    return code;
}

Blockly.Blocks["load_mod"] = {
    init: function () {
        this.appendValueInput("MOD_URL").setCheck("String").appendField("load mod");
        this.appendValueInput("MOD_LOCAL").setCheck("Boolean").appendField("local");
        this.appendValueInput("MOD_NOTIFY").setCheck("Boolean").appendField("notify");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Loads a mod from URL");
        this.setHelpUrl("");
    }
};
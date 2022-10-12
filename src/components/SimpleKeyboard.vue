<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    }
  },
  data: () => ({
    keyboard: null,
    oldIsShift: false
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        'default': [
          '% 1 2 3 4 5 6 7 8 9 0 _',
          '{tab} q w e r t y u i o p \\ {bksp}',
          '{lock} a s d f g h j k l ; \' [ ]',
          '{shift} z x c v b n m , . / {enter}',
          '{toggleCharNum} {toggleCharSymbol} {space} {toggleCharSymbol} {close}'
        ],
        'shift': [
          '% 1 2 3 4 5 6 7 8 9 0 _',
          '{tab} Q W E R T Y U I O P \\ {bksp}',
          '{lock} A S D F G H J K L ; \' [ ]',
          '{shift} Z X C V B N M , . / {enter}',
          '{toggleCharNum} {toggleCharSymbol} {space} {toggleCharSymbol} {close}'
        ],
        'symbol': [
          '~ ! @ # $ % ^ &amp; * ( ) _ +',
          '{toggleCharSymbol} {toggleCharNum} {space}'
        ],
        'number': [
          '7 8 9 -',
          '4 5 6 +',
          '1 2 3 *',
          '{toggleCharNum} 0 . /',
        ]
      },
      display: {
        '{toggleCharNum}': 'Abc123'
      }
    });
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{toggleCharNum}') {
        this.toggleCharAndNum()
      }
      if (button === '{toggleCharSymbol}') {
        this.toggleCharAndSymbol()
      }
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    toggleCharAndNum () {
      let currentLayout = this.keyboard.options.layoutName;
      let layout = ['shift', 'default'].includes(currentLayout) ? "number" : this.oldIsShift ? 'shift' : "default";
      this.oldIsShift = currentLayout === 'shift'
      this.keyboard.setOptions({
          layoutName: layout
        });
    },
    toggleCharAndSymbol () {
      let currentLayout = this.keyboard.options.layoutName;
      let layout = ['shift', 'default'].includes(currentLayout) ? "symbol" : this.oldIsShift ? 'shift' : "default";
      this.oldIsShift = currentLayout === 'shift'
      this.keyboard.setOptions({
          layoutName: layout
        });
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

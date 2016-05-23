(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, function () { 'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = (function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();

    var _class$1 = (function () {
      function _class() {
        babelHelpers.classCallCheck(this, _class);

        this.reader = new FileReader();
      }

      babelHelpers.createClass(_class, [{
        key: "read",
        value: function read(file) {
          var _this = this;

          return new Promise(function (resolve, reject) {
            _this.reader.onload = function () {
              return resolve(new Uint8Array(_this.reader.result));
            };
            _this.reader.onerror = function (err) {
              return reject(err);
            };
            _this.reader.readAsArrayBuffer(file);
          });
        }
      }]);
      return _class;
    })();

    var _class$3 = (function () {
        function _class(ctx) {
            var scale = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];
            babelHelpers.classCallCheck(this, _class);

            this.rows = 32;
            this.columns = 64;
            this.resolution = this.rows * this.columns;
            this.bitMap = new Array(this.resolution);
            this.scale = scale;
            this.ctx = ctx;

            this.width = ctx.canvas.width = this.columns * this.scale;
            this.height = ctx.canvas.height = this.rows * this.scale;
        }

        /**
         * Clear the bitMap.
         * @method clear
         */

        babelHelpers.createClass(_class, [{
            key: 'clear',
            value: function clear() {
                this.bitMap = new Array(this.resolution);
            }

            /**
             * @method setPixel
             * @param {Integer} x the starting x coordinate of the pixel
             * @param {Integer} y the starting y coordinate of the pixel
             */

        }, {
            key: 'setPixel',
            value: function setPixel(x, y) {
                // Wrap around pixels that overflow the screen
                if (x > this.columns - 1) while (x > this.columns - 1) {
                    x -= this.columns;
                }if (x < 0) while (x < 0) {
                    x += this.columns;
                }if (y > this.rows - 1) while (y > this.rows - 1) {
                    y -= this.rows;
                }if (y < 0) while (y < 0) {
                    y += this.rows;
                }var location = x + y * this.columns;
                this.bitMap[location] = this.bitMap[location] ^ 1;

                return !this.bitMap[location];
            }
        }, {
            key: 'render',
            value: function render() {
                var i, x, y;

                var ascii = '';

                for (var _i = 0; _i < this.rows; _i++) {
                    for (var j = 0; j < this.columns; j++) {
                        if (this.bitMap[j + _i * 64]) {
                            ascii += '😍';
                        } else {
                            ascii += '⬛️';
                        }
                    }
                    ascii += '\n';
                }
                emojiScreen.innerText = ascii;
                this.ctx.clearRect(0, 0, this.width, this.height);

                for (i = 0; i < this.resolution; i++) {
                    x = i % this.columns * this.scale;
                    y = Math.floor(i / this.columns) * this.scale;

                    if (!this.bitMap[i]) {
                        this.ctx.fillStyle = "#000";
                        this.ctx.fillRect(x, y, this.scale, this.scale);
                    }
                }
            }
        }]);
        return _class;
    })();

    var _class$4 = (function () {
      function _class() {
        var _this = this;

        babelHelpers.classCallCheck(this, _class);

        this.keysPressed = [];
        this.onNextKeyPress = function () {};
        window.addEventListener("keydown", function (e) {
          return _this.keyDown(e);
        }, false);
        window.addEventListener("keyup", function (e) {
          return _this.keyUp(e);
        }, false);
      }

      babelHelpers.createClass(_class, [{
        key: "clear",
        value: function clear() {
          this.keysPressed = [];
          this.onNextKeyPress = function () {};
        }
      }, {
        key: "isKeyPressed",
        value: function isKeyPressed(keyCode) {
          var key = MAPPING[keyCode];
          return !!this.keysPressed[key];
        }
      }, {
        key: "keyDown",
        value: function keyDown(event) {
          var key = String.fromCharCode(event.which);
          this.keysPressed[key] = true;

          for (var property in MAPPING) {
            var keyCode = MAPPING[property];
            if (keyCode == key) {
              try {
                this.onNextKeyPress(parseInt(property));
              } finally {
                this.onNextKeyPress = function () {};
              }
            }
          }
        }
      }, {
        key: "keyUp",
        value: function keyUp(event) {
          var key = String.fromCharCode(event.which);
          this.keysPressed[key] = false;
        }
      }]);
      return _class;
    })();

    var MAPPING = {
      0x1: "1",
      0x2: "2",
      0x3: "3",
      0xC: "4",
      0x4: "Q",
      0x5: "W",
      0x6: "E",
      0xD: "R",
      0x7: "A",
      0x8: "S",
      0x9: "D",
      0xE: "F",
      0xA: "Z",
      0x0: "X",
      0xB: "C",
      0xF: "V"
    };

    var _class$5 = (function () {
      function _class() {
        babelHelpers.classCallCheck(this, _class);

        this.context = new AudioContext();
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
      }

      babelHelpers.createClass(_class, [{
        key: 'play',
        value: function play() {
          this.oscillator = this.context.createOscillator();
          this.oscillator.frequency.value = 400;
          this.oscillator.type = 'square';
          this.oscillator.connect(this.gain);
          this.oscillator.start(0);
        }
      }, {
        key: 'stop',
        value: function stop() {
          if (this.oscillator) {
            this.oscillator.stop(0);
            this.oscillator.disconnect(0);
          }
          this.oscillator = null;
        }
      }, {
        key: 'clear',
        value: function clear() {
          this.stop();
        }
      }]);
      return _class;
    })();

    //let ctx = canvas.getContext('2d');

    var _class$2 = (function () {
      function _class() {
        babelHelpers.classCallCheck(this, _class);

        this.pc = 0x200;
        this.stack = new Array();
        this.screen = { clear: function clear() {}, setPixel: function setPixel() {}, render: function render() {} };
        this.input = new _class$4();
        this.speaker = { clear: function clear() {}, play: function play() {}, stop: function stop() {} };
        this.v = new Uint8Array(16);
        this.i = 0;
        this.memory = new Uint8Array(4096);
        this.delayTimer = 0;
        this.soundTimer = 0;
        this.paused = false;
        this.speed = 30;
      }

      babelHelpers.createClass(_class, [{
        key: 'loadFonts',
        value: function loadFonts() {
          var fonts = [0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
          0x20, 0x60, 0x20, 0x20, 0x70, // 1
          0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
          0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
          0x90, 0x90, 0xF0, 0x10, 0x10, // 4
          0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
          0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
          0xF0, 0x10, 0x20, 0x40, 0x40, // 7
          0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
          0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
          0xF0, 0x90, 0xF0, 0x90, 0x90, // A
          0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
          0xF0, 0x80, 0x80, 0x80, 0xF0, // C
          0xE0, 0x90, 0x90, 0x90, 0xE0, // D
          0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
          0xF0, 0x80, 0xF0, 0x80, 0x80 // F
          ];

          for (var i = 0, length = fonts.length; i < length; i++) {
            this.memory[i] = fonts[i];
          }
        }
      }, {
        key: 'reset',
        value: function reset() {
          this.pc = 0x200;
          this.stack = new Array();
          this.v = new Uint8Array(16);
          this.i = 0;
          this.memory = new Uint8Array(4096);
          this.delayTimer = 0;
          this.soundTimer = 0;
          this.screen.clear();
          this.input.clear();
          this.speaker.clear();
          this.loadFonts();
          this.paused = false;
        }
      }, {
        key: 'loadProgram',
        value: function loadProgram(program) {
          for (var i = 0, length = program.length; i < length; i++) {
            this.memory[0x200 + i] = program[i];
          }
        }
      }, {
        key: 'next',
        value: function next() {
          //          var slice = this.memory.slice(this.pc - 5, this.pc + 5);
          //          let aux = 5;
          //          let rows = [];
          //          for (let k = 0; k < slice.length; k++) {
          //            let data = slice[k];
          //            let addr = this.pc - aux--;
          //            let addClass = (addr === this.pc) || (addr === this.pc + 1);
          //            rows.push(`<tr class="${addClass ? "current": ""}"> <td> 0x${addr.toString(16).toUpperCase()} </td> <td> 0x${data.toString(16).toUpperCase()}</td></tr>`);
          //          }
          //
          //          memory.innerHTML = rows.join(' ');
          var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
          //          currentOpcode.innerText = `0x${opcode.toString(16).toUpperCase()}`;
          this.perform(opcode);
          this.updateTimers();
          this.playSound();
          this.render();
        }
      }, {
        key: 'cycle',
        value: function cycle() {
          for (var i = 0; i < this.speed; i++) {
            if (!this.paused) {
              //          var slice = this.memory.slice(this.pc - 5, this.pc + 5);
              //          let aux = 5;
              //          let rows = [];
              //          for (let k = 0; k < slice.length; k++) {
              //            let data = slice[k];
              //            let addr = this.pc - aux--;
              //            let addClass = (addr === this.pc) || (addr === this.pc + 1);
              //            rows.push(`<tr class="${addClass ? "current": ""}"> <td> 0x${addr.toString(16).toUpperCase()} </td> <td> 0x${data.toString(16).toUpperCase()}</td></tr>`);
              //          }
              //
              //          memory.innerHTML = rows.join(' ');
              var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
              //          currentOpcode.innerText = `0x${opcode.toString(16).toUpperCase()}`;
              this.perform(opcode);
            }
          }

          if (!this.paused) {
            this.updateTimers();
          }

          this.playSound();
          this.render();
        }
      }, {
        key: 'perform',
        value: function perform(opcode) {
          this.pc += 2;

          var x = (opcode & 0x0F00) >> 8;
          var y = (opcode & 0x00F0) >> 4;

          switch (opcode & 0xF000) {
            case 0x000:
              switch (opcode) {
                // 00E0 - CLS
                // Clear the display.
                case 0x00E0:
                  this.screen.clear();
                  break;

                // 00EE - RET
                // Return from a subroutine.
                // The interpreter sets the program counter to the address at the
                //   top of the stack, then subtracts 1 from the stack pointer.
                case 0x00EE:
                  this.pc = this.stack.pop();
                  break;
              }
              break;

            // 1nnn - JP addr
            // Jump to location nnn.
            // The interpreter sets the program counter to nnn.
            case 0x1000:
              this.pc = opcode & 0x0FFF;
              break;

            // 2nnn - CALL addr
            // Call subroutine at nnn.
            // The interpreter increments the stack pointer, then puts the current
            //   PC on the top of the stack. The PC is then set to nnn.
            case 0x2000:
              this.stack.push(this.pc);
              this.pc = opcode & 0x0FFF;
              break;

            // 3xkk - SE Vx, byte
            // Skip next instruction if Vx = kk.
            // The interpreter compares register Vx to kk, and if they are equal,
            //   increments the program counter by 2.
            case 0x3000:
              if (this.v[x] == (opcode & 0x00FF)) {
                this.pc += 2;
              }
              break;

            // 4xkk - SNE Vx, byte
            // Skip next instruction if Vx != kk.
            // The interpreter compares register Vx to kk, and if they are not
            //   equal, increments the program counter by 2.
            case 0x4000:
              if (this.v[x] != (opcode & 0x00FF)) {
                this.pc += 2;
              }
              break;

            // 5xy0 - SE Vx, Vy
            // Skip next instruction if Vx = Vy.
            // The interpreter compares register Vx to register Vy, and if they are
            //   equal, increments the program counter by 2.
            case 0x5000:
              if (this.v[x] == this.v[y]) {
                this.pc += 2;
              }
              break;

            // 6xkk - LD Vx, byte
            // Set Vx = kk.
            // The interpreter puts the value kk into register Vx.
            case 0x6000:
              this.v[x] = opcode & 0x00FF;
              break;

            // 7xkk - ADD Vx, byte
            // Set Vx = Vx + kk.
            // Adds the value kk to the value of register Vx, then stores the
            //   result in Vx.
            case 0x7000:
              this.v[x] += opcode & 0x00FF;
              break;

            case 0x8000:
              switch (opcode & 0x000F) {
                // 8xy0 - LD Vx, Vy
                // Set Vx = Vy.
                // Stores the value of register Vy in register Vx.
                case 0x0000:
                  this.v[x] = this.v[y];
                  break;

                // 8xy1 - OR Vx, Vy
                // Set Vx = Vx OR Vy.
                // Performs a bitwise OR on the values of Vx and Vy, then stores the
                //   result in Vx. A bitwise OR compares the corrseponding
                //   bits from two values, and if either bit is 1, then the same bit
                //   in the result is also 1. Otherwise, it is 0.
                case 0x0001:
                  this.v[x] = this.v[x] | this.v[y];
                  break;

                // 8xy2 - AND Vx, Vy
                // Set Vx = Vx AND Vy.
                // Performs a bitwise AND on the values of Vx and Vy, then stores
                //   the result in Vx. A bitwise AND compares the corrseponding
                //   bits from two values, and if both bits are 1, then the same
                //   bit in the result is also 1. Otherwise, it is 0.
                case 0x0002:
                  this.v[x] = this.v[x] & this.v[y];
                  break;

                // 8xy3 - XOR Vx, Vy
                // Set Vx = Vx XOR Vy.
                // Performs a bitwise exclusive OR on the values of Vx and Vy, then
                //   stores the result in Vx. An exclusive OR compares the
                //   corrseponding bits from two values, and if the bits are not
                //   both the same, then the corresponding bit in the result is set
                //   to 1. Otherwise, it is 0.
                case 0x0003:
                  this.v[x] = this.v[x] ^ this.v[y];
                  break;

                // 8xy4 - ADD Vx, Vy
                // Set Vx = Vx + Vy, set VF = carry.
                // The values of Vx and Vy are added together. If the result is
                //   greater than 8 bits (i.e., > 255,) VF is set to 1,
                //   otherwise 0. Only the lowest 8 bits of the result are kept,
                //   and stored in Vx.
                case 0x0004:
                  var sum = this.v[x] + this.v[y];

                  if (sum > 0xFF) {
                    this.v[0xF] = 1;
                  } else {
                    this.v[0xF] = 0;
                  }

                  this.v[x] = sum;
                  break;

                // 8xy5 - SUB Vx, Vy
                // Set Vx = Vx - Vy, set VF = NOT borrow.
                // If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is
                //   subtracted from Vx, and the results stored in Vx.
                case 0x0005:
                  if (this.v[x] > this.v[y]) {
                    this.v[0xF] = 1;
                  } else {
                    this.v[0xF] = 0;
                  }

                  this.v[x] = this.v[x] - this.v[y];
                  break;

                // 8xy6 - SHR Vx {, Vy}
                // Set Vx = Vx SHR 1.
                // If the least-significant bit of Vx is 1, then VF is set to 1,
                //   otherwise 0. Then Vx is divided by 2.
                case 0x0006:
                  this.v[0xF] = this.v[x] & 0x01;
                  this.v[x] = this.v[x] >> 1;
                  break;

                // 8xy7 - SUBN Vx, Vy
                // Set Vx = Vy - Vx, set VF = NOT borrow.
                // If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is
                //   subtracted from Vy, and the results stored in Vx.
                case 0x0007:
                  if (this.v[x] > this.v[y]) {
                    this.v[0xF] = 0;
                  } else {
                    this.v[0xF] = 1;
                  }

                  this.v[x] = this.v[y] - this.v[x];
                  break;

                // 8xyE - SHL Vx {, Vy}
                // Set Vx = Vx SHL 1.
                // If the most-significant bit of Vx is 1, then VF is set to 1,
                //   otherwise to 0. Then Vx is multiplied by 2.
                case 0x000E:
                  this.v[0xF] = this.v[x] & 0x80;
                  this.v[x] = this.v[x] << 1;
                  break;
              }
              break;

            // 9xy0 - SNE Vx, Vy
            // Skip next instruction if Vx != Vy.
            // The values of Vx and Vy are compared, and if they are not equal, the
            //   program counter is increased by 2.
            case 0x9000:
              if (this.v[x] != this.v[y]) this.pc += 2;
              break;

            // Annn - LD I, addr
            // Set I = nnn.
            // The value of register I is set to nnn.
            case 0xA000:
              this.i = opcode & 0x0FFF;
              break;

            // Bnnn - JP V0, addr
            // Jump to location nnn + V0.
            // The program counter is set to nnn plus the value of V0.
            case 0xB000:
              this.pc = (opcode & 0x0FFF) + this.v[0];
              break;

            // Cxkk - RND Vx, byte
            // Set Vx = random byte AND kk.
            // The interpreter generates a random number from 0 to 255, which is
            //   then ANDed with the value kk. The results are stored in Vx. See
            //   instruction 8xy2 for more information on AND.
            case 0xC000:
              this.v[x] = Math.floor(Math.random() * 0xFF) & (opcode & 0x00FF);
              break;

            // Dxyn - DRW Vx, Vy, nibble
            // Display n-byte sprite starting at memory location I at (Vx, Vy),
            //   set VF = collision.
            case 0xD000:
              var row,
                  col,
                  sprite,
                  width = 8,
                  height = opcode & 0x000F;

              this.v[0xF] = 0;

              for (row = 0; row < height; row++) {
                sprite = this.memory[this.i + row];

                for (col = 0; col < width; col++) {
                  if ((sprite & 0x80) > 0) {
                    if (this.screen.setPixel(this.v[x] + col, this.v[y] + row)) {
                      this.v[0xF] = 1;
                    }
                  }

                  sprite = sprite << 1;
                }
              }

              break;

            case 0xE000:
              switch (opcode & 0x00FF) {
                // Ex9E - SKP Vx
                // Skip next instruction if key with the value of Vx is pressed.
                case 0x009E:
                  if (this.input.isKeyPressed(this.v[x])) {
                    this.pc += 2;
                  }
                  break;

                // ExA1 - SKNP Vx
                // Skip next instruction if key with the value of Vx is not pressed.
                case 0x00A1:
                  if (!this.input.isKeyPressed(this.v[x])) {
                    this.pc += 2;
                  }
                  break;
              }
              break;

            case 0xF000:
              switch (opcode & 0x00FF) {
                // Fx07 - LD Vx, DT
                // Set Vx = delay timer value.
                case 0x0007:
                  this.v[x] = this.delayTimer;
                  break;

                // Fx0A - LD Vx, K
                // Wait for a key press, store the value of the key in Vx.
                case 0x000A:
                  this.paused = true;

                  this.input.onNextKeyPress = (function (key) {
                    this.v[x] = key;
                    this.paused = false;
                  }).bind(this);

                // Fx15 - LD DT, Vx
                // Set delay timer = Vx.
                case 0x0015:
                  this.delayTimer = this.v[x];
                  break;

                // Fx18 - LD ST, Vx
                // Set sound timer = Vx.
                case 0x0018:
                  this.soundTimer = this.v[x];
                  break;

                // Fx29 - LD F, Vx
                // Set I = location of sprite for digit Vx.
                case 0x0029:
                  this.i = this.v[x] * 5;
                  break;

                // Fx33 - LD B, Vx
                // Store BCD representation of Vx in memory locations I,
                //   I+1, and I+2.
                case 0x0033:
                  this.memory[this.i] = parseInt(this.v[x] / 100);
                  this.memory[this.i + 1] = parseInt(this.v[x] % 100 / 10);
                  this.memory[this.i + 2] = this.v[x] % 10;
                  break;

                // Fx55 - LD [I], Vx
                // Store registers V0 through Vx in memory starting at location I.
                case 0x0055:
                  for (var i = 0; i <= x; i++) {
                    this.memory[this.i + i] = this.v[i];
                  }
                  break;

                // Fx65 - LD Vx, [I]
                // Read registers V0 through Vx from memory starting at location I.
                case 0x0065:
                  for (var i = 0; i <= x; i++) {
                    this.v[i] = this.memory[this.i + i];
                  }
                  break;

                // Fx1E - ADD I, Vx
                // Set I = I + Vx.
                case 0x001E:
                  this.i += this.v[x];
                  break;
              }

              break;

            default:
              throw new Error("Unknow opcode " + opcode.toString(16) + " informed.");
          }
        }
      }, {
        key: 'render',
        value: function render() {
          this.screen.render();
        }
      }, {
        key: 'playSound',
        value: function playSound() {
          if (this.soundTimer > 0) {
            this.speaker.play();
          } else {
            this.speaker.stop();
          }
        }

        /**
         * Updates the CPU delay and sound timers.
         * More info at: http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#2.5
         * @method updateTimers
         */

      }, {
        key: 'updateTimers',
        value: function updateTimers() {
          if (this.delayTimer > 0) this.delayTimer -= 1;
          if (this.soundTimer > 0) this.soundTimer -= 1;
        }
      }]);
      return _class;
    })();

    var fontset = [0xF0, 0x90, 0x90, 0x90, 0xF0, 0x20, 0x60, 0x20, 0x20, 0x70, 0xF0, 0x10, 0xF0, 0x80, 0xF0, 0xF0, 0x10, 0xF0, 0x10, 0xF0, 0x90, 0x90, 0xF0, 0x10, 0x10, 0xF0, 0x80, 0xF0, 0x10, 0xF0, 0xF0, 0x80, 0xF0, 0x90, 0xF0, 0xF0, 0x10, 0x20, 0x40, 0x40, 0xF0, 0x90, 0xF0, 0x90, 0xF0, 0xF0, 0x90, 0xF0, 0x10, 0xF0, 0xF0, 0x90, 0xF0, 0x90, 0x90, 0xE0, 0x90, 0xE0, 0x90, 0xE0, 0xF0, 0x80, 0x80, 0x80, 0xF0, 0xE0, 0x90, 0x90, 0x90, 0xE0, 0xF0, 0x80, 0xF0, 0x80, 0xF0, 0xF0, 0x80, 0xF0, 0x80, 0x80];

    var _class = (function () {
      function _class() {
        babelHelpers.classCallCheck(this, _class);

        this.loop = null;
        this.counter = 0;
        this.cpu = new _class$2();
        this.screen = { clear: function clear() {}, setPixel: function setPixel() {}, render: function render() {} };
        this.reader = new _class$1();
      }

      babelHelpers.createClass(_class, [{
        key: 'step',
        value: function step() {
          var _this = this;

          this.cpu.cycle();
          this.loop = requestAnimationFrame(function () {
            return _this.step();
          });
        }

        /**
         * Start the emulator main loop.
         * @method start
         */

      }, {
        key: 'start',
        value: function start() {
          var _this2 = this;

          this.loop = requestAnimationFrame(function () {
            return _this2.step();
          });
        }
      }, {
        key: 'loadRom',
        value: function loadRom(rom) {
          this.cpu.loadProgram(rom);
          this.cpu.screen = this.screen;
          this.start();
        }

        /**
         * Stop the emulator main loop.
         * @method stop
         */

      }, {
        key: 'stop',
        value: function stop() {
          cancelAnimationFrame(loop);
        }
      }]);
      return _class;
    })();

    var OldChip = (function () {
      function OldChip(screen) {
        babelHelpers.classCallCheck(this, OldChip);

        this.I = 0;
        this.screen = screen;
        this.sp = 0;
        this.pc = 0x200;
        this.opCode = 0;
        this.memory = new Uint8Array(4096);
        this.registers = new Uint8Array(16);
        this.display = new Uint8Array(64 * 32);
        this.stack = new Uint8Array(16);
        this.reader = new _class$1();
        this.loadFontset();
      }

      babelHelpers.createClass(OldChip, [{
        key: 'loadFontset',
        value: function loadFontset() {
          console.log('font size', fontset.length);
          for (var i = 0; i < fontset.length; i++) {
            this.memory[i] = fontset[i];
          }
        }
      }, {
        key: 'start',
        value: function start(file) {
          var _this3 = this;

          return this.reader.read(file).then(function (rom) {
            return _this3.loadRomInMemory(rom);
          }).then(function () {
            return _this3.emulate();
          });
        }
      }, {
        key: 'loadRomInMemory',
        value: function loadRomInMemory(rom) {
          var _this4 = this;

          rom.forEach(function (byte) {
            _this4.memory[_this4.pc++] = byte;
          });
          this.pc = 0x200;
        }
      }, {
        key: 'fetchOpcode',
        value: function fetchOpcode() {
          return this.memory[this.pc] << 8 | this.memory[this.pc + 1];
        }
      }, {
        key: 'emulate',
        value: function emulate() {
          var _this5 = this;

          var tick = function tick() {
            var opcode = _this5.fetchOpcode();
            _this5.executeOpcode(opcode);
            requestAnimationFrame(tick);
          };

          tick();
        }
      }, {
        key: 'executeOpcode',
        value: function executeOpcode(opcode) {
          switch (opcode & 0xF000) {
            case 0x0000:
              this.op0xxx(opcode);break;
            case 0x1000:
              this.op1xxx(opcode);break;
            case 0x2000:
              this.op2xxx(opcode);break;
            case 0x3000:
              this.op3xxx(opcode);break;
            case 0x4000:
              this.op4xxx(opcode);break;
            case 0x5000:
              this.op5xxx(opcode);break;
            case 0x6000:
              this.op6xxx(opcode);break;
            case 0x7000:
              this.op7xxx(opcode);break;
            case 0x8000:
              this.op8xxx(opcode);break;
            case 0x9000:
              this.op9xxx(opcode);break;
            case 0xA000:
              this.opAxxx(opcode);break;
            case 0xB000:
              this.opBxxx(opcode);break;
            case 0xC000:
              this.opCxxx(opcode);break;
            case 0xD000:
              this.opDxxx(opcode);break;
            case 0xE000:
              this.opExxx(opcode);break;
            case 0xF000:
              this.opFxxx(opcode);break;
            default:
              console.warn('opcode not implemented', opcode, this.pc);
          }
        }
      }, {
        key: 'op0xxx',
        value: function op0xxx(opcode) {
          switch (opcode & 0x000F) {
            case 0x0000:
              this.display.fill(0);break;
            case 0x000E:
              this.pc = this.stack[--this.sp];break;
            default:
              console.warn('opcode not implemented', opcode, this.pc);
          }
          this.pc += 2;
        }
      }, {
        key: 'op1xxx',
        value: function op1xxx(opcode) {
          this.pc = opcode & 0x0FFF;
        }
      }, {
        key: 'op2xxx',
        value: function op2xxx(opcode) {
          this.stack[this.sp++] = this.pc;
          this.pc = opcode & 0x0FFF;
        }
      }, {
        key: 'op3xxx',
        value: function op3xxx(opcode) {
          if (this.registers[(opcode & 0x0F00) >> 8] === (opcode & 0x00FF)) {
            this.pc += 4;
          } else {
            this.pc += 2;
          }
        }
      }, {
        key: 'op4xxx',
        value: function op4xxx(opcode) {
          if (this.registers[(opcode & 0x0F00) >> 8] !== (opcode & 0x00FF)) {
            this.pc += 4;
          } else {
            this.pc += 2;
          }
        }
      }, {
        key: 'op5xxx',
        value: function op5xxx(opcode) {
          if (this.registers[(opcode & 0x0F00) >> 8] === (opcode & 0x00F0) >> 4) {
            this.pc += 4;
          } else {
            this.pc += 2;
          }
        }
      }, {
        key: 'op6xxx',
        value: function op6xxx(opcode) {
          this.registers[(opcode & 0x0F00) >> 8] = opcode & 0x00FF;
          this.pc += 2;
        }
      }, {
        key: 'op7xxx',
        value: function op7xxx(opcode) {
          this.registers[(opcode & 0x0F00) >> 8] += opcode & 0x00FF;
          this.pc += 2;
        }
      }, {
        key: 'op8xxx',
        value: function op8xxx(opcode) {
          switch (opcode & 0x000F) {
            case 0:
              this.registers[(opcode & 0x0F00) >> 8] = this.registers[(opcode & 0x00F0) >> 4];break;
            case 1:
              this.registers[(opcode & 0x0F00) >> 8] |= this.registers[(opcode & 0x00F0) >> 4];break;
            case 2:
              this.registers[(opcode & 0x0F00) >> 8] &= this.registers[(opcode & 0x00F0) >> 4];break;
            case 3:
              this.registers[(opcode & 0x0F00) >> 8] ^= this.registers[(opcode & 0x00F0) >> 4];break;
            case 4:
              this.registers[(opcode & 0x0F00) >> 8] += this.registers[(opcode & 0x00F0) >> 4];
              if (this.registers[(opcode & 0x0F00) >> 8] < this.registers[(opcode & 0x00F0) >> 4]) {
                this.registers[15] = 1;
              } else {
                this.registers[15] = 0;
              }
              break;
            case 5:
              if (this.registers[(opcode & 0x00F0) >> 4] > this.registers[(opcode & 0x0F00) >> 8]) {
                this.registers[15] = 0;
              } else {
                this.registers[15] = 1;
              }
              this.registers[(opcode & 0x0F00) >> 8] -= this.registers[(opcode & 0x00F0) >> 4];
              break;
            case 6:
              this.registers[15] = this.registers[(opcode & 0x0F00) >> 8] & 0x1;
              this.registers[(opcode & 0x0F00) >> 8] >>= 1;
              break;
            case 7:
              if (this.registers[(opcode & 0x0F00) >> 8] > this.registers[(opcode & 0x00F0) >> 4]) {
                this.registers[15] = 0;
              } else {
                this.registers[15] = 1;
              }
              this.registers[(opcode & 0x0F00) >> 8] = this.registers[(opcode & 0x00F0) >> 4] - this.registers[(opcode & 0x0F00) >> 8];
              break;
            case 0xE:
              this.registers[15] = this.registers[(opcode & 0x0F00) >> 8] >> 7;
              this.registers[(opcode & 0x0F00) >> 8] <<= 1;
              break;
            default:
              console.warn('opcode not implemented', opcode, this.pc);
          }
          this.pc += 2;
        }
      }, {
        key: 'op9xxx',
        value: function op9xxx(opcode) {
          if (this.registers[(opcode & 0x0F00) >> 8] !== this.registers[(opcode & 0x00F0) >> 4]) {
            this.pc += 4;
          } else {
            this.pc += 2;
          }
        }
      }, {
        key: 'opAxxx',
        value: function opAxxx(opcode) {
          this.I = opcode & 0x00FF;
          this.pc += 2;
        }
      }, {
        key: 'opBxxx',
        value: function opBxxx(opcode) {
          this.pc = (opcode & 0xFFF) + this.registers[0];
        }
      }, {
        key: 'opCxxx',
        value: function opCxxx(opcode) {
          this.registers[(opcode & 0x0F00) >> 8] = opcode & 0x00FF & parseInt(Math.random() * 100, 10);
          this.pc += 2;
        }
      }, {
        key: 'opDxxx',
        value: function opDxxx(opcode) {
          var from = this.I;
          var to = from + (opcode & 0x000F);
          var x = this.registers[(opcode & 0x0F00) >> 8];
          var y = this.registers[(opcode & 0x00F0) >> 4];
          var location = x + y * 64;
          this.display[location] ^= 1;
          // here we have some fucking drawing
          this.registers[15] = !this.display;
          this.screen.render(x, y, this.display);
          this.pc += 2;
        }
      }, {
        key: 'opExxx',
        value: function opExxx(opcode) {
          var value = this.registers[opcode & 0x000F];
          // keypad whatever += 2
          this.pc += 2;
        }
      }, {
        key: 'opFxxx',
        value: function opFxxx(opcode) {
          // another fucking complex op with timers keypress sounds and memory
          this.pc += 2;
        }
      }]);
      return OldChip;
    })();

    window.CHIP8 = _class;
    window.CanvasDisplay = _class$3;

    //canvas.height = 32;
    //canvas.width = 64;
    //let ctx = canvas.getContext('2d');
    //window.emulator = new CHIP8();
    //emulator.screen = new CanvasDisplay(ctx);
    //document.body.addEventListener('dragover', (e) => {
    //    e.stopPropagation();
    //    e.preventDefault();
    //}, false);
    //document.body.addEventListener('drop', (e) => {
    //    e.stopPropagation();
    //    e.preventDefault();
    //    let file = e.dataTransfer.files[0];
    //    emulator.loadRom(file);
    //}, false);

}));
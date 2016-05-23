import React, { Component } from "react";
import { Heading } from "spectacle";
import CHIP8 from "./chip8";

export default class Chip8Debugger extends Component {
  constructor() {
    super();
    this.chip8 = new window.CHIP8();
    window.chip8 = this.chip8;
    this.state = {
      started: false,
      emoji: false,
      organized: false,
      display: new Uint8Array(64 * 32),
      pc: 0x0,
      opcode: 0x0000,
    }
  }


  startEmulation() {
		var request = new XMLHttpRequest();
		request.onload = () => {
			if (request.response) {
        let original = this.chip8.cpu.cycle.bind(this.chip8.cpu);
        this.chip8.cpu.cycle = () => {
          let currentPc = this.chip8.cpu.pc;
          let opcode = this.chip8.cpu.memory[currentPc] << 8 | this.chip8.cpu.memory[currentPc + 1];
          let display = this.chip8.cpu.screen.bitMap;
          this.setState({pc: currentPc, opcode: opcode || 0x00, display: display, started: true});
          original();
        }
        this.chip8.loadRom(new Uint8Array(request.response));
			}
		}
		request.open("GET", "assets/rom", true);
		request.responseType = "arraybuffer";
		request.send();
  }

  pauseEmulation() {
    this.chip8.cpu.paused = true;
  }

  resumeEmulation() {
    this.chip8.cpu.paused = false;
  }

  organize() {
    this.setState({organized: !this.state.organize, emoji: false});
  }

  emojis() {
    this.setState({emoji: !this.state.emoji, organized: false});
  }


  nextInstruction() {
    this.chip8.cpu.next();
  }

  render() {
    const styles = {
      padding: 10,
      background: "black",
      minWidth: '18%',
      marginTop: 20,
      marginRight: 5,
      textTransform: "uppercase",
      border: "none",
      color: "white",
      outline: "none",
      fontWeight: "bold",
      fontSize: "1em"
    };
    if (!this.state.started) {
      return (
          <button style={styles} type="button" onClick={this.startEmulation.bind(this)}>Start</button>
      )
    } else {
      let opStyle = {
        fontWeight: 'bold',
        fontSize: '.9em',
      }
      let aux = 5;
      let memory = this.state.memory;
      let display = this.state.display;
      let divStyle = {
        marginLeft: -6000,
      }

      let displays = [<div style={divStyle}> <p>{display}</p> </div>];

      let rows = [];
      let pixelStyle = undefined;
      if (this.state.emoji) {
        pixelStyle = {
          fontSize: '0.2em',
          width: '100%',
        };
      } else {
        pixelStyle = {
          fontSize: '0.4em',
          lineHeight: '10px',
          width: '100%',
        };
      }
      if(this.state.organized || this.state.emoji) {
				for (let i = 0; i < 32; i++) {
						for (let j = 0; j < 64; j++) {
              if(this.state.organized && !this.state.emoji) {
						   rows.push(<span>{display[j + (i * 64)] === 1 ? '1'  : '0'} </span>);
              } else {
						   rows.push(<span>{display[j + (i * 64)] === 1 ? '😍'  : '⬛️'} </span>);
						  }
						}
						rows.push(<br/>);
				}
      }

      return (
        <div>
          <button style={styles} type="button" onClick={this.pauseEmulation.bind(this)}>Pause</button>
          <button style={styles} type="button" onClick={this.resumeEmulation.bind(this)}>Resume</button>
          <button style={styles} type="button" onClick={this.nextInstruction.bind(this)}>Next</button>
          <button style={styles} type="button" onClick={this.organize.bind(this)}>Organize</button>
          <button style={styles} type="button" onClick={this.emojis.bind(this)}>Emojis</button>
          <p style={opStyle}>CURRENT OPCODE: 0x{this.state.opcode.toString(16).toUpperCase()}</p>
          {displays}
          <br />
          <div style={pixelStyle}>
          {rows}
          </div>
        </div>
      )
    }
  }
}

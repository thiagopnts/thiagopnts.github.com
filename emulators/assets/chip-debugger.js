import React, { Component } from "react";
import { Heading } from "spectacle";
import CHIP8 from "./chip8";
import $ from 'jquery'

export default class Chip8Debugger extends Component {
  constructor() {
    super();
    this.chip8 = new window.CHIP8();
    window.chip8 = this.chip8;
    this.state = {
      started: false,
      memory: new Uint8Array(10),
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
          let memory = this.chip8.cpu.memory.slice(currentPc - 5, currentPc + 5);
          this.setState({memory: memory, pc: currentPc, opcode: opcode || 0x00, started: true});
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

  nextInstruction() {
    this.chip8.cpu.next();
  }

  render() {
    const styles = {
      padding: 20,
      background: "black",
      minWidth: 300,
      marginTop: 20,
      marginRight: 5,
      textTransform: "uppercase",
      border: "none",
      color: "white",
      outline: "none",
      fontWeight: "bold",
      fontSize: "2em"
    };
    if (!this.state.started) {
      return (
          <button style={styles} type="button" onClick={this.startEmulation.bind(this)}>Start</button>
      )
    } else {
      let aux = 5;
      let memory = this.state.memory;
      let currentStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      };

      let tableStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid black',
        margin: '0 auto',
        fontSize: '.5em',
      }

      let tdStyle = {
        borderBottom: '1px solid black',
        borderLeft: '1px solid black',
        padding: '.5em 1em',
      }

      let opStyle = {
        fontWeight: 'bold',
        fontSize: '.9em',
      }

      let rows = [];
      for (var i = 0; i < memory.length; i++) {
        let addr = this.state.pc - aux--;
        let data = memory[i];
        let isCurrentInstruction = (this.state.pc === addr) || ((this.state.pc + 1) === addr);
        rows.push(
          <tr style={isCurrentInstruction ? currentStyle : []}>
            <td style={tdStyle}>{ '0x' + addr.toString(16).toUpperCase()}</td>
            <td style={tdStyle}>{'0x' + data.toString(16).toUpperCase()} </td>
          </tr>
        );
      }
      return (
        <div>
          <button style={styles} type="button" onClick={this.pauseEmulation.bind(this)}>Pause</button>
          <button style={styles} type="button" onClick={this.resumeEmulation.bind(this)}>Resume</button>
          <button style={styles} type="button" onClick={this.nextInstruction.bind(this)}>Next</button>
          <p style={opStyle}>CURRENT OPCODE: 0x{this.state.opcode.toString(16).toUpperCase()}</p>
          <table style={tableStyle}>
            <thead>
                <tr>
                  <th style={tdStyle}>Address</th>
                  <th style={tdStyle}>Data</th>
                </tr>
              </thead>
              <tbody >
              {rows}
              </tbody>
          </table>

        </div>
      )
    }
  }
}

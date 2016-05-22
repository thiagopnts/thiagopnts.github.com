// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  heart: require("../assets/heart.png"),
  logo: require("../assets/formidable-logo.svg"),
  bg: require("../assets/mario.png"),
  bg2: require("../assets/mario2.jpg"),
  markdown: require("../assets/markdown.png"),
  wizard: require("../assets/wizard.gif"),
  chip: require("../assets/chip.gif"),
  money: require("../assets/money.gif"),
  paper: require("../assets/paper.png"),
  how: require("../assets/how.png"),
  specs: require("../assets/specs.png"),
  chest: require("../assets/chest.png"),
  arrow: require("../assets/arrow.png"),
  background: require("../assets/background.png"),
  title: require("../assets/title.png"),
  invaders: require("../assets/invader.jpg"),
  end: require("../assets/end.gif"),
};

preloader(images);

const theme = createTheme({
  primary: "#000",
  secondary: "#ff4081",
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500} progress="pacman">
          <Slide transition={["zoom"]} bgImage={images.background} bgColor="primary" notes="I still need to put the other cover here">
            <Image src={images.title} top="30px" width="100%" height="100%" />
          </Slide>
          <Slide transition={["slide"]} bgImage={images.bg} notes="talk about why I love emulators">
            <Heading size={2} caps fit textColor="white" textFont="primary" >
            I
            <Image src={images.heart} display="inline block" margin="1% 0 0 0" height="15px" align="flex-end"/>
            emulators
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgImage={images.bg2}>

            <Heading size={2} caps fit textColor="white" textFont="primary" notes="">
            Emulation is magic
            </Heading>
            <Image src={images.wizard} top="30px" width="15%" />
          </Slide>

          <Slide transition={["slide"]} bgImage={images.bg2}>
            <Heading size={2} caps textColor="white" textFont="primary" >
            roms
            </Heading>
            <Image src={images.chip} top="30px" width="15%" />
          </Slide>

          <Slide transition={["slide"]} bgImage={images.bg2}>
            <Heading size={2} caps textColor="white" textFont="primary" >
            System Specs
            </Heading>
            <Image src={images.specs} top="30px" width="15%"/>
          </Slide>

          <Slide transition={["slide"]} bgImage={images.bg2}>
            <Heading size={2} caps textColor="white" textFont="primary" >
            how
            </Heading>
            <Image src={images.how} top="30px" width="20%" />
          </Slide>

          <Slide transition={["slide"]} bgImage={images.bg2}>
            <Heading size={2} caps textColor="white" textFont="primary" >
            javascript
            </Heading>
            <Image src={images.chest} top="30px" width="20%" />
          </Slide>

          <Slide transition={["slide"]} bgImage={images.bg2}>
            <Heading size={2} caps textColor="white" textFont="primary" >
            chip-8
            </Heading>
            <Image src={images.invaders} top="30px" width="20%" />
          </Slide>

          <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
            <Heading size={2} caps textColor="white" textFont="primary" >
            Chip-8 Specs
            </Heading>
            <List>
              <Appear><ListItem>16 8-bit Registers</ListItem></Appear>
              <Appear><ListItem>1 Address Register</ListItem></Appear>
              <Appear><ListItem>16 Bytes Stack</ListItem></Appear>
              <Appear><ListItem>64x32 Pixels Display</ListItem></Appear>
              <Appear><ListItem>Program Counter starting at 0x200</ListItem></Appear>
              <Appear><ListItem>4KB Memory</ListItem></Appear>
              <Appear><ListItem>35 OPCodes</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
                <Heading size={2} caps textColor="white" textFont="primary" >
                Chip-8 Specs
                </Heading>
                <CodePane
                lang="jsx"
                source={require("raw!../assets/deck.example")}
                margin="20px auto"
                />
            </Slide>
          <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
            <Heading size={2} caps textColor="white" textFont="primary" >
			Flow
            </Heading>
            <List>
              <ListItem>Load ROM in memory</ListItem>
                <List>
                    <ListItem>fetch opcode from memory</ListItem>
                    <ListItem>execute opcode</ListItem>
                    <ListItem>repeat
                    </ListItem>
                    <Image src={images.arrow} align="flex-end" width="290px" margin="-150px 0 50px 230px"/>
                </List>
            </List>
          </Slide>

          <Slide transition={["fade"]} bgColor="secondary" textColor="primary" >
            <Heading size={2} caps textColor="white" textFont="primary" >
            interactive stuff
            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgImage={images.end} textColor="primary" > </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

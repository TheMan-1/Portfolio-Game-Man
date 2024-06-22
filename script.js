let playerState = "idle"
const dropdown = document.getElementById("animations")
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value
})

const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = "Character Sheet.png"
const spritewidth = 80
// The sprite sheets width / by how many animations are left to right (the max)
const spriteHeight = 64.3
// The sprite sheets height / by how many animations are up and down (the max)

let gameFrame = 0
const staggerFrames = 7
const spriteAnimations = []
const animationStates = [
  {
    name: "idle",
    frames: 5,
  },
  {
    name: "walk",
    frames: 8,
  },
  {
    name: "run",
    frames: 8,
  },
  {
    name: "jump",
    frames: 4,
  },
  {
    name: "fall",
    frames: 4,
  },
  {
    name: "throw",
    frames: 6,
  },
  {
    name: "die",
    frames: 10,
  },
]
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spritewidth
    let positionY = index * spriteHeight
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames
})

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length
  let frameX = spritewidth * position
  let frameY = spriteAnimations[playerState].loc[position].y

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spritewidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  )

  gameFrame++
  requestAnimationFrame(animate)
}

animate()

# Un-Bee Leap-able: Bee Flat
My Second Entry for [Itch.io's Game Off 2019](https://itch.io/jam/game-off-2019).
My First Entry, [Un-Bee Leap-able](https://github.com/Bluzix/unbee-leapable) was
taking too long to complete. I didn't get very far learning Blender and Godot to
finish it before the end of the game jam.
## Idea
Since I can't make this a 3D Game in time for the Game Jam, I decided to make a
2D game like [Glide 4.0](https://www.youtube.com/watch?v=s8_ypI_C7nM "YouTube video").
I'll probably throw in some extra elements from [Paper Plane !!](https://play.google.com/store/apps/details?id=com.primitivefactory.paperplane "Google Play Store"),
which was a game that [Jedluz](https://github.com/jedulz) showed me.  I would
like to make a puzzle game like Glide, but also include the upgrades like in
Paper Plane.  The player will only have one life, but after the round, the
player can buy upgrades and try to fly to the end, again.
## Todo
- Draw world
  - ~~Have a world~~
  - Draw an interesting backdrop
- ~~Draw character~~
- ~~Character starts by taking a leap~~
- Have character move on key presses
  - ~~Upgrade: Increase Horizontal Movement Speed~~
- Character falls slowly to the ground
  - Upgrade: Fall Slower
  - Upgrade: One Small mid-air jump
- Camera Follows Player
  - ~~Stops if Character goes too far left~~
  - Stops if Character goes too far right (reaches goal)
  - ~~Camera stays center on Player~~
- ~~Character lands when it hits the floor~~
- Obstacle: Platform
  - Character lands when it hits the top
  - Character stops floating when it hits the bottom
- Obstacle: Upward Force
  - Geyser? Floor Fan?
  - It pushes the Character up
- Obstacle: Downward Force
  - Something like a Geyser?  Ceiling Fan?
  - It pushes the Character down, more than gravity would
- Obstacle: Bees
  - If the Character hits these, they fall to the ground or a Platform
  - Some just float up from the floor
  - Some fly in from the right; should only spawn when character is in range
  - Some rotate in a circle with other Bees
- Upgrade Shop
  - ~~Earn Cash after every landing~~
  - ~~Buy Upgrades~~
  - Buy Tools: refill after every landing
  - Buy Consumables: don't refill after every landing
- Tool: Smoke Pellet
  - Thrown horizontally from the Character
  - Explodes into smoke if it hits an Obstacle
  - Bees in the smoke will fall to the floor
- Goal
  - The furthest right of the "world"
  - Reach a Game Over screen
  - ~~Score gained at checkpoints~~
  - ~~Score subtracted when upgrades, tools, or consumables are purchased~~
  - High Score table

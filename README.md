# Santex battleship SERVER

## Local development

1. Install dependencies with `npm install`
2. Initialize the db with the test users with `node database/loadTestMongoData`
3. Run the server with `npm run dev`


### Dev Status

#### what IS working:
- Initial load of the Games Pool and My Games lists.
- New game button. With subscriptions, it is added to the list of My Own Games and the Games Pool of other users.
- Play button (in the Games Pool list): 1. Set my user as opponent of the game. 2. Redirect to the game page and initialize the boards (own board shows the boats)
- Shoot action (clic in a cell) mark the cell as sunk or failed.

#### what is NOT working: 
- Turns: to initialize the game I assign the turn to a player, but I do not work on the logic of change of turn after a Shoot. A player can make all the clics that he wants on the board.
- For some reason the boards are not well differentiated: I lack work in the logic of the own board and the opponent, added to the lack of work in the logic of turns, make a clic on the board of the opponent take it equal to the click on Own.
- Game ending: Do not work on it. Nor does the Surrender button work.
- Login: I do not work on the login. I have defined users only with ID and Name. The "session user" is hard-coded in the GetUser query, the GamesPool and MyGames components.
- Play button in the My Games list.

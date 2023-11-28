export default class GameEventsManager{

    onMatchFound: (opponentName: string) => void = () => {}

    setOnMatchFound(handler: (opponentName: string) => void){
        this.onMatchFound = handler
    }
}
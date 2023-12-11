import GameEventsManager from "../GameEventsManager"
import { Card, Suit } from "./Card"
import Deck from "./Deck"

export default class CardsManager {
    myCards: Card[]
    opponentPlayedCards: Card[]
    myPlayedCards: Card[]
    deck: Deck
    gameEventsManager: GameEventsManager
    constructor() {
        this.myCards = []
        this.opponentPlayedCards = []
        this.myPlayedCards = []
        this.deck = new Deck()
        this.gameEventsManager = GameEventsManager.getInstance()
    }

    public restart(): void {
        this.myCards = []
        this.opponentPlayedCards = []
        this.myPlayedCards = []
    }

    public giveCards(): Card[]{
        const hands = this.generateHands()
        this.myCards = hands[0]
        this.myPlayedCards = []
        this.opponentPlayedCards = []
        this.gameEventsManager.triggerOnGetCards(this.myCards)
        return hands[1]
    }

    public receiveCards(cards: Card[]): void {
        this.myCards = cards
        this.myPlayedCards = []
        this.opponentPlayedCards = []
        this.gameEventsManager.triggerOnGetCards(this.myCards)
    }

    public playOpponentCard(card: Card): void {
        this.opponentPlayedCards.push(card)
        const calcualtePointWinner = this.myPlayedCards.length === this.opponentPlayedCards.length
        if(calcualtePointWinner){
            this.gameEventsManager.triggerOnTrucoPointCalculation(this.amIWinner())
        }
        if(this.myPlayedCards.length === 1 && this.opponentPlayedCards.length === 1){
            this.gameEventsManager.triggerOnFinishEnvidoPhase()
        }
    }

    public playCard(playedCard: Card): void {
        this.myCards = this.myCards.filter(card => card !== playedCard)
        this.myPlayedCards.push(playedCard)
        const calcualtePointWinner = this.myPlayedCards.length === this.opponentPlayedCards.length
        if(calcualtePointWinner){
            this.gameEventsManager.triggerOnTrucoPointCalculation(this.amIWinner())
        }
        if(this.myPlayedCards.length === 1 && this.opponentPlayedCards.length === 1){
            this.gameEventsManager.triggerOnFinishEnvidoPhase()
        }
    }
    public getFirstCard(): Card {
        return this.myCards[0];
    }

    public getEnvidoPoints(): number{
        let points = 0;
        let minCard = 20;
        for(let suit  in Suit){
            let suitPoints = 0
            let sameCards = 0
            for(let card of this.myCards){
                if(card.suit === suit){
                    let cardPoints = card.number >= 10 ? 0 : card.number
                    suitPoints += cardPoints
                    if(cardPoints < minCard){
                        minCard = cardPoints
                    }
                    sameCards++
                }
            }
            if(sameCards >= 2){
                suitPoints += 20
                if(sameCards === 3){
                    suitPoints -= minCard
                }
            }
            points = Math.max(points, suitPoints)
        }
        return points
    }

    public amIWinner(): number {
        const myCard = this.getMyLastCard()
        const opponentCard = this.getOpponentLastCard()

        return myCard.power === opponentCard.power ? 0 : (myCard.power < opponentCard.power ? 1 : -1)
    }

    private getMyLastCard(): Card {
        return this.myPlayedCards[this.myPlayedCards.length - 1]
    }

    private getOpponentLastCard(): Card {
        return this.opponentPlayedCards[this.opponentPlayedCards.length - 1]
    }
    
    private generateHands(): Card[][] {
        const cards = this.deck.getRandomCards()
        const myCards = cards.slice(0, 3)
        const opponentCards = cards.slice(3, 6)
        return [myCards, opponentCards]
    }

    
}
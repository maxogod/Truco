export enum Suit {
    Espada = "Espada",
    Basto = "Basto",
    Oro = "Oro",
    Copa = "Copa",
    Back = "Back"
}

export class Card {
    number: number
    suit: Suit
    power: number
    constructor(number: number, suit: Suit, power: number) {
        this.number = number
        this.suit = suit
        this.power = power
    }
}

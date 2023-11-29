export enum Suit {
    Espada = "espada",
    Basto = "basto",
    Oro = "oro",
    Copa = "copa"
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

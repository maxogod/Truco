import { Card, Suit } from "./Card";

export default class Deck {
    private cards: Card[] = [
        new Card(1, Suit.Espada, 1),
        new Card(1, Suit.Basto, 2),
        new Card(1, Suit.Oro, 7),
        new Card(1, Suit.Copa, 7),
        new Card(2, Suit.Espada, 6),
        new Card(2, Suit.Basto, 6),
        new Card(2, Suit.Oro, 6),
        new Card(2, Suit.Copa, 6),
        new Card(3, Suit.Espada, 5),
        new Card(3, Suit.Basto, 5),
        new Card(3, Suit.Oro, 5),
        new Card(3, Suit.Copa, 5),
        new Card(4, Suit.Espada, 14),
        new Card(4, Suit.Basto, 14),
        new Card(4, Suit.Oro, 14),
        new Card(4, Suit.Copa, 14),
        new Card(5, Suit.Espada, 13),
        new Card(5, Suit.Basto, 13),
        new Card(5, Suit.Oro, 13),
        new Card(5, Suit.Copa, 13),
        new Card(6, Suit.Espada, 12),
        new Card(6, Suit.Basto, 12),
        new Card(6, Suit.Oro, 12),
        new Card(6, Suit.Copa, 12),
        new Card(7, Suit.Espada, 3),
        new Card(7, Suit.Basto, 11),
        new Card(7, Suit.Oro, 4),
        new Card(7, Suit.Copa, 11),
        new Card(10, Suit.Espada, 10),
        new Card(10, Suit.Basto, 10),
        new Card(10, Suit.Oro, 10),
        new Card(10, Suit.Copa, 10),
        new Card(11, Suit.Espada, 9),
        new Card(11, Suit.Basto, 9),
        new Card(11, Suit.Oro, 9),
        new Card(11, Suit.Copa, 9),
        new Card(12, Suit.Espada, 8),
        new Card(12, Suit.Basto, 8),
        new Card(12, Suit.Oro, 8),
        new Card(12, Suit.Copa, 8),
    ]

    public getRandomCards(): Card[] {
        const unnusedIndexes = Array.from({ length: 40 }, (_, i) => i)
        const generatedCards = []
        for(let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * unnusedIndexes.length)
            const index = unnusedIndexes.splice(randomIndex, 1)[0]
            generatedCards.push(this.cards[index])
        }
        return generatedCards
    }
}
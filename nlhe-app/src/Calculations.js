const createDeck = () => {
  let deck = [];

  for (let card = 2; card < 10; card++) {
    deck = deck.concat(card + 'S', card + 'D', card + 'C', card + 'H');
  }

  for (const card of ['T', 'J', 'Q', 'K', 'A']) {
    deck = deck.concat(card + 'S', card + 'D', card + 'C', card + 'H');
  }

  return deck;
}
  
const drawRandomCard = deck => deck.splice(Math.floor(Math.random() * deck.length), 1);
  
const dealHand = deck => [drawRandomCard(deck), drawRandomCard(deck)];
  
function* dealBoard(deck) {
  yield [drawRandomCard(deck), drawRandomCard(deck), drawRandomCard(deck)];
  yield [drawRandomCard(deck)];
  return [drawRandomCard(deck)];
}


export {createDeck, drawRandomCard, dealHand, dealBoard}
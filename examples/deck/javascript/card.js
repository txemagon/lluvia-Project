Card.names = { /* type of deck, number, language */
               es:{
                    10: { es: "sota",    en: "jack" },
                    11: { es: "caballo", en: "queen" },
                    12: { es: "rey",     en: "king" },
                     1: { es: "as",      en: "ace" }
                  },
               fr:{
                    11: { es: "jota",    en: "jack" },
                    12: { es: "dama",    en: "queen" },
                    13: { es: "rey",     en: "king" }, 
                     1: { es: "as",      en: "ace" }
                  },
           
             }

Card.suits = { 
  es:  [ 
         "oros, coins, denari", 
         "copas, cups, coppe", 
         "espadas, swords, spade", 
         "bastos, clubs, bastoni"
       ] ,
  fr: [
          "corazones, hearts, coeurs, ♥, ♡",
          "diamantes, carreaux, diamonds, tiles, ♦, ♢",
          "treboles, tréboles, clubs, trefles, trèfles, clovers, ♣, ♧",
          "picas, piques, spades, pikes, ♠, ♤"
        ]
  }

Card.ranges = { es: {min: 1, max: 12}, fr: {min:1, max:13} }

function Card(number,suit, type){
   type        = type || Card.guess_type(suit)
   this.type   = Card.validate_deck_type(type)
   this.suit   = Card.validate_suit(suit, type)
   this.number = Card.validate_number(number, type)
}

Card.guess_type = function(candidate){
  var guess = null
  Card.suits.self_keys().each( function(suit){
    Card.suits[suit].each( function(names){
      if (names.is_listing$U(candidate))
        guess = suit 
    })
  })
  
  return guess
}

Card.validate_deck_type = function(deck_type){
  deck_type = deck_type || "es"
  deck_type = deck_type.toLowerCase()
  if (deck_type != "es" && deck_type != "fr")
    throw "Invalid deck type [" + deck_type + "]. Only 'fr' or 'es' allowed."
  return deck_type
}

Card.validate_suit = function(candidate, deck_type){
  deck_type = Card.validate_deck_type(deck_type)
  var found = Card.suits[deck_type].inject( false, 
                                      function( suit, found ){
                                         return found || suit.is_listing$U(candidate)
                                      } ) 
  if (!found)
    throw "Invalid suit [" + candidate+ "] for deck type [" + deck_type + "]"

  return candidate.toLowerCase()
}

Card.validate_number = function(candidate, deck_type) {

  if (candidate < Card.ranges[deck_type].min || candidate > Card.ranges[deck_type].max)
    throw "Invalide card type [" + candidate + "] for [" + deck_type + "] deck type. Valid Range: (" + Card.ranges[deck_type].min + ", " + Card.ranges[deck_type].max + ")"

  return candidate
}

Card.prototype.name = function(lang){
  lang = lang || "es"
  return Card.names[this.type][this.number][lang] || this.number
}

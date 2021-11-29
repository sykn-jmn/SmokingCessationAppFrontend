import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  numberOfFlippedCards:any = {
    "value": 0
  }
  prevCardIndex!: number;
  matched: string[];
  currentRunningTimer:any;

  constructor() {
    this.matched = [];
    this.matched.push("Filler"); 
    console.log(this.matched);
  }

  resetCards(){
    this.matched = ["Filler"];
    this.shuffleCards();
    for(let i = 0; i < this.cards.length; i++){
      document.getElementById(""+i)?.classList.remove("highlighted");
    }
  }



  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  closeEverything(matched:string[], numberOfFlippedCards:any){
    var cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((card) => {
      if(!matched.includes(card.id)){
        card?.classList.remove("flipOpen");
      }
    });
    numberOfFlippedCards.value = 0;
  }

  // function flip(event){
  //   var element = event.currentTarget;
  //   if (element.className === "card") {
  //     if(element.style.transform == "rotateY(180deg)") {
  //       element.style.transform = "rotateY(0deg)";
  //     }
  //     else {
  //       element.style.transform = "rotateY(180deg)";
  //     }
  //   }
  // };

  isOpen(card:Element|null){
    return card?.classList.contains("flipOpen");
  }

  flipCard(id:number){
    var card = document.getElementById(id+"");
    if(this.isOpen(card)) {
      card?.classList.remove("flipOpen");
    }
    else {
      card?.classList.add("flipOpen");
    }
  }

  flip(id:number){
    if(this.prevCardIndex == id){
      return;
    }
    if(this.numberOfFlippedCards.value==2){
      this.closeEverything(this.matched,this.numberOfFlippedCards);
      clearTimeout(this.currentRunningTimer)
    }
    var card = document.getElementById(id+"");
    var firstChild = card?.firstElementChild;
    var lastChild = card?.lastElementChild; 
    this.flipCard(id);
    this.numberOfFlippedCards.value += 1;
    if(this.numberOfFlippedCards.value==1){
      this.prevCardIndex = id;
    }
    if(this.numberOfFlippedCards.value==2){
      if(this.cards[this.prevCardIndex].value==this.cards[id].value){
        this.matched.push(""+this.prevCardIndex);
        this.matched.push(""+id);
        document.getElementById(""+this.prevCardIndex)?.classList.add("highlighted");
        card?.classList.add("highlighted");
        if(this.matched.length == this.cards.length+1){
          this.resetCards()
        }
      }
      this.currentRunningTimer = setTimeout(this.closeEverything, 1000, this.matched, this.numberOfFlippedCards);
      // this.numberOfFlippedCards = 0;
    }
  }

  ngOnInit(): void {
    this.cards.push(new Card("apple"));
    this.cards.push(new Card("apple"));
    this.cards.push(new Card("alarm-fill"));
    this.cards.push(new Card("alarm-fill"));
    this.cards.push(new Card("archive-fill"));
    this.cards.push(new Card("archive-fill"));
    this.cards.push(new Card("backspace-fill"));
    this.cards.push(new Card("backspace-fill"));
    this.cards.push(new Card("bag-check-fill"));
    this.cards.push(new Card("bag-check-fill"));
    this.cards.push(new Card("basket-fill"));
    this.cards.push(new Card("basket-fill"));
    this.cards.push(new Card("bookmark-plus-fill"));
    this.cards.push(new Card("bookmark-plus-fill"));
    this.cards.push(new Card("bug-fill"));
    this.cards.push(new Card("bug-fill"));
    this.shuffleCards();
    // this.closeEverything(this.matched, this.numberOfFlippedCards);
    let timer = setTimeout(this.closeEverything, 2000, this.matched, this.numberOfFlippedCards);
  }

}

import {Page, NavController, NavParams} from 'ionic-angular';
import {Item} from "../../models/item";
import {ItemService} from "../../services/item";

@Page({
  templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
  selectedItem: Item;
  subject:String;
  expiry:number = 3600000;
  note:String;
  selectedTime: number;

  constructor(private nav: NavController, private navParams: NavParams, private itemService:ItemService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if(this.selectedItem){
      this.subject = this.selectedItem.title;
      this.note = this.selectedItem.note;
      this.selectedTime = +this.selectedItem.selectedTime;
    }
  }

  addItem(){
    if(this.selectedItem){
      this.selectedItem.title = this.subject;
      this.selectedItem.note = this.note;
      if(this.selectedItem.selectedTime != this.selectedTime){
          this.selectedItem.selectedTime = this.selectedTime;
          this.selectedItem.expiry = new Date().getTime() + this.selectedTime;
          console.log("Expiry time changed");
          if(!this.selectedItem.isPinned){
            if(this.itemService.timeOuts[this.selectedItem.id]){
              clearTimeout(this.itemService.timeOuts[this.selectedItem.id]);
            }
            this.itemService.watchItemExpiry([this.selectedItem]);
            console.log('cleared previous timeout and added new expiry');
          }
      }
      this.itemService.editItem(this.selectedItem.id,this.selectedItem);
    }else{
      let items = this.itemService.getItems();
      let item: Item = {
        id:items.length+1,
        title:this.subject,
        note:this.note,
        selectedTime:this.expiry,
        owner:"Shiva",
        ownerImg:"img/avatar2.png",
        postedOn:new Date().getTime(),
        isPinned:false,
        isHidden:false,
        expiry:new Date().getTime() + this.expiry
      };
      this.itemService.addItem(item);
    }
    this.nav.pop();
  }
}

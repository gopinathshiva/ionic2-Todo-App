import {Page,ActionSheet,NavController} from 'ionic-angular';
import {Item,ItemDatas} from '../../models/item';
import {ItemService} from '../../services/item';
import {ItemDetailsPage} from '../item-details/item-details';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

@Page({
  templateUrl: 'build/pages/dashboard/dashboard.html'
})
export class DashboardPage {
  items:Item[];
  constructor(private nav:NavController, private itemService:ItemService) {
    this.items = itemService.getItems();
    itemService.watchItemExpiry(this.items);
  }

  pinItem(item){
    let items = this.items;
    let pinText = item.isPinned?"Unpin Item":"Pin Item";

    let buttons:Object[] = [];

    if(item.owner == "Shiva"){
      buttons.push({
        text: 'Edit Item',
        handler: () => {
          this.nav.push(ItemDetailsPage, {
            item: item
          });
        }
      });
    }

    buttons = buttons.concat([
      {
        text: 'Hide Item',
        handler: () => {
          item.isHidden = !item.isHidden;
        }
      },
      {
        text: pinText,
        handler: () => {
          item.isPinned = !item.isPinned;
          this.itemService.watchItemExpiry([item]);
        }
      },{
        text: 'Delete Item',
        role: 'destructive',
        handler: () => {
          this.itemService.deleteItem(item);
        }
      },{
        text: 'Cancel',
        role: 'cancel'
      }
    ]);
    let actionSheet = ActionSheet.create({
      title: 'Pin or Hide the Item',
      buttons: buttons
    });
    this.nav.present(actionSheet);
  }

  addItem(){
    this.nav.push(ItemDetailsPage);
  }

  itemStatus(item){
    return (item.isHidden || item.isPinned) ? 'add-circle':'add';
  }

  openSamplePage(){
    this.nav.push(HelloIonicPage);
  }
}

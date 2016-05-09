import {Item,ItemDatas} from '../models/item';
export class ItemService{
  items:Item[];
  timeOuts:Object = {};

  constructor(){
    this.items = ItemDatas;
  }

  findItemIndex(item:Item):number{
    let index = this.items.findIndex(function(x:any){
      return x.id==item.id;
    });
    return index;
  }

  getItems():Item[]{
    return this.items;
  }

  addItem(item:Item):void{
    console.log("item with id "+item.id+" is added");
    this.items.push(item);
    this.watchItemExpiry([item]);
  }

  deleteItem(item:Item):void{
    let index:number = this.findItemIndex(item);
    console.log("item id "+item.id+" is deleted");
    this.items.splice(index,1);
  }

  editItem(id:number,item:Item):void{
    let index:number = this.findItemIndex(item);
    console.log("item id "+item.id+" is edited");
    this.items[index] = item;
  }

  watchItemExpiry(items:Item[]){
    for(let i=0;i<items.length;i++){
      if(!items[i].isPinned){
        let timeStamp = Number(items[i].expiry) - new Date().getTime();
        if(timeStamp>0){
          console.log("Item with id "+items[i].id+" is watched for expiry with time remaining "+timeStamp);
          this.timeOuts[items[i].id] = setTimeout(function(item){
            console.log("removing item due to timeout");
            this.deleteItem(item.id);
          }.bind(this,items[i]),timeStamp);
        }else{
          console.log('deleting due to expiry timestamp');
          this.deleteItem(items[i]);
        }
      }else{
        if(this.timeOuts && this.timeOuts[items[i].id]){
          console.log('clearing timeout due to unpin for item id '+items[i].id);
          clearTimeout(this.timeOuts[items[i].id]);
        }else{
          console.log('item is pinned so not adding expiry');
        }
      }
    }
  }

}

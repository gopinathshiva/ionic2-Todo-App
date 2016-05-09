export interface Item {
  id:number,
  title:String,
  note:String,
  owner:String,
  expiry:Number,
  ownerImg:String,
  postedOn:Number,
  isPinned:Boolean,
  isHidden:Boolean,
  selectedTime:Number
};

export let ItemDatas:Item[] = [{
    id:1,
    title:"School Bus New Stop",
    note:"any notes",
    owner:"Shiva",
    ownerImg:"img/avatar2.png",
    postedOn:new Date().getTime(),
    isPinned:true,
    isHidden:false,
    expiry:1462796321000,
    selectedTime: 3600000
  },{
    id:2,
    title:"Bike for free",
    note:"any notes",
    owner:"Danny Ros",
    ownerImg:"img/avatar1.jpg",
    postedOn:1462781053679,
    isPinned:false,
    isHidden:false,
    expiry:1462796389000,
    selectedTime: 3600000
  },{
    id:3,
    title:"Initial Hidden Item",
    note:"any notes",
    owner:"Danny Ros",
    ownerImg:"img/avatar1.jpg",
    postedOn:1462781053679,
    isPinned:false,
    isHidden:true,
    expiry:3600000,
    selectedTime: 3600000
  }];

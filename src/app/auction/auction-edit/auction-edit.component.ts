import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl , ReactiveFormsModule} from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuctionService }    from '../auction.service';
import 'rxjs/add/operator/toPromise';
import { ROOT } from '../../../app/app-config';

import {Location} from '@angular/common';
import { UserService }    from '../../user/user.service';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-auction-edit',
  templateUrl: './auction-edit.component.html',
  styleUrls: ['./auction-edit.component.css']
})
export class AuctionEditComponent implements OnInit {
  public type:string;
  public selectedId:number;
  itemForm: FormGroup;
  itemdata : any;
  public categoryatas = [];
  public auctionDetail:any;
  root:string = ROOT;
  public image = [];
  public imagedatas:any;

  constructor(private _location: Location, private userservice : UserService, private auctionservice : AuctionService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private titleService: Title) {
      setTimeout(() => {
          this.titleService.setTitle("Loyaus 編輯項目");
       });
   }

  ngOnInit() {
    this.form();
    this.route.params.subscribe(params => {
       this.type = params['type'];
       this.selectedId = params['id'];
       this.loadimagedates();
       this.loadDetail();
       this.loadCategoryDatas();
    });
  }

  form(){
     this.itemForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
        category_id: ['', Validators.required],
        new: [false],
        free: [false],
        target: ['0', Validators.required],
        description: ['', Validators.required],
        price: [''],
      }, {validator: this.priceCheck('free', 'price')});
  }

  loadDetail(){
    this.auctionservice.LoadDetail(this.selectedId)
        .then(res => {
          this.auctionDetail = res.data;

          //check url
          this.userservice.loadUserData()
          .then(res => {
                if(res.data[0].id!=this.auctionDetail[0].user_id)
                   this._location.back();
            })

            if((res.data[0].type==0 && this.type!='bid') || (res.data[0].type==1 && this.type!='seek')){
                let itemtype = 'bid';
                if(res.data[0].type==1)
                  itemtype = 'seek';
                this.router.navigate(['/auction/'+itemtype+'/edit/'+this.selectedId]);
            }

          console.log(this.auctionDetail);

          let newitem = false;
          if(this.auctionDetail[0].new==1)
            newitem = true;
          let free = false;
          if(this.auctionDetail[0].free==1)
            free = true;

          this.itemForm = this.formBuilder.group({
          name: [this.auctionDetail[0].name, Validators.compose([Validators.maxLength(100), Validators.required])],
          category_id: [this.auctionDetail[0].category.id, Validators.required],
          new: [newitem],
          free: [free],
          target: [this.auctionDetail[0].target.toString(), Validators.required],
          description: [this.auctionDetail[0].description, Validators.required],
          price: [this.auctionDetail[0].price],
        }, {validator: this.priceCheck('free', 'price')});

     })
  }

  editItem(){
  let auctiondata = JSON.stringify(this.itemForm.value);
    this.auctionservice.putEditItem(auctiondata,this.selectedId)
        .then(data =>{
          console.log(data);
          this.router.navigate(['/auction/'+this.type+'/item/'+this.selectedId]);
           //this.loadDetail();
        }, err=>{
          alert("修改無效");
        })
  }


  priceCheck(free: any, price: any) {
    return (group: FormGroup) => {
      let freeInput = group.controls[free];
      let priceInput = group.controls[price];
    
      console.log(freeInput.value);
      console.log(priceInput.value);
      if (freeInput.value == false && (priceInput.value == '' || priceInput.value == null)){
        return priceInput.setErrors({notEquivalent: true});
      }else{
        //return priceInput.setErrors(null);
      }
    }
  }

  loadCategoryDatas(){
    this.auctionservice.LoadItemCategoryData(this.type)
      .then(res => {
          this.categoryatas = res.data;
          console.log(this.categoryatas);
      }, err => console.log('hey, error when loading names list - ' + err)
    )
  }

  itemImageDestroy(imageid,publicid){
      this.auctionservice.destroyItemImage(imageid,this.auctionDetail[0].type,publicid)
        .then(data =>{
            this.loadimagedates();
        }, err=>{
          alert("刪除無效，至少要存在一張圖片");
        })
  }

  uploadtemImage(){
    console.log(this.image);
    this.auctionservice.postItemImage(this.image, this.auctionDetail[0].id)
        .then(data =>{
          console.log(data);
          this.loadimagedates();
        }, err=>{
          alert("上傳無效");
        })
  }

  loadimagedates(){
    this.auctionservice.LoadItemImageData(this.selectedId)
      .then(res => {
          this.imagedatas = res.data;
      })
  }

  private _onChange(files: FileList) : void {
         if(files && files.length > 0) {
            for(var i=0 ;i<files.length; i++){
              let file : File = files.item(i);
              //Now you can get
              console.log(file.name);
              console.log(file);
              console.log(file.type);
              this.image.push(file);
            }
         }
    }

  // bidstatus(){
  //   if(this.auctionDetail[0].bid_count > 0)
  //     return "disabled";
  // }

}

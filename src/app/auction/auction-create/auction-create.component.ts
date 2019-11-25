import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl , ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AuctionService }    from '../auction.service';
import 'rxjs/add/operator/toPromise';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent implements OnInit {
  public type:string;
  itemForm: FormGroup;
  itemdata : any;
  public categoryatas = [];
  title:string;
  public image = [];

  sandbutton:number=1;

  constructor(private auctionservice : AuctionService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private titleService: Title) { 
  }

  ngOnInit() {
    this.form();
    this.route.params.subscribe(params => {
       this.type = params['type'];

       //check url
       if(this.type!='bid' && this.type!='seek')
          this.router.navigate(['/auction/bid/create']);
      
      if(this.type=='bid')
        this.title = "拍賣";
      else
        this.title = "競投";

      setTimeout(() => {
           this.titleService.setTitle("Loyaus 新增"+this.title);
       });

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


  priceCheck(free: any, price: any) {
    return (group: FormGroup) => {
      let freeInput = group.controls[free];
      let priceInput = group.controls[price];
    
      if (freeInput.value == false && (priceInput.value == '' || priceInput.value == null)){
        return priceInput.setErrors({notEquivalent: true});
      }else{
        return priceInput.setErrors(null);
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

  createItem(){
   this.itemdata = this.itemForm.value;

  //  let formData:FormData = new FormData();
  //   for (let i = 0; i < this.image.length; i++) {
  //       formData.append("image[]", JSON.stringify(this.image[i]));
  //       console.log(this.image[i]);
  //       console.log(this.image[i].name);
  //     }
  //  this.itemdata.image = formData;
   
    console.log(this.itemdata);
  //  for (let i = 0; i < this.image.length; i++) {
  //       this.itemdata .append("image[]", this.image[i], this.image[i].name);
  //       console.log(this.image[i]);
  //   }
    this.sandbutton = 0;
    this.auctionservice.postItem(this.itemdata,this.type)
        .then(data =>{
          console.log(data);
          this.router.navigate(['/auction/'+this.type+'/item/'+data.item.id]);
          this.sandbutton = 1;
        }, err=>{
          alert("新增無效");
          this.sandbutton = 1;
        })
  }

  onChange(event){
    var files = event.srcElement.files;
    this.image = files;

    // let formData:FormData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //     formData.append("uploads[]", files[i], files[i].name);
    //     console.log(files[i]);
    //     console.log(files[i].name);
    //     var myObjt = {
    //       formData
    //     };
        
    //   }

    // let fileList: FileList = event.target.files;
    
    // let file: File = fileList[0];
    // formData.append('image', file, file.name);
    //this.image = formData;
    // for (let i = 0; i < files.length; i++) {
    //     console.log(event.target.files[i]);
    //     this.image.push( event.target.files[i] );
    // }
    // let FileList: FileList = event.target.files;

    // for (let i = 0, length = FileList.length; i < length; i++) {
    //     this.image.push(FileList.item(i));
    // }

    

    //console.log(event.target.files[0]);
    //console.log(formData);
  }

}

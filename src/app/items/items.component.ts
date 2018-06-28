import { Component, OnInit } from '@angular/core';
import { QueryServiceService } from '../query-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgModel, NgForm } from '@angular/forms';
import {  HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  urls = new Array<string>()
  closeResult: string;
  allItems: Array<object>;
  targetItem:object
  constructor(
    private Query : QueryServiceService,
    private modalService: NgbModal
  ) { 

    this.getItmes()
  }
// Modal functions
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


  // Add new Item Form Function
  addNewItem(data : NgForm){
    if (!data.valid) {
      console.log("error");
    }
    else
    {
      console.log(data.value);
      let path = "http://task.taj-it.com/api/Items"
      this.Query.postReq(path,data.value).subscribe(
        res => {
          console.log(res);  
          location.reload()
        
        },
        err => { console.log(err)
        }
      );
    }
  }

  // function to read image URL and send it
  readURL(path) {
    this.urls = [];
    if (path) {
      for (let file of path) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
    let Imgpath = "http://task.taj-it.com/api/UploadImage"
    this.Query.postReq(Imgpath,this.urls[0]).subscribe(
      res => {
        console.log(res);          
      },
      err => { console.log(err)
      }
    );
  }

  // function to get all items
  getItmes(){
    let itemPath = "https://task.taj-it.com/api/Items"
    this.Query.getReq(itemPath).subscribe(
      res => {
        this.allItems = res        
        console.log(this.allItems);  
      },
      err => { 
        console.log(err)
      }
    );
  }
  // function to delete item
  deleteItem(id)
  {
    console.log(id)
    let itemPath = `http://task.taj-it.com/api/Items/${id}`
    this.Query.deleteReq(itemPath).subscribe(
      res => {
        console.log(res)
        location.reload()
      },
      err => { 
        console.log(err)
      }
    ); 
  }

   // function to open update item modal and get hit own data
   updateItem(content2 ,item)
   {
    this.modalService.open(content2, { size: 'lg' });
     let itemPath = `http://task.taj-it.com/api/Items/${item}`
     this.Query.getReq(itemPath).subscribe(
       res => {
         console.log(res)
         this.targetItem = res;
         console.log(this.targetItem)
        //  document.getElementById("Date").defaultValue = this.targetItem['ExpireDate'] ;

       },
       err => { 
         console.log(err)
       }
     ); 

   }

   toUpdateItem(updateData : NgForm){
     console.log(updateData.value)
    let itemPath = `http://task.taj-it.com/api/Items/${this.targetItem['ItemId']}`
    this.Query.putReq(itemPath,updateData.value).subscribe(
      res => {
        console.log(res)
        location.reload()
      },
      err => { 
        console.log(err)
      }
    ); 
   }
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ExpenseModel } from './expense-module';
import {ApiService} from '../shared/api.service'
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  formValue !:FormGroup;
  expenseModelObj : ExpenseModel = new ExpenseModel();
  expenseData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formBuilder: FormBuilder ,  private api :ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name : [''],
      quantity : [''],
      place: [''],
      date:[''],
      amount:[''],
     
    })
    this.getAllexpense();
  }
  clickAddexpense(){
    this.formValue.reset();
    this.showAdd =true;
    this.showUpdate=false;
  }
  postexpenseDetails(){
    this.expenseModelObj.name=this.formValue.value.name;
    this.expenseModelObj.quantity=this.formValue.value.quantity;
    this.expenseModelObj.place=this.formValue.value.place;
    this.expenseModelObj.date=this.formValue.value.date;
    this.expenseModelObj.amount=this.formValue.value.amount;
    this.api.postexpense(this.expenseModelObj)
    .subscribe(res =>{
      console.log(res);
      alert("expense Added Successfully !");
      let ref =document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllexpense();
    },
    err =>{
      alert("Something wenyt Wrong");
    })
  }
  getAllexpense(){

    this.api.getexpense()
    .subscribe( res =>{
      this.expenseData=res;
    })
  }
  deleteexpenseData( row :any){
    this.api.deleteexpense(row.id)
    .subscribe(res=>{
      alert("expense Deleted !");
      this.getAllexpense();
    })
  }
  onEdit(row:any){
    this.expenseModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['place'].setValue(row.place);
    this.formValue.controls['date'].setValue(row.date);
    this.formValue.controls['amount'].setValue(row.amount);
    this.showAdd =false;
    this.showUpdate=true;
  }
  updateexpenseDetails(){
    this.expenseModelObj.name=this.formValue.value.name;
    this.expenseModelObj.quantity=this.formValue.value.quantity;
    this.expenseModelObj.place=this.formValue.value.place;
    this.expenseModelObj.date=this.formValue.value.date;
    this.expenseModelObj.amount=this.formValue.value.amount;
    this.api.updateexpense(this.expenseModelObj,this.expenseModelObj.id)
    .subscribe(res=>{
      alert("expense Details updated");
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllexpense();
    })
  }

}

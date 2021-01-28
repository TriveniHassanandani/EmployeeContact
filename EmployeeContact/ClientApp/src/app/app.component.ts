import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from './dialog-box/dialogbox/dialogbox.component';
import { EmployeeContactService } from './Service/employee-contact.service'
import { EmployeeContactDTO } from './EmployeeContactDTO';
//import { format } from 'path';

// export interface UsersData {
//   FirstName: string;
//   LastName: string;
//   Email :string;
//   PhoneNumber :string;
//   ContactStatus :boolean;
// }

// const ELEMENT_DATA: UsersData[] = [
//   {FirstName: 'ABC', LastName: 'Artificial Intelligence',Email:'test',PhoneNumber:'1212',ContactStatus :true},
//   {FirstName: 'XYZ', LastName: 'Machine Learning',Email:'test',PhoneNumber:'1212',ContactStatus :true},
//   {FirstName: 'PQR', LastName: 'Robotic Process Automation',Email:'test',PhoneNumber:'1212',ContactStatus :true},
//   {FirstName: 'ST', LastName: 'Blockchain',Email:'test',PhoneNumber:'1212',ContactStatus :true}
// ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'app';
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email','PhoneNumber','ContactStatus','action'];
  dataSource :EmployeeContactDTO[];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog,private apiService: EmployeeContactService) {}
  ngOnInit() {
    this.apiService.GetEmployeeContacts().subscribe(  
        (data)=> { this.dataSource=data}
    );
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      ContactId:row_obj.ContactId, FirstName: row_obj.FirstName, LastName:  row_obj.LastName,Email: row_obj.Email,PhoneNumber: row_obj.PhoneNumber,ContactStatus :true
    });
   this.table.renderRows();
   this.apiService.AddEmployeeContact(row_obj).subscribe(); 
    
  }
  updateRowData(row_obj){

   this.dataSource.filter((value,key)=>{
    if(value.ContactId == row_obj.ContactId){
      value.FirstName = row_obj.FirstName;
      value.LastName = row_obj.LastName,
      value.Email= row_obj.Email,
      value.PhoneNumber= row_obj.PhoneNumber,
      value.ContactStatus=row_obj.ContactStatus
    }
    
    });

    this.apiService.UpdateEmployeeContact(row_obj).subscribe(); 
    return true;
  }
   


  deleteRowData(row_obj){
    this.dataSource.filter((value,key)=>{
      if(value.ContactId == row_obj.ContactId){
          value.ContactStatus=!row_obj.ContactStatus
      }
      
      });
    this.apiService.DeleteEmployeeContact(row_obj).subscribe(); 
    return true;
    // this.dataSource = this.dataSource.filter((value,key)=>{
    //   return value.ContactStatus != row_obj.ContactStatus;
    // });
  }




}

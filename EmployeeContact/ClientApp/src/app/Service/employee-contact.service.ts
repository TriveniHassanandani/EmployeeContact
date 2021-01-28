import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';    
import { EmployeeContactDTO } from '../../app/EmployeeContactDTO';    
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeContactService {
  
  ApiUrl='http://localhost:44386/'; 
  constructor(private httpclient: HttpClient) { }    


  GetEmployeeContacts():Observable<EmployeeContactDTO[]>{    
    return this.httpclient.get<EmployeeContactDTO[]>(this.ApiUrl+'Api/Contact/GetEmployeeContacts');    
    }    
      
  GetEmployeeContactById(Id:string):Observable<EmployeeContactDTO>{    
      return this.httpclient.get<EmployeeContactDTO>(this.ApiUrl+'Api/Contact/GetEmployeeContactById/'+Id);    
    }    
    AddEmployeeContact(contact:EmployeeContactDTO){    
     return this.httpclient.post<EmployeeContactDTO>(this.ApiUrl+'Api/Contact/AddEmployeeContact',contact);    
  }    
      
  UpdateEmployeeContact(contact:EmployeeContactDTO):Observable<EmployeeContactDTO>{    
      return this.httpclient.put<EmployeeContactDTO>(this.ApiUrl+'Api/Contact/UpdateEmployeeContact/',contact);    
    }    
      
   DeleteEmployeeContact(contact:EmployeeContactDTO):Observable<EmployeeContactDTO>{    
    //return this.httpclient.put<EmployeeContactDTO>(this.ApiUrl+'Api/Contact/UpdateEmployeeContact/',contact); 
    return this.httpclient.delete<EmployeeContactDTO>(this.ApiUrl+'Api/Contact/DeleteEmployeeContactById?id='+contact.ContactId); 
    //return contact;   
    }       
      
}

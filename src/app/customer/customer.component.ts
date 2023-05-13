import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  customerName: string ="";
  customerAddress: string ="";
  mobile: Number =0;
  currentCustomerID = "";

  constructor(private http: HttpClient )
  {
  
 
  }
 
  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer()
  {
    
    this.http.get("http://localhost:8080/api/v1/customer/getAllCustomer")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "customerName" : this.customerName,
      "customerAddress" : this.customerAddress,
      "mobile" : this.mobile
    };
 
    this.http.post("http://localhost:8080/api/v1/customer/save",bodyData,{responseType:'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Customer Registered Successfully")
        this.getAllCustomer();
        this.customerName = '';
        this.customerAddress = '';
        this.mobile  = 0;
    });
  }
 
  setUpdate(data: any)
  {
   this.customerName = data.customerName;
   this.customerAddress = data.customerAddress;
   this.mobile = data.mobile;
   this.currentCustomerID = data.customerId;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "customerId" : this.currentCustomerID,
      "customerName" : this.customerName,
      "customerAddress" : this.customerAddress,
      "mobile" : this.mobile,
    };
    
    this.http.put("http://localhost:8080/api/v1/customer/update",bodyData,{responseType:'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Customer Registered Updateddd")
        this.getAllCustomer();
        this.customerName = '';
        this.customerAddress = '';
        this.mobile  = 0;
    });
  }
 
 
 
  save()
  {
    if(this.currentCustomerID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
 
  setDelete(data: any)
  {
    
    //{responseType:'text'} permet d'avoir la reponse de l'alert
    this.http.delete("http://localhost:8080/api/v1/customer/deleteCustomer"+ "/"+ data.customerId,{responseType:'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Customer Deleted")
        this.getAllCustomer();
  
    });
 
  }
}

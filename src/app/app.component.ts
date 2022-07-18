import { Component } from '@angular/core';
import { Applications } from './module/Application';
import { ApicallService } from './services/apicall.service';
import { service } from './module/Service';
import { Partition } from './module/Partition';
import { Instance } from './module/Instance';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public listApplications: string[] = [];
  public listServices = new Map();
  public listPartitions = new Map();
  public listInstances = new Map();
  public MigrationListener :string ='';

  title = 'test';

  applications : Applications;
  services: service;
  partition: Partition;
  instance: Instance;

  constructor(private userData: ApicallService, 
              private route: ActivatedRoute){
    this.getAllApplications();
  }

  getAllApplications(){
    this.userData.getAllApplications().subscribe(
      resp=> {
        this.applications = resp;
        for(var item in this.applications.Items){
          this.listApplications.push(this.applications.Items[item].Id);
          this.getAllServices(this.applications.Items[item].Id);
        }
        console.log(this.listApplications);

       
      }
    )
    
  }

  getAllServices(ApplicationId: string){
    this.userData.getAllServices(ApplicationId).subscribe(
      resp => {

        this.services = resp;
        for(var item in this.services.Items){
          this.listServices.set(this.services.Items[item].Id, ApplicationId);
          this.getAllPartitions(this.services.Items[item].Id);
        }
        console.log(this.listServices);
       
      }
    );
  }

  getAllPartitions(ServiceId: string) {
    this.userData.getAllPartitions(ServiceId).subscribe(
      resp=> {
  
        this.partition = resp;
        for(var item in this.partition.Items){
          this.listPartitions.set(this.partition.Items[item].PartitionInformation.Id, ServiceId);
          this.getAllInstances(this.partition.Items[item].PartitionInformation.Id);
        }
        
      }
    )
  }

  getAllInstances(PartitionId: string){
    this.userData.getAllInstances(PartitionId).subscribe(
      resp=> {

        this.instance = resp;
        for(var item in this.instance.Items){
          this.listInstances.set(this.instance.Items[item].ReplicaId, PartitionId);
          var migrationList = this.getMigrationListener(this.instance.Items[item].Address);
          if ( typeof migrationList !== 'undefined'){
            this.MigrationListener = migrationList;
            console.warn(migrationList);
          }
        }

      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    )              
  }

  getMigrationListener(Endpoints: string){
    var endpoints = JSON.parse(Endpoints);
    return (endpoints["Endpoints"]["Migration Listener"]);
    
  }


  getKeys(map: Map<any, any>){
    return Array.from(map.values());
  }


}

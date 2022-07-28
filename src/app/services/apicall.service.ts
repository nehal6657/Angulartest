import { ChangeDetectionStrategy, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApicallService {
  url = "http://localhost:4200/api/Partitions/e7fa8815-da19-469c-8d29-5741aa82fbf3/$/GetReplicas/133014902195036236?api-version=6.0&timeout=1000";
  getInstanceID = "http://localhost:4200/api/Partitions/e7fa8815-da19-469c-8d29-5741aa82fbf3/$/GetReplicas?api-version=6.0";
  
  test ="http://localhost:4200/candy";
  //candyResp: Candy;

  applicationsUrl = "http://localhost:4200/api/Applications?api-version=6.1";
  serviceUrl : string = "";

  constructor(private http: HttpClient) {

   }
   ngOnInit(){
    
   }
   getPartitionUrl(ServiceId: string){
    return "http://localhost:4200/api/Services/" + ServiceId + "/$/GetPartitions?api-version=6.4";
   }
   getInstanceUrl(PartitionId: string){
    return  "http://localhost:4200/api/Partitions/"+PartitionId +"/$/GetReplicas?api-version=6.0";
   }

   getAllApplications(){
    return this.http.get<any>(this.applicationsUrl);
   }

   getAllServices(ApplicationId: string){
    var serviceUrl = "http://localhost:4200/api/Applications/"+ApplicationId+"/$/GetServices?api-version=6.0";
    return this.http.get<any>(serviceUrl);
   }

   getAllPartitions(ServiceId: string){
    var partitionUrl = this.getPartitionUrl(ServiceId);
    return this.http.get<any>(partitionUrl);
   }

   getAllInstances(PartitionId: string){
    var instanceUrl = this.getInstanceUrl(PartitionId);
    return this.http.get<any>(instanceUrl);
   }   

   FetchMigrationProgress(){

    var URL = "http://localhost:4200/fmp/e7fa8815-da19-469c-8d29-5741aa82fbf3/133017804768490073/2eea2f23-c342-4997-8ec2-77b331103c15/RcMigration/GetMigrationStatus";
    return this.http.get<any>(URL);
   }

   startMigration(migrationList){

    return this.http.put<any>( migrationList+"/RcMigration/StartMigration", {});
   }
}

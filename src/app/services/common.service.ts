import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  locationDetailCallback;
  submitReviewCallback;
  updateHappyCountCallback
  updateSadCountCallback;
  updatePwaOpenedCountCallback;
  updatePwaReviewSitesCountCallback;

  constructor(private http: HttpClient) { }

 
  getLocationDetails(data,locationDetailCallback){
        this.http.post(
        environment.apiUrl+"pwa_get_location_details",
        data,
        {
          "headers":{
            "Content-Type" : "application/json"
          }
        }
      )
      .subscribe(
          data => {  
             locationDetailCallback(data);
          }
      ); 
  }
  updatePwaOpenedCount(data,updatePwaOpenedCountCallback){
       this.http.post(
        environment.apiUrl+"pwa_update_location_pwa_opened_count",
        data,
        {
          "headers":{
            "Content-Type" : "application/json"
          }
        }
      )
      .subscribe(
          data => {  
             updatePwaOpenedCountCallback(data);
          }
      ); 
  } 
   updatePwaReviewSitesCount(data,updatePwaReviewSitesCountCallback){
       this.http.post(
        environment.apiUrl+"pwa_update_location_review_sites_count",
        data,
        {
          "headers":{
            "Content-Type" : "application/json"
          }
        }
      )
      .subscribe(
          data => {  
             updatePwaReviewSitesCountCallback(data);
          }
      ); 
  } 
  submitReview(data,submitReviewCallback){
     this.http.post(
        environment.apiUrl+"pwa_submit_review",
        data,
        {
          "headers":{
            "Content-Type" : "application/json"
          }
        }
      )
      .subscribe(
          data => {  
             submitReviewCallback(data);
          }
      ); 
  }
  updateSadCount(data,updateSadCountCallback){
   
    this.http.post(
        environment.apiUrl+"update_sad_count",
        data,
        {
          "headers":{
            "Content-Type" : "application/json"
          }
        }
      )
     .subscribe(
          data => {  
             updateSadCountCallback(data);
          }
      ); 
  }
  updateHappyCount(data,updateHappyCountCallback){
   
    this.http.post(
        environment.apiUrl+"update_happy_count",
        data,
        {
          "headers":{
            "Content-Type" : "application/json"
          }
        }
      )
     .subscribe(
          data => {  
             updateHappyCountCallback(data);
          }
      ); 
  }
  
}

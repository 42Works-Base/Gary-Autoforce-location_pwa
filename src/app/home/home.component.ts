import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ConnectionService } from "ng-connection-service";

//declare function setManifest(any): any;
declare function sharepwa(): any;
declare function addpwa(): any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  group_id: any;
  location_id: any = null;
  location: any;

  error_msg = null;
  success_msg = null;
  animate = null;
  loading: boolean = false;

  name: any;
  email: any;
  phone: any;
  review: any;

  status = "ONLINE";
  isConnected = true;

  isIos = false;

  social: any = [
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/review-set-up-google-icon-active.png",
    },
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/review-set-up-fb-icon-active.png",
    },
    { url: "", ischecked: 0, imageurl: "assets/img/review-logos/yelplogo.png" },
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/yellow pages.jpg",
    },
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/Angies List.png",
    },
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/AutoScout24.jpg",
    },
    { url: "", ischecked: 0, imageurl: "assets/img/review-logos/manta.png" },
    { url: "", ischecked: 0, imageurl: "assets/img/review-logos/Edmunds.png" },
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/Product Reviews.png",
    },
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/TripAdvisor.png",
    },
    {
      url: "",
      ischecked: 0,
      imageurl:
        "assets/img/review-logos/better-business-bureau-logo-png-transparent.png",
    },
    {
      url: "",
      ischecked: 0,
      imageurl: "assets/img/review-logos/Foursquare.png",
    },
  ];
  social_checked: any = [];
  social_server: any = [];
  selected_smiley: string = null;
  selected_smiley_error: string = null;
  extra_fields: boolean = false;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private connectionService: ConnectionService
  ) {
    /*if (location.protocol != 'https:'){
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }*/
    this.updatePwaReviewSitesCountCallback =
    this.updatePwaReviewSitesCountCallback.bind(this);
    this.locationDetailCallback = this.locationDetailCallback.bind(this);
    this.submitReviewCallback = this.submitReviewCallback.bind(this);
    this.updateSadCountCallback = this.updateSadCountCallback.bind(this);
    this.updateHappyCountCallback = this.updateHappyCountCallback.bind(this);
    this.updatePwaOpenedCountCallback =
    this.updatePwaOpenedCountCallback.bind(this);

    this.activatedRoute.params.subscribe((params) => {
      this.group_id = params.group_id;
      this.location_id = params.location_id;
    });

    if (this.location_id == null) {
      this.router.navigate(["/404"]);
    }
    let data: any = {};
    data.location_id = this.location_id;
    //data.location_id =  localStorage.getItem('location_id');

    this.commonService.getLocationDetails(data, this.locationDetailCallback);
    this.commonService.updatePwaOpenedCount(
      data,
      this.updatePwaOpenedCountCallback
    );

    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        this.commonService.getLocationDetails(
          data,
          this.locationDetailCallback
        );
      } else {
        this.status = "OFFLINE";
      }
    });
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      this.isIos = true;
    }
  }

  ngOnInit() {
    this.loading = true;
    localStorage.setItem("group_id", this.group_id);
    localStorage.setItem("location_id", this.location_id);
  }

  updatePwaOpenedCountCallback(response) {}
  locationDetailCallback(response) {
    this.loading = false;
    this.location = response.location;

    this.social = JSON.parse(response.location.social_meta);

    this.updateSocialChecked();

    if (
      this.location.business_logo_url == "" ||
      this.location.business_logo_url == undefined
    ) {
      this.location.business_logo_url = null;
    }
    //setManifest(this.location.manifest);
  }
  updateSocialChecked() {
    this.social_checked = [];
    var temp = Object.assign([], this.social);
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].ischecked == 1 || temp[i].ischecked == true) {
        this.social_checked.push(temp[i]);
      }
    }
  }

  submitReview(data: any) {
    this.loading = true;
    data.location_id = this.location_id;
    data.smiley = this.selected_smiley;
    data.required = this.extra_fields ? 1 : 0;
    console.log(data);
    this.commonService.submitReview(data, this.submitReviewCallback);
  }

  submitReviewCallback(response) {
    if (response.success == true) {
      this.animate = "bounceIn";
      this.success_msg = response.message;
      this.error_msg = null;
      this.selected_smiley = null;

      let this1: any = this;
      setTimeout(function () {
        this1.router.navigate([
          "/thank-you",
          this1.group_id,
          this1.location_id,
        ]);
      }, 1000);
    } else {
      this.animate = "bounceIn";
      this.success_msg = null;
      this.error_msg = response.message;
    }
    this.loading = false;
  }

  update_sad_count() {
    let data: any = {};
    data.location_id = this.location_id;
    this.commonService.updateSadCount(data, this.updateSadCountCallback);
  }
  update_happy_count() {
    let data: any = {};
    data.location_id = this.location_id;
    this.commonService.updateHappyCount(data, this.updateHappyCountCallback);
  }
  updateSadCountCallback(response) {
    // console.log(response);
  }
  updateHappyCountCallback(response) {
    //console.log(response);
  }

  getLocationData() {
    let data: any = {};
    data.location_id = this.location_id;
    this.commonService.getLocationDetails(data, this.locationDetailCallback);
  }
  hideMessages() {
    this.error_msg = null;
    this.success_msg = null;
  }

  share() {
    sharepwa();
  }

  addHome() {
    addpwa();
  }
  updatePwaReviewSitesCount(imageurl) {
    let data: any = {};
    data.location_id = this.location_id;
    data.imageurl = imageurl;
    this.commonService.updatePwaReviewSitesCount(
      data,
      this.updatePwaReviewSitesCountCallback
    );
  }
  updatePwaReviewSitesCountCallback(response) {}
  getMoreFields() {
    if (!this.extra_fields) {
      return { display: "none" };
    }
  }
  selectSmiley(smiley) {
    this.selected_smiley = smiley;
  }
}
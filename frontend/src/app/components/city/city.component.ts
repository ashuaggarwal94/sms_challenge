import { Component, OnInit } from '@angular/core';
import { CityService } from './../../services/city.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { City } from 'src/app/model/city.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: City[];
  pageNumber = 0;
  dateError = "";

  private searchCriteria = {};

  constructor(private cityService: CityService, private modalService: NgbModal, private commonService: CommonService) { }

  ngOnInit(): void {
    this.loadResources()
  }
  loadResources(searchCriteria?) {
    this.cityService.getAllCity(searchCriteria).subscribe((data: City[]) => {
      this.cities = data
    }, error => {
      console.log(error);
    });
  }
  checkDate(start, end) {
    this.dateError = "";
    if (start !== "" && end !== "") {
      let start_date = new Date(start);
      let end_date = new Date(end);
      if (start_date.getTime() > end_date.getTime())
        this.dateError = "End date should be ahead of start date.";
      else this.dateError = "";
    }
  }
  search(formValue) {
    if (formValue.start !== "" && formValue.end !== "") {
      this.dateError = "";
      for (const key in formValue) {
        if (formValue[key] !== "")
          this.searchCriteria[key] = formValue[key]
      }
    }
    else {
      this.dateError = "Enter atleast one search criteria";
    }
    this.loadResources(this.searchCriteria)
  }
  sortExiting(event) {
    console.log(event);

    this.cities = event;
  }
  sort(event) {
    this.searchCriteria["sortBy"] = event.target.value + ":asc";
    this.loadResources(this.searchCriteria)
  }
  changePage(str) {
    if (str === "pre") {
      this.pageNumber -= 1;
      this.searchCriteria["skip"] = this.pageNumber * 10;
    } else {
      this.pageNumber++;
      this.searchCriteria["skip"] = this.pageNumber * 10;
    }
    this.loadResources(this.searchCriteria)
  }
  deleteRow(id) {
    this.cityService.delete(id).subscribe((data) => {
      alert("Data Deleted")
      this.loadResources(this.searchCriteria)
    }, error => {
      console.log(error);
    })
  }
  addNew() {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.title = "Add Row";
    modalRef.result.then(result => {
      this.cityService.addRow(result).subscribe((data) => {
        alert("Data Added!")
        this.loadResources(this.searchCriteria)
      }, error => {
        console.log(error);
      })
    })
  }

  editExisting(city: City) {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.title = "Edit Existing";
    let id = city.id;
    let start = city.start_date;
    let end = city.end_date;
    delete city.id;
    modalRef.componentInstance.formValue(city)
    modalRef.result.then(result => {
      if (this.commonService.shallowEqual(result, city)) {
        city.start_date = start;
        city.end_date = end;
      } else {
        this.cityService.updateRow(id, result).subscribe(data => {
          alert("Record Updated!!")
          this.loadResources(this.searchCriteria);
        }, error => {
          console.log(error);
        })
      }
    }).catch(error => {
      city.start_date = start;
      city.end_date = end;
    })
  }
}

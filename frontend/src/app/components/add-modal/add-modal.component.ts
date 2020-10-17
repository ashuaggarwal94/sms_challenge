import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/model/city.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @ViewChild('addRow') addRow: NgForm;
  title: string;
  dateError = false;
  cityData: City = {
    city: undefined,
    color: undefined,
    end_date: undefined,
    start_date: undefined,
    id: undefined,
    price: undefined,
    status: undefined
  };

  constructor(private modalService: NgbActiveModal, private ngbModal: NgbModal) { }

  ngOnInit(): void { }
  dismiss() {
    this.modalService.dismiss()
  }
  formValue(value) {
    setTimeout(() => {
      let start = value.start_date.split("/");
      value.start_date = start[2] + "-" + (start[0] < 10 ? "0" + start[0] : start[0]) + "-" + start[1];
      start = value.end_date.split("/");
      value.end_date = start[2] + "-" + (start[0] < 10 ? "0" + start[0] : start[0]) + "-" + start[1]

      // "6/26/2011" does not conform to the required format, "yyyy-MM-dd".
      this.addRow.setValue(value);
    });
  }

  addNewRow(formValue) {
    this.modalService.close(formValue);
  }

  checkDate(start, end) {
    if (start !== "" && end !== "") {
      let start_date = new Date(start);
      let end_date = new Date(end);
      if (start_date.getTime() > end_date.getTime())
        this.dateError = true;
      else this.dateError = false;
    }
  }
}

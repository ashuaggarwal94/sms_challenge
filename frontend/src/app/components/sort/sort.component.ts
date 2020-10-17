import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { City } from 'src/app/model/city.model';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  sortDirection = "";
  @Input() sortColumn: string;
  @Input() cities: City[];
  @Output() direction = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }
  // color: string,
  sort() {
    this.sortDirection = this.sortDirection === "asc" ? "dsc" : "asc";
    if (this.sortColumn === "city" || this.sortColumn === "status")
      this.cities.sort((a, b) => a[this.sortColumn].localeCompare(b[this.sortColumn]));
    if (this.sortColumn === "price")
      this.cities.sort((a, b) => parseFloat(a[this.sortColumn]) - parseFloat(b[this.sortColumn]));
    if (this.sortColumn === "end_date" || this.sortColumn === "start_date")
      this.cities.sort((a, b) => {
        return new Date(a[this.sortColumn]).getTime() - new Date(b[this.sortColumn]).getTime()
      })
    this.cities = this.sortDirection !== "asc" ? this.cities.reverse() : this.cities;
    this.direction.emit(this.cities);
  }
}

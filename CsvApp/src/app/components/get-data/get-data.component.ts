import { Component, OnInit } from '@angular/core';
import { InsertDataService } from 'src/app/services/insert-data.service';
import { Data } from '../../interfaces/data';
@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent implements OnInit {

  received! : Data[];

  constructor(private insertService : InsertDataService) { }

  ngOnInit(): void {
    this.getRecord();
  }
  getRecord(): void {
    this.insertService.getRecord()
    .subscribe((received) => { this.received = received });
  }
}

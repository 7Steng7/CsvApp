import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { InsertDataService } from 'src/app/services/insert-data.service';
import { Data } from '../../interfaces/data';

@Component({
  selector: 'app-show-data-csv',
  templateUrl: './show-data-csv.component.html',
  styleUrls: ['./show-data-csv.component.scss']
})
export class ShowDataCsvComponent implements OnInit {

  dataSend : Data[] = [] ;

  ngOnInit(): void {
    this.refreshRecord();
  }

  selectedCSVFileName : any;
  isCSV_Valid : any;
  arrayHeader = [];
  arrayBody = [];
  lista = [];

    constructor(private papa: Papa, private insertService : InsertDataService) {
    }

    fileChangeListener($event: any): void {
      const files = $event.srcElement.files;

      if (files !== null && files !== undefined && files.length > 0) {
        this.selectedCSVFileName = files[0].name;

        const reader: FileReader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = e => {

          const csv = reader.result;

          const results = this.papa.parse(csv as string, { header: false });
          //Header and body in the sheet - consumed data
          this.arrayHeader = results.data[0];

          for(let j = 1 ; j < results.data.length ; j++){
            this.lista = results.data[j];
          }
          
          this.arrayBody = results.data.slice(1, results.data.length);

          var newDataSend = this.dataNew();
          this.addRecord(newDataSend);
          // VALIDATE PARSED CSV FILE
          if (results !== null && results !== undefined && results.data !== null &&
            results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
            this.isCSV_Valid = true;

            // PERFORM OPERATIONS ON PARSED CSV
            let csvTableHeader = results.data[0];

            let csvTableData = [...results.data.slice(1, results.data.length)];

          } else {
            for (let i = 0; i < results.errors.length; i++) {
              console.log( 'Error Parsing CSV File: ',results.errors[i].message);
            }
          }
        };
      } else {
        console.log('No File Selected');
      }

    }
    refreshRecord() {
      this.insertService.getRecord()
        .subscribe((dataSend) => {
          this.dataSend = dataSend 
          this.ngOnInit();
        })      
    }
    addRecord(data : Data) {
      this.insertService.addRecord(data)
        .subscribe(data => {
          this.refreshRecord();
        })      
    }
    dataNew(): Data{
      return{
        fields : this.arrayHeader.toString(),
        registerData : this.arrayBody.toString()
      }
    }
    
}

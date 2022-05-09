import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

interface IDataItem {
  id: number;
  field_1: string;
  field_2: Date;
  field_3: number;
  field_4: string;
}

@Component({
  selector: "app-directive-example",
  templateUrl: "./directive-example.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectiveExampleComponent implements OnInit {
  data: IDataItem[] = [
    {
      id: 1,
      field_1: "林克",
      field_2: new Date(),
      field_3: 10,
      field_4: "1_4",
    },
    {
      id: 2,
      field_1: "塞尔达",
      field_2: new Date(),
      field_3: 10,
      field_4: "2_5",
    },
    {
      id: 3,
      field_1: "力巴尔",
      field_2: new Date(),
      field_3: 10,
      field_4: "3_6",
    },
    {
      id: 4,
      field_1: "乌尔波扎",
      field_2: new Date(),
      field_3: 10,
      field_4: "4_8",
    },
    {
      id: 5,
      field_1: "乌尔波扎",
      field_2: new Date(),
      field_3: 10,
      field_4: "5_9",
    },
  ];

  onCellValueChange(value: string, rowIndex: number, field: string): void {
    // TODO http request
    // console.log(value);
    this.data[rowIndex][field] = value;
  }
  constructor() {}

  ngOnInit(): void {}
}

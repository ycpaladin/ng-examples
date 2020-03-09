import { Component, OnInit, TemplateRef, Type, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { timer, Observable, of } from 'rxjs';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { Service1Service } from './services/service1.service';
import { CommonService1Service } from 'src/app/modules/common/services/common-service1.service';

// const Custom = (typeName: string) => {
//   return (ctor) => {
//     console.log(typeName, ctor);
//     return ctor;
//   };
// };


@Component({
  selector: 'app-demo01',
  templateUrl: './demo01.component.html',
  styleUrls: ['./demo01.component.scss'],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.active]': 't'
  }
})
// @Custom('ttttt')?
export class Demo01Component implements OnInit {

  formGroup: FormGroup;

  status: Observable<string>;

  data$: Observable<number>;

  data;
  t = true;
  constructor(private fb: FormBuilder, private service: CommonService1Service) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required], [this.asyncValidator]]
    });

    this.status = this.formGroup.get('name').statusChanges;


    this.status.subscribe(console.log);

    this.data$ = this.service.getData();
    // if (1 == 1) {

    // }
  }

  asyncValidator = (control: AbstractControl) => {
    return timer(1000).pipe(
      debounceTime(500),
      switchMap(() => timer(1000).pipe(
        map(() => of(null)
        ))
      )
    );
  }

  ngOnInit() {
  }

}

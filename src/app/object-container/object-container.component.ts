import {Component, Input, OnInit} from '@angular/core';
import {LwM2MObject} from '../models/objects';

@Component({
  selector: 'app-object-container',
  templateUrl: './object-container.component.html',
  styleUrls: ['./object-container.component.sass']
})
export class ObjectContainerComponent implements OnInit {
  @Input() object: LwM2MObject;

  constructor() { }

  ngOnInit() {  }

}

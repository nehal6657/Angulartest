import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {
  status: string = 'completed';
  id: string = '';

  constructor(private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    console.warn("service id: ", this.route.snapshot.paramMap.get('id'));
    this.id = this.route.snapshot.paramMap.get('id');
  }

}

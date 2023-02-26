import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from 'src/app/services/feedbacks.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  feedbacksToShow:any = [];

  constructor(private feedbackServ:FeedbacksService){}

  ngOnInit(): void {

      this.feedbackServ.getAll().subscribe({
        next:res=>{ this.feedbacksToShow = res; },
        error:error=>{ console.log(error); }
      });

  }


  search(title:any){
    this.feedbackServ.getByTitle(title).subscribe({
      next:res=>{ this.feedbacksToShow = res; },
      error:error=>{ console.log(error); }
    });
  }

}

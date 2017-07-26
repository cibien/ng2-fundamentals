import { Component, OnInit, Inject } from '@angular/core'
import { EventService } from './shared/event.service'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from './shared/index'

@Component({
	template: `
	<div>
		<h1>Upcoming Angular 2 Events</h1>
		<hr>
		<div class="row">
			<div *ngFor="let event of events" class="col-md-5">
				<event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
			</div>
		</div>		
	</div>
	`
})
export class EventsListComponent implements OnInit {

	events: IEvent[]

	constructor(private eventService: EventService, @Inject(TOASTR_TOKEN) private toastr: Toastr, private route: ActivatedRoute) {

	}

	ngOnInit() {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		this.events = this.route.snapshot.data['events']
	}

	handleThumbnailClick(eventName) {
		this.toastr.success(eventName)
	}
}
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'

import { EventService } from '../shared/event.service'

@Injectable()
export class EventRouterActivator implements CanActivate {

	constructor(private eventService: EventService, private router: Router) {

	}

	canActivate(route: ActivatedRouteSnapshot) {
		const eventExists = !!this.eventService.getEvent(+route.params['id'])

		console.log(eventExists)

		if (!eventExists) {
			console.log('teste')
			this.router.navigate(['/404'])
		}

		return eventExists
	}
}
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import {
	EventsListComponent,
	EventThumbnailComponent,
	CreateEventComponent,
	EventDetailsComponent,
	EventService,
	EventRouterActivator,
	EventListResolver
} from './events/index'

import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'
import { ToastrService } from './common/toastr.service'
import { appRoutes } from './routes'
import { AuthService } from './user/auth.service'

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes)
	],
	declarations: [
		EventsAppComponent,
		EventsListComponent,
		EventThumbnailComponent,
		EventDetailsComponent,
		CreateEventComponent,
		NavBarComponent,
		Error404Component
	],
	providers: [
		EventService,
		ToastrService,
		EventRouterActivator,
		{
			provide: 'canDeactivateCreateEvent',
			useValue: checkDirtyState
		},
		EventListResolver,
		AuthService
	],
	bootstrap: [EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
	if (component.isDirty)
		return window.confirm('You have not saved this event, do you really want to cancel?')
	return true
}
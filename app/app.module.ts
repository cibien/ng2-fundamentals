import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
	EventsListComponent,
	EventThumbnailComponent,
	CreateEventComponent,
	EventDetailsComponent,
	EventService,
	EventRouterActivator,
	EventListResolver,
	CreateSessionComponent,
	SessionListComponent,
	UpVoteComponent,
	PipeDuration,
	VotersService,
	LocationValidator
} from './events/index'

import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'

import {
	JQ_TOKEN,
	TOASTR_TOKEN,
	Toastr,
	CollapsibleComponent,
	SimpleModalComponent,
	ModalTriggerDirective
} from './common/index'

import { appRoutes } from './routes'
import { AuthService } from './user/auth.service'

declare let toastr: Toastr
declare let jQuery: Object

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(appRoutes)
	],
	declarations: [
		EventsAppComponent,
		EventsListComponent,
		EventThumbnailComponent,
		EventDetailsComponent,
		CreateEventComponent,
		NavBarComponent,
		Error404Component,
		CreateSessionComponent,
		SessionListComponent,
		UpVoteComponent,
		PipeDuration,
		CollapsibleComponent,
		SimpleModalComponent,
		ModalTriggerDirective,
		LocationValidator
	],
	providers: [
		EventService,
		{
			provide: TOASTR_TOKEN,
			useValue: toastr
		},
		EventService,
		{
			provide: JQ_TOKEN,
			useValue: jQuery
		},
		EventRouterActivator,
		{
			provide: 'canDeactivateCreateEvent',
			useValue: checkDirtyState
		},
		EventListResolver,
		AuthService,
		VotersService
	],
	bootstrap: [EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
	if (component.isDirty)
		return window.confirm('You have not saved this event, do you really want to cancel?')
	return true
}
import { Component, Input, OnChanges } from '@angular/core'
import { ISessions } from '../shared/index'
import { AuthService } from '../../user/auth.service'
import { VotersService } from './voters.service'

@Component({
	selector: 'session-list',
	templateUrl: 'app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {
	@Input() sessions: ISessions[]
	@Input() filterBy: string
	@Input() sortBy: string
	visibleSessions: ISessions[] = []

	constructor(private authService: AuthService, private votersService: VotersService) { }

	ngOnChanges() {
		if (this.sessions) {
			this.filterSessions(this.filterBy)
			this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
		}
	}

	toggleVote(session: ISessions) {
		if (this.userHasVoted(session)) {
			this.votersService.deleteVoter(session, this.authService.currentUser.userName)
		}
		else {
			this.votersService.addVoter(session, this.authService.currentUser.userName)
		}

		if (this.sortBy === 'votes') {
			this.visibleSessions.sort(sortByVotesDesc)
		}
	}

	userHasVoted(session) {
		return this.votersService.userHasVoted(session, this.authService.currentUser.userName)
	}

	filterSessions(filter) {
		if (filter == "all") {
			this.visibleSessions = this.sessions.slice(0)
		}
		else {
			this.visibleSessions = this.sessions.filter(session => {
				return session.level.toLocaleLowerCase() === filter
			})
		}
	}
}

function sortByNameAsc(s1: ISessions, s2: ISessions) {
	if (s1.name > s2.name)
		return 1
	else if (s1.name === s2.name)
		return 0
	else
		-1
}

function sortByVotesDesc(s1: ISessions, s2: ISessions) {
	return s2.voters.length - s1.voters.length
}
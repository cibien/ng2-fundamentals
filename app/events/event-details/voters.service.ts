import { Injectable } from '@angular/core'
import { Http, Response, Headers, ResponseOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { ISessions } from '../shared/event.model'

@Injectable()
export class VotersService {

	constructor(private http: Http) {

	}

	deleteVoter(eventId: number, session: ISessions, voterName: string) {
		session.voters = session.voters.filter(voter => voter !== voterName)
		let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

		this.http.delete(url).catch(this.handleError).subscribe()
	}

	addVoter(eventId: number, session: ISessions, voterName: string) {
		session.voters.push(voterName)

		let headers = new Headers({ 'Content-Type': 'application/json' })
		let options = new ResponseOptions({ headers: headers })
		let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

		return this.http.post(url, JSON.stringify({}), options).catch(this.handleError).subscribe()
	}

	userHasVoted(session: ISessions, voterName: string) {
		return session.voters.some(voter => voter === voterName)
	}

	handleError(error: Response) {
		return Observable.throw(error.statusText)
	}
}


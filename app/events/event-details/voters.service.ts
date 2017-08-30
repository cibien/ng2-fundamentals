import { Injectable } from '@angular/core'
import { ISessions } from '../shared/event.model'

@Injectable()
export class VotersService {

	deleteVoter(session: ISessions, voterName: string) {
		session.voters = session.voters.filter(voter => voter !== voterName)
	}

	addVoter(session: ISessions, voterName: string) {
		session.voters.push(voterName)
	}

	userHasVoted(session: ISessions, voterName: string) {
		return session.voters.some(voter => voter === voterName)
	}
}


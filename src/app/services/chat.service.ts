import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
	messages = [
		{
			date: "2021-03-28T15:18:22.521Z",
			text: "Salut j’ai vu que tu as déjà visit..",
			userId: "imvmCuh4bLhMp1Za5juJ12LjJpd2",
			type : 'message'
		},
		{
			date: "2021-03-28T15:20:22.521Z",
			text: "bonjour oui en effet j'ai visité ..........",
			userId: "0123456789",
			type : 'message'
		},
		{
			date: "2021-03-28T15:22:22.521Z",
			text: "j'aimerai bien faire ce voyage ...........",
			userId: "imvmCuh4bLhMp1Za5juJ12LjJpd2",
			type : 'message'
		},
		{
			date: "2021-03-28T15:25:22.521Z",
			text: "je te le conseil ..........",
			userId: "0123456789",
			type : 'message'
		}
	]

  constructor() { }
}

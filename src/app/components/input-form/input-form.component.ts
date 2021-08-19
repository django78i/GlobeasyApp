import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-input-form',
	templateUrl: './input-form.component.html',
	styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {

	messageText: any;
	@Output() message: EventEmitter<any> = new EventEmitter;

	constructor() { }

	ngOnInit() {
	}


	sendMessage() {
		console.log('ici');
		this.message.emit(this.messageText);
		this.messageText = null;
	}

}

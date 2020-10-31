import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

	public folder: string;
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.folder = this.activatedRoute.snapshot.paramMap.get('id');
	}

	public onStartGameClicked(): void {
		this.router.navigateByUrl('/game');
	}
}

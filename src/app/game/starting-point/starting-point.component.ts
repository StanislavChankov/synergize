import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EngineService } from '../../core/services/engine.service';

@Component({
	selector: 'app-starting-point',
	templateUrl: './starting-point.component.html',
	styleUrls: ['./starting-point.component.scss'],
})
export class StartingPointComponent implements OnInit {

	@ViewChild('rendererCanvas', { static: true })
	public rendererCanvas: ElementRef<HTMLCanvasElement>;

	public constructor(private engServ: EngineService) { }

	public ngOnInit(): void {
		this.engServ.createScene(this.rendererCanvas);
		this.engServ.animate();
		this.resizeCanvas();
	}

	private resizeCanvas() {
		this.rendererCanvas.nativeElement.width = window.innerWidth;
		this.rendererCanvas.nativeElement.height = window.innerHeight;
	}
}

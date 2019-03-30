import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pallier } from '../world';

@Component({
selector: 'app-modal',
templateUrl: './modal.component.html'
})
export class ModalComponent {
public visible = false;
public visibleAnimate = false;

@Output() notifyHireManager: EventEmitter<Pallier> = new EventEmitter<Pallier>();

public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
}
public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
}
public onContainerClicked(event: MouseEvent): void {
if ((<HTMLElement>event.target).classList.contains('modal')) { this.hide();
} }


}

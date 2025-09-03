import { Component } from '@angular/core';

@Component({
  selector: 'app-action-button-renderer',
  standalone: false,
  templateUrl: './action-button.component.renderer.html',
  styleUrl: './action-button.component.renderer.css',
})
export class ActionButtonComponentRenderer {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEdit() {
    this.params.context.componentParent.onEdit(this.params.data);
  }

  onDelete() {
    this.params.context.componentParent.onDelete(this.params.data);
  }
}

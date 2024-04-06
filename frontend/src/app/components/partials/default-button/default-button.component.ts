import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {

  @Input()
  type: 'submit' | 'button' = 'submit'

  @Input()
  text: string = 'Submit'

  @Input()
  bgColor = '#3aa45c'

  @Input()
  color = 'white'

  @Input()
  fontSizeRem = 1.3

  @Input()
  widthRem = 12

  @Output()
  onClick = new EventEmitter();

}

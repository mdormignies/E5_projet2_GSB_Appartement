import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[AppartementBorderCard]'
})
export class AppartementBorderCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setBorder(null); // La bordure est initialement nulle
  }

  @Input('AppartementBorderCard') borderColor: string | undefined;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || '#FE5127');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(null); // Remettre la bordure à null à la sortie de la souris
  }

  private setBorder(color: string | null) {
    let border = color ? 'solid 3px ' + color : 'solid 3px transparent'; // Ajoutez une bordure transparente si la couleur est null
    this.renderer.setStyle(this.el.nativeElement, 'border', border);
  }
}

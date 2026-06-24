import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ICON_MAP } from '../shared/icons';

export type NavigationButtonVariant = 'stat' | 'pill';

interface RippleData { id: number; x: number; y: number; size: number; }

/**
 * NavigationButton — actionable summary control.
 *
 *  • `stat` (Figma filled/24): compact card, title above an amount + chevron.
 *  • `pill` (Figma outline/40): wide gradient pill, leading icon + title on the
 *    left, amount + chevron on the right. Project a leading icon via `[lead]`.
 *
 * Carries the shared interactive state layer + ripple (Figma "State-layer").
 *
 * Figma: Workspace_Vera b-01.1 (NavigationButton component).
 */
@Component({
  selector: 'lib-navigation-button',
  standalone: true,
  imports: [NgStyle, LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="nav-button"
      [attr.data-nav-button-variant]="variant"
      [attr.data-nav-button-state]="state()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="clicked.emit()"
    >
      <!-- Interactive state layer & ripple -->
      <span class="nav-button__overlay" aria-hidden="true">
        <span class="nav-button__state-layer"></span>
        @for (r of ripples(); track r.id) {
          <span class="nav-button__ripple"
            [ngStyle]="{ left: r.x + 'px', top: r.y + 'px', width: r.size + 'px', height: r.size + 'px' }"></span>
        }
      </span>

      @if (variant === 'pill') {
        <span class="nav-button__lead">
          <ng-content select="[lead]"></ng-content>
          <span class="nav-button__title">{{ title }}</span>
        </span>
        <span class="nav-button__right">
          <span class="nav-button__amount">{{ amount }}</span>
          <span class="nav-button__chevron">
            <lucide-icon [img]="chevron" [size]="20" [strokeWidth]="2" color="currentColor"></lucide-icon>
          </span>
        </span>
      } @else {
        <span class="nav-button__title">{{ title }}</span>
        <span class="nav-button__bottom">
          <span class="nav-button__amount">{{ amount }}</span>
          <span class="nav-button__chevron">
            <lucide-icon [img]="chevron" [size]="20" [strokeWidth]="2" color="currentColor"></lucide-icon>
          </span>
        </span>
      }
    </button>
  `,
  styles: [`lib-navigation-button { display: block; width: 100%; }`],
})
export class NavigationButtonComponent {
  @Input() variant: NavigationButtonVariant = 'stat';
  @Input() title = '';
  @Input() amount = '';
  @Output() clicked = new EventEmitter<void>();

  protected readonly chevron = ICON_MAP['chevron-right'];
  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples = signal<RippleData[]>([]);
  protected state = computed(() => this.interaction());

  protected onMouseEnter(): void { this.interaction.set('hover'); }
  protected onMouseLeave(): void { this.interaction.set('default'); }
  protected onMouseUp(): void { this.interaction.set('default'); }

  protected onMouseDown(e: MouseEvent): void {
    this.interaction.set('pressed');
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = performance.now();
    this.ripples.update(prev => [...prev, {
      id,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
    }]);
    setTimeout(() => this.ripples.update(prev => prev.filter(r => r.id !== id)), 620);
  }
}

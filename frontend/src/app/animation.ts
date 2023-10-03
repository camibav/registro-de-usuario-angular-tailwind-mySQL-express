import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export function routeAnimations(direction: string) {
  return trigger('routeAnimations', [
    transition('* <=> home', createTransition(direction)),
    transition('* <=> registro', createTransition(direction)),
    transition('* <=> login', createTransition(direction)),
    transition('* <=> perfil', createTransition(direction)),
  ]);
}

function createTransition(direction: string) {
  const enterDirection = direction === 'forward' ? '100%' : '-100%';
  const leaveDirection = direction !== 'forward' ? '-100%' : '100%';

  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: enterDirection })
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('600ms ease-in-out', style({ left: leaveDirection }))
      ], { optional: true }),
      query(':enter', [
        animate('600ms ease-in-out', style({ left: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ];
}


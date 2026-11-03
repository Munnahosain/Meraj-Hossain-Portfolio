declare module '@barba/core' {
  interface BarbaTransitionData {
    current: { container: HTMLElement };
    next: { container: HTMLElement; url: { path: string } };
  }

  interface BarbaTransition {
    name?: string;
    leave?: (data: BarbaTransitionData) => unknown;
    beforeEnter?: (data: BarbaTransitionData) => unknown;
    enter?: (data: BarbaTransitionData) => unknown;
    afterEnter?: (data: BarbaTransitionData) => unknown;
  }

  const barba: {
    init(options: { transitions: BarbaTransition[] }): void;
  };

  export default barba;
}

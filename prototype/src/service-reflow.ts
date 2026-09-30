/** Bridge sticky/normal-flow layout changes after the clicked trigger is anchored.
 * The wrapper owns this short transition; its child keeps the scroll-driven scale.
 */
export function animateServiceReflow(poses: Map<HTMLElement, DOMRect>, reduced: boolean, viewportHeight: number): () => void {
  const animations: Animation[] = [];
  if (!reduced) for (const [element, before] of poses) {
    const box = element.getBoundingClientRect();
    const after = element.firstElementChild?.getBoundingClientRect() ?? box;
    if (before.width <= 0 || after.width <= 0) continue;
    const visible = (rect: DOMRect) => rect.top < viewportHeight + 40 && rect.top + rect.height > -40;
    if (!visible(before) && !visible(after)) continue;
    const scale = before.width / after.width;
    // Account for the child's centre-origin scale when the deck restacks.
    const x = before.left - box.left - scale * (after.left - box.left);
    const y = before.top - box.top - scale * (after.top - box.top);
    if (Math.abs(x) < .5 && Math.abs(y) < .5 && Math.abs(scale - 1) < .001) continue;
    animations.push(element.animate([
      { transform: `translate(${x}px, ${y}px) scale(${scale})` },
      { transform: 'none' },
    ], { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }));
  }
  return () => animations.forEach(animation => animation.cancel());
}

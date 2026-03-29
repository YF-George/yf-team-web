import { MediaQuery } from 'svelte/reactivity';

export class IsMobile {
	#mobileQuery = new MediaQuery('(max-width: 767px)');

	get current() {
		return this.#mobileQuery.current;
	}
}